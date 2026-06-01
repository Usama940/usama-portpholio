import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDownload, FaRotate, FaSpinner, FaArrowLeft, FaFileArrowUp } from 'react-icons/fa6';
import { jsPDF } from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import { PDFDocument } from 'pdf-lib';
import * as mammoth from 'mammoth';
import imageCompression from 'browser-image-compression';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import ToolSeo from '../../components/tools/ToolSeo.jsx';
import UploadZone from '../../components/tools/UploadZone.jsx';
import { TOOL_PAGE_CONTENT, TOOLS } from '../../data/tools.js';
import { buildToolSeo } from '../../seo/tools/toolsSeo.js';
import QrCodeTool from './QrCodeTool.jsx';

const SITE_URL = 'https://usama-resumae.netlify.app';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function readFileAsArrayBuffer(file) {
  return file.arrayBuffer();
}

function downloadBlob(blob, filename) {
  saveAs(blob, filename);
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getRelatedTools(slug) {
  return TOOLS.filter((tool) => tool.slug !== slug).slice(0, 4);
}

export default function ToolPage({ toolId }) {
  const tool = TOOL_PAGE_CONTENT[toolId];
  const toolMeta = TOOLS.find((item) => item.slug === toolId);

  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [outputName, setOutputName] = useState('');
  const [outputSize, setOutputSize] = useState('');
  const [sourceSize, setSourceSize] = useState('');
  const [progress, setProgress] = useState(0);
  const [jsonInput, setJsonInput] = useState('{\n  "name": "Usama Aslam",\n  "role": "Full Stack Developer"\n}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [qrText, setQrText] = useState('https://usama-resumae.netlify.app');
  const [qrFg, setQrFg] = useState('#000000');
  const [qrBg, setQrBg] = useState('#ffffff');
  const qrGenerated = useRef(false); // tracks whether user has generated at least once
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [resizeWidth, setResizeWidth] = useState(1200);
  const [resizeHeight, setResizeHeight] = useState(1200);
  const [compressQuality, setCompressQuality] = useState(0.72);
  const [compressTargetSize, setCompressTargetSize] = useState(1.5);
  const [pdfSplitStart, setPdfSplitStart] = useState(1);
  const [pdfSplitEnd, setPdfSplitEnd] = useState(1);
  const [previewItems, setPreviewItems] = useState([]);
  const [draggedFileIndex, setDraggedFileIndex] = useState(null);

  const seo = buildToolSeo({
    title: tool?.title || 'Tool | Usama Aslam',
    description: tool?.metaDescription || tool?.description || '',
    path: `/tools/${toolId}`,
    toolName: tool?.h1 || tool?.title || toolId,
    featureList: tool?.features || [],
    howToSteps: tool?.howTo || [],
    faq: tool?.faq || [],
    breadcrumbs: [
      { name: 'Home', url: SITE_URL },
      { name: 'Tools', url: `${SITE_URL}/tools` },
      { name: tool?.title || toolId, url: `${SITE_URL}/tools/${toolId}` },
    ],
    image: `${SITE_URL}/og/${toolId}.png`,
  });

  const relatedTools = useMemo(() => getRelatedTools(toolId), [toolId]);

  useEffect(() => {
    // Some files (e.g. Windows screenshots) may have an empty MIME type.
    // Fall back to extension check so previews always work.
    const isImage = (file) =>
      file.type.startsWith('image/') ||
      /\.(png|jpe?g|webp|gif|bmp|tiff?|avif|svg|ico|heic|heif)$/i.test(file.name);

    const nextPreviewItems = files.map((file) => ({
      name: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      type: file.type || file.name.split('.').pop().toUpperCase(),
      url: isImage(file) ? URL.createObjectURL(file) : '',
    }));

    setPreviewItems(nextPreviewItems);

    return () => {
      nextPreviewItems.forEach((item) => {
        if (item.url) URL.revokeObjectURL(item.url);
      });
    };
  }, [files]);

  const moveFile = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    setFiles((currentFiles) => {
      const nextFiles = [...currentFiles];
      const [movedFile] = nextFiles.splice(fromIndex, 1);
      nextFiles.splice(toIndex, 0, movedFile);
      return nextFiles;
    });
  };

  if (!tool) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-800 shadow-sm">
        <p>Tool not found.</p>
        <Link to="/tools" className="mt-4 inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500">
          <FaArrowLeft className="h-4 w-4" /> Back to tools
        </Link>
      </div>
    );
  }

  const clearState = () => {
    setFiles([]);
    setStatus('idle');
    setError('');
    setOutputUrl('');
    setOutputName('');
    setOutputSize('');
    setSourceSize('');
    setProgress(0);
    qrGenerated.current = false;
  };

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.?/';
    let charset = lower;
    if (includeUppercase) charset += upper;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    const array = new Uint32Array(passwordLength);
    crypto.getRandomValues(array);
    const generated = Array.from(array, (value) => charset[value % charset.length]).join('');
    setPassword(generated);
    const blob = new Blob([generated], { type: 'text/plain' });
    setOutputUrl(URL.createObjectURL(blob));
    setOutputName('password.txt');
    setOutputSize(formatBytes(blob.size));
  };

  const formatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
      setJsonOutput(formatted);
      const blob = new Blob([formatted], { type: 'application/json' });
      setOutputUrl(URL.createObjectURL(blob));
      setOutputName('formatted.json');
      setOutputSize(formatBytes(blob.size));
      setError('');
    } catch {
      setError('Invalid JSON. Please check the syntax and try again.');
      setJsonOutput('');
    }
  };

  const copyJson = async () => {
    if (!jsonOutput) return;
    await navigator.clipboard.writeText(jsonOutput);
  };

  const generateQr = async () => {
    setStatus('processing');
    setError('');
    try {
      const dataUrl = await QRCode.toDataURL(qrText, {
        margin: 2,
        width: 420,
        color: { dark: qrFg, light: qrBg },
      });
      setOutputUrl(dataUrl);
      setOutputName('qr-code.png');
      setOutputSize('');
      qrGenerated.current = true;
    } catch (err) {
      setError('Unable to generate QR code.');
    } finally {
      setStatus('done');
    }
  };

  // Auto-regenerate QR whenever color or text changes after first generation
  useEffect(() => {
    if (toolId !== 'qr-code-generator' || !qrGenerated.current) return;
    let cancelled = false;
    QRCode.toDataURL(qrText, {
      margin: 2,
      width: 420,
      color: { dark: qrFg, light: qrBg },
    }).then((dataUrl) => {
      if (!cancelled) setOutputUrl(dataUrl);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [qrFg, qrBg, qrText, toolId]);

  const handleImageCompression = async () => {
    if (!files.length) {
      setError('Please upload at least one image.');
      return;
    }

    setStatus('processing');
    setError('');
    try {
      const compressed = [];
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const result = await imageCompression(file, {
          maxSizeMB: 1,
          useWebWorker: true,
          initialQuality: compressQuality,
        });
        compressed.push(result);
        setProgress(Math.round(((index + 1) / files.length) * 100));
      }
      if (compressed.length === 1) {
        const blobUrl = URL.createObjectURL(compressed[0]);
        setOutputUrl(blobUrl);
        setOutputName(`compressed-${compressed[0].name}`);
        setOutputSize(formatBytes(compressed[0].size));
      } else {
        const zipText = compressed.map((item) => `${item.name} (${Math.round(item.size / 1024)} KB)`).join('\n');
        const outputBlob = new Blob([zipText], { type: 'text/plain' });
        setOutputUrl(URL.createObjectURL(outputBlob));
        setOutputName('compressed-files.txt');
        setOutputSize(formatBytes(outputBlob.size));
      }
    } catch (err) {
      setError('Image compression failed.');
    } finally {
      setStatus('done');
      setProgress(100);
    }
  };

  const handleImageResize = async () => {
    if (!files.length) {
      setError('Please upload an image to resize.');
      return;
    }

    setStatus('processing');
    setError('');

    try {
      const file = files[0];
      const dataUrl = await readFileAsDataUrl(file);
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, resizeWidth, resizeHeight);

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setOutputName(`resized-${file.name.replace(/\.[^.]+$/, '')}.jpg`);
      setOutputSize(formatBytes(blob.size));
    } catch (err) {
      setError('Unable to resize the selected image.');
    } finally {
      setStatus('done');
      setProgress(100);
    }
  };

  const handleImageToPdf = async () => {
    if (!files.length) {
      setError('Please upload one or more images first.');
      return;
    }

    setStatus('processing');
    setError('');
    try {
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const dataUrl = await readFileAsDataUrl(file);
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // Always render through canvas so jsPDF gets a clean JPEG
        // regardless of original format (gif, bmp, tiff, avif, svg, heic, etc.)
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        // White background for formats with transparency (gif, png, svg)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.92);

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
        const width = canvas.width * ratio;
        const height = canvas.height * ratio;
        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;
        if (index > 0) pdf.addPage();
        pdf.addImage(jpegDataUrl, 'JPEG', x, y, width, height);
        setProgress(Math.round(((index + 1) / files.length) * 100));
      }
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setOutputName('images-to-pdf.pdf');
      setOutputSize(formatBytes(blob.size));
    } catch (err) {
      setError('Unable to convert the selected images to PDF.');
    } finally {
      setStatus('done');
      setProgress(100);
    }
  };

  const handlePdfMerge = async () => {
    if (!files.length) {
      setError('Please upload at least one PDF.');
      return;
    }

    setStatus('processing');
    setError('');

    try {
      const merged = await PDFDocument.create();
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const pdfBytes = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
        setProgress(Math.round(((index + 1) / files.length) * 100));
      }
      const mergedBytes = await merged.save();
      const outputBlob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setOutputName('merged-document.pdf');
      setOutputSize(formatBytes(outputBlob.size));
    } catch (err) {
      setError('Unable to merge the selected PDFs.');
    } finally {
      setStatus('done');
      setProgress(100);
    }
  };

  const handlePdfSplit = async () => {
    if (!files.length) {
      setError('Please upload a PDF to split.');
      return;
    }

    setStatus('processing');
    setError('');

    try {
      const file = files[0];
      const pdfBytes = await readFileAsArrayBuffer(file);
      const pdf = await PDFDocument.load(pdfBytes);
      const totalPages = pdf.getPageCount();
      const start = Math.max(1, Math.min(pdfSplitStart, totalPages));
      const end = Math.max(start, Math.min(pdfSplitEnd, totalPages));
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, Array.from({ length: end - start + 1 }, (_, index) => start - 1 + index));
      pages.forEach((page) => newPdf.addPage(page));
      const bytes = await newPdf.save();
      const outputBlob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setOutputName('split-document.pdf');
      setOutputSize(formatBytes(outputBlob.size));
    } catch (err) {
      setError('Unable to split the selected PDF.');
    } finally {
      setStatus('done');
      setProgress(100);
    }
  };

  const handlePdfCompress = async () => {
    if (!files.length) {
      setError('Please upload a PDF to compress.');
      return;
    }

    setStatus('processing');
    setError('');
    try {
      const file = files[0];
      const pdfBytes = await readFileAsArrayBuffer(file);
      const originalBytes = pdfBytes.byteLength;
      const targetBytes = Math.max(100 * 1024, Math.round(compressTargetSize * 1024 * 1024));
      const pdfDocument = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
      const pageCount = pdfDocument.numPages;
      const compressionRatio = clamp(targetBytes / originalBytes, 0.25, 0.9);
      const renderScale = clamp(1.35 * compressionRatio + 0.35, 0.45, 1.2);
      const imageQuality = clamp(0.4 + compressionRatio * 0.45, 0.35, 0.9);
      const pdf = new jsPDF({ unit: 'pt', format: 'a4', compress: true });

      for (let index = 1; index <= pageCount; index += 1) {
        const page = await pdfDocument.getPage(index);
        const viewport = page.getViewport({ scale: renderScale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));
        await page.render({ canvasContext: context, viewport }).promise;

        const pageImage = canvas.toDataURL('image/jpeg', imageQuality);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
        const width = canvas.width * ratio;
        const height = canvas.height * ratio;
        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        if (index > 1) pdf.addPage();
        pdf.addImage(pageImage, 'JPEG', x, y, width, height, undefined, 'FAST');
        setProgress(Math.round((index / pageCount) * 100));
      }

      const outputBlob = pdf.output('blob');
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setOutputName(`compressed-${file.name}`);
      setSourceSize(formatBytes(originalBytes));
      setOutputSize(formatBytes(outputBlob.size));
    } catch (err) {
      setError('Unable to optimize the PDF.');
    } finally {
      setStatus('done');
      setProgress(100);
    }
  };

  const handleWordToPdf = async () => {
    if (!files.length) {
      setError('Please upload a DOCX file.');
      return;
    }

    setStatus('processing');
    setError('');

    try {
      const file = files[0];
      const buffer = await readFileAsArrayBuffer(file);
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      const text = result.value || 'Document';
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const margin = 48;
      const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(lines, margin, margin);
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      setOutputName(`${file.name.replace(/\.[^.]+$/, '')}.pdf`);
      setOutputSize(formatBytes(blob.size));
    } catch (err) {
      setError('Unable to convert the Word document. DOCX files work best.');
    } finally {
      setStatus('done');
      setProgress(100);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    fetch(outputUrl)
      .then((response) => response.blob())
      .then((blob) => downloadBlob(blob, outputName || 'download'));
  };

  const getPrimaryActionLabel = () => {
    if (outputUrl) {
      if (toolId === 'pdf-merger') return 'Download Merged PDF';
      if (toolId === 'json-formatter') return 'Download JSON';
      if (toolId === 'password-generator') return 'Download Text';
      if (toolId.includes('pdf')) return 'Download PDF';
      if (toolId.includes('image')) return 'Download Image';
      return 'Download File';
    }

    switch (toolId) {
      case 'image-to-pdf':
        return 'Convert to PDF';
      case 'pdf-compressor':
        return 'Compress PDF';
      case 'pdf-merger':
        return 'Merge PDFs';
      case 'pdf-splitter':
        return 'Split PDF';
      case 'word-to-pdf':
        return 'Convert Word to PDF';
      case 'image-compressor':
        return 'Compress Images';
      case 'image-resizer':
        return 'Resize Image';
      case 'qr-code-generator':
        return 'Generate QR Code';
      case 'json-formatter':
        return 'Format JSON';
      case 'password-generator':
        return 'Generate Password';
      default:
        return 'Run Tool';
    }
  };

  const handlePrimaryAction = () => {
    if (outputUrl) {
      handleDownload();
      return;
    }

    switch (toolId) {
      case 'image-to-pdf':
        handleImageToPdf();
        break;
      case 'pdf-compressor':
        handlePdfCompress();
        break;
      case 'pdf-merger':
        handlePdfMerge();
        break;
      case 'pdf-splitter':
        handlePdfSplit();
        break;
      case 'word-to-pdf':
        handleWordToPdf();
        break;
      case 'image-compressor':
        handleImageCompression();
        break;
      case 'image-resizer':
        handleImageResize();
        break;
      case 'qr-code-generator':
        generateQr();
        break;
      case 'json-formatter':
        formatJson();
        break;
      case 'password-generator':
        generatePassword();
        break;
      default:
        break;
    }
  };

  const renderActionArea = () => {
    if (toolId === 'json-formatter') {
      return (
        <div className="flex flex-wrap gap-3">
          <button onClick={handlePrimaryAction} className="rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950">
            {getPrimaryActionLabel()}
          </button>
          <button onClick={copyJson} className="rounded-md border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:text-slate-200">
            Copy Output
          </button>
        </div>
      );
    }

    return (
      <button onClick={handlePrimaryAction} className="rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950">
        {getPrimaryActionLabel()}
      </button>
    );
  };

  const renderToolBody = () => {
    switch (toolId) {
      case 'image-to-pdf':
      case 'pdf-compressor':
      case 'pdf-merger':
      case 'pdf-splitter':
      case 'word-to-pdf':
      case 'image-compressor':
      case 'image-resizer':
        return (
          <div className="space-y-5">
            <UploadZone
              multiple={toolId === 'pdf-merger' || (toolId !== 'word-to-pdf' && toolId !== 'image-resizer' && toolId !== 'pdf-splitter' && toolId !== 'pdf-compressor')}
              accept={
                toolId === 'word-to-pdf'
                  ? { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
                  : toolId === 'pdf-compressor' || toolId === 'pdf-merger' || toolId === 'pdf-splitter'
                  ? { 'application/pdf': ['.pdf'] }
                  : undefined  // image-to-pdf, image-compressor, image-resizer — no filter
              }
              title="Drop your files here"
              subtitle={
                toolId === 'pdf-merger'
                  ? 'Upload multiple PDFs in the exact order you want them merged.'
                  : toolId === 'image-to-pdf' || toolId === 'image-compressor' || toolId === 'image-resizer'
                  ? 'Supports all image types — PNG, JPG, WebP, GIF, BMP, TIFF, AVIF and more.'
                  : 'Drag and drop or browse from your device.'
              }
              onFiles={(incoming) => {
                // For image tools: validate that selected files are actually images
                const isImageTool = toolId === 'image-to-pdf' || toolId === 'image-compressor' || toolId === 'image-resizer';
                if (isImageTool) {
                  const validImages = incoming.filter(
                    (f) =>
                      f.type.startsWith('image/') ||
                      /\.(png|jpe?g|webp|gif|bmp|tiff?|avif|svg|ico|heic|heif)$/i.test(f.name),
                  );
                  if (!validImages.length) {
                    setError('Please select image files only (PNG, JPG, WebP, GIF, BMP, TIFF, AVIF, etc.)');
                    return;
                  }
                  incoming = validImages;
                }
                setFiles((current) => {
                  // pdf-merger and image-to-pdf: accumulate files across multiple picker sessions
                  if (toolId === 'pdf-merger' || toolId === 'image-to-pdf') {
                    return [...current, ...incoming];
                  }
                  // single-file tools: always replace
                  if (toolId === 'image-resizer' || toolId === 'word-to-pdf' || toolId === 'pdf-splitter' || toolId === 'pdf-compressor') {
                    return incoming.slice(0, 1);
                  }
                  // image-compressor: replace with new selection (batch already selected via multiple)
                  return incoming;
                });
                setError('');
                setOutputUrl('');
                setOutputName('');
                setOutputSize('');
                setProgress(0);
              }}
            />

            {toolId === 'image-compressor' ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="mb-2 block text-sm font-medium text-slate-600">Compression quality: {compressQuality}</label>
                <input type="range" min="0.3" max="0.92" step="0.01" value={compressQuality} onChange={(event) => setCompressQuality(Number(event.target.value))} className="w-full" />
              </div>
            ) : null}

            {toolId === 'pdf-compressor' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-slate-600">Target size (MB)</span>
                  <input type="number" min="0.1" step="0.1" value={compressTargetSize} onChange={(event) => setCompressTargetSize(Number(event.target.value))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  The compressor re-renders pages in the browser for stronger size reduction. The target size is a goal, and the final output size will be shown after compression.
                </div>
              </div>
            ) : null}

            {toolId === 'image-resizer' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-slate-600">Width</span>
                  <input type="number" value={resizeWidth} onChange={(event) => setResizeWidth(Number(event.target.value))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-slate-600">Height</span>
                  <input type="number" value={resizeHeight} onChange={(event) => setResizeHeight(Number(event.target.value))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                </label>
              </div>
            ) : null}

            {toolId === 'pdf-splitter' ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Page range</h3>
                  <p className="mt-1 text-sm text-slate-600">Enter the first and last page you want to keep.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-slate-600">Start page</span>
                  <input type="number" min="1" value={pdfSplitStart} onChange={(event) => setPdfSplitStart(Number(event.target.value))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-slate-600">End page</span>
                  <input type="number" min="1" value={pdfSplitEnd} onChange={(event) => setPdfSplitEnd(Number(event.target.value))} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
                </label>
                </div>
              </div>
            ) : null}

            {toolId === 'word-to-pdf' ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                DOCX files are extracted in the browser and converted into a simple PDF layout.
              </div>
            ) : null}
          </div>
        );
      case 'qr-code-generator':
        return (
          <QrCodeTool
            qrText={qrText}
            setQrText={setQrText}
            qrFg={qrFg}
            setQrFg={setQrFg}
            qrBg={qrBg}
            setQrBg={setQrBg}
          />
        );
      case 'json-formatter':
        return (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="mb-2 block text-slate-600 dark:text-slate-300">JSON input</span>
              <textarea value={jsonInput} onChange={(event) => setJsonInput(event.target.value)} rows={12} className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </label>
            {jsonOutput ? (
              <label className="block text-sm">
                <span className="mb-2 block text-slate-600 dark:text-slate-300">Formatted output</span>
                <textarea value={jsonOutput} readOnly rows={12} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </label>
            ) : null}
          </div>
        );
      case 'password-generator':
        return (
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/60 p-5 dark:bg-slate-900/50">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-slate-600 dark:text-slate-300">Length: {passwordLength}</span>
                <input type="range" min="8" max="32" value={passwordLength} onChange={(event) => setPasswordLength(Number(event.target.value))} className="w-full" />
              </label>
              <div className="flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-200">
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={includeUppercase} onChange={(event) => setIncludeUppercase(event.target.checked)} /> Uppercase</label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={includeNumbers} onChange={(event) => setIncludeNumbers(event.target.checked)} /> Numbers</label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={includeSymbols} onChange={(event) => setIncludeSymbols(event.target.checked)} /> Symbols</label>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white">{password || 'Your generated password will appear here.'}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ToolSeo title={seo.title} description={seo.description} canonical={seo.canonical} image={seo.image} jsonLd={seo.jsonLd} />

      <Link to="/tools" aria-label="Back to tools" className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-slate-400 hover:text-slate-950">
        <FaArrowLeft className="h-4 w-4" />
      </Link>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white p-6 shadow-none">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{tool.h1 || tool.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{tool.intro}</p>

          <div className="mt-6 space-y-4">
            {renderToolBody()}
            <div className="flex flex-wrap items-center gap-3">
              {renderActionArea()}
              <button onClick={clearState} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950">
                <FaRotate className="h-4 w-4" /> Reset
              </button>
            </div>
            {status === 'processing' ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="inline-flex items-center gap-2"><FaSpinner className="h-4 w-4 animate-spin" /> Processing...</span>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-slate-950 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : null}
            {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
            {outputUrl ? (
              <div className="pt-2">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Output</h2>
                {toolId === 'qr-code-generator' || outputName.endsWith('.png') || outputName.endsWith('.jpg') ? (
                  <div className="mt-4 flex justify-center rounded-2xl border border-slate-200 bg-white p-4">
                    <img
                      src={outputUrl}
                      alt={`${tool.h1 || tool.title} result`}
                      className="max-h-[320px] w-full max-w-[320px] rounded-xl border border-slate-100 bg-white"
                    />
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600">
                    Generated file: {outputName}
                  </div>
                )}
                {outputSize ? <p className="mt-3 text-sm text-slate-500">File size: {toolId === 'pdf-compressor' ? `${sourceSize ? `Original ${sourceSize} • ` : ''}Target ${compressTargetSize} MB • Compressed ${outputSize}` : outputSize}</p> : null}
              </div>
            ) : null}
          </div>

          {/* Features section — adds indexable content depth */}
          {tool.features?.length ? (
            <section className="mt-8 border-t border-slate-100 pt-6">
              <h2 className="text-base font-semibold text-slate-950">Features</h2>
              <ul className="mt-3 space-y-1">
                {tool.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Use cases */}
          {tool.useCases?.length ? (
            <section className="mt-6 border-t border-slate-100 pt-6">
              <h2 className="text-base font-semibold text-slate-950">Common use cases</h2>
              <ul className="mt-3 space-y-1">
                {tool.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    {u}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Privacy / security */}
          {tool.privacy ? (
            <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-slate-950">Privacy & file security</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.privacy}</p>
            </section>
          ) : null}
        </motion.article>

        <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-none">
          <div className="space-y-5">
            <section>
              <h2 className="text-lg font-semibold text-slate-950">Preview</h2>
              <div className="mt-3 space-y-2">
                {previewItems.length ? previewItems.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    draggable={toolId === 'pdf-merger'}
                    onDragStart={() => setDraggedFileIndex(index)}
                    onDragOver={(event) => {
                      if (toolId !== 'pdf-merger') return;
                      event.preventDefault();
                    }}
                    onDrop={(event) => {
                      if (toolId !== 'pdf-merger') return;
                      event.preventDefault();
                      moveFile(draggedFileIndex, index);
                      setDraggedFileIndex(null);
                    }}
                    onDragEnd={() => setDraggedFileIndex(null)}
                    className={`flex items-center gap-3 border-t border-slate-100 pt-3 first:border-0 first:pt-0 ${toolId === 'pdf-merger' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 text-[11px] font-semibold text-slate-500">
                      {index + 1}
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-950">
                      {file.url ? <img src={file.url} alt="" className="h-full w-full rounded-xl object-cover" /> : <FaFileArrowUp className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-950">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.size} • {file.type}</p>
                    </div>
                    {toolId === 'pdf-merger' ? <span className="text-xs text-slate-400">Drag</span> : null}
                  </div>
                )) : (
                  <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">Upload a file to see a quick preview.</p>
                )}
              </div>
            </section>

            <section className="border-t border-slate-100 pt-5">
              <h2 className="text-lg font-semibold text-slate-950">How to use</h2>
              <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                {tool.howTo.map((step, index) => <li key={step} className="flex gap-3"><span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[11px] text-slate-700">{index + 1}</span><span>{step}</span></li>)}
              </ol>
            </section>

            {toolId === 'pdf-merger' ? (
              <section className="border-t border-slate-100 pt-5">
                <h2 className="text-lg font-semibold text-slate-950">Merge order</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Upload PDFs in the exact order you want them merged. The first file becomes page 1, the second becomes page 2, and so on.</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">If the order is wrong, remove the files and upload them again in the right sequence.</p>
              </section>
            ) : null}

            {toolId === 'pdf-splitter' ? (
              <section className="border-t border-slate-100 pt-5">
                <h2 className="text-lg font-semibold text-slate-950">Page range</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Enter the first and last page number you want to keep. Example: start 1, end 3 extracts pages 1 through 3.</p>
              </section>
            ) : null}

            <section className="border-t border-slate-100 pt-5">
              <h2 className="text-lg font-semibold text-slate-950">Related tools</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedTools.map((related) => (
                  <Link key={related.slug} to={`/tools/${related.slug}`} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-white">
                    {related.name}
                  </Link>
                ))}
              </div>
            </section>

            <section className="border-t border-slate-100 pt-5">
              <h2 className="text-lg font-semibold text-slate-950">FAQ</h2>
              <div className="mt-3 space-y-2">
                {tool.faq.map((item) => (
                  <details key={item.question} className="py-1">
                    <summary className="cursor-pointer list-none text-sm font-medium text-slate-950">{item.question}</summary>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </section>
    </>
  );
}
