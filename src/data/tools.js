export const TOOL_CATEGORIES = ['PDF', 'Image', 'Text', 'Productivity'];

export const TOOLS = [
  {
    slug: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG, or WebP images into a clean PDF — free, instant, no upload.',
    category: 'PDF',
    icon: 'FileImage',
    featured: true,
    trending: true,
    popular: true,
    color: 'from-sky-500 to-cyan-400',
  },
  {
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Reduce PDF file size for email, web, or storage — browser-only, no server upload.',
    category: 'PDF',
    icon: 'Archive',
    featured: true,
    trending: true,
    popular: true,
    color: 'from-violet-500 to-fuchsia-400',
  },
  {
    slug: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Merge multiple PDF files into one organized document — free and instant.',
    category: 'PDF',
    icon: 'Merge',
    featured: true,
    trending: false,
    popular: true,
    color: 'from-emerald-500 to-teal-400',
  },
  {
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Extract specific page ranges from a PDF — no software, no upload required.',
    category: 'PDF',
    icon: 'Scissors',
    featured: false,
    trending: true,
    popular: true,
    color: 'from-orange-500 to-amber-400',
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert DOCX documents to PDF in your browser — free, private, no signup.',
    category: 'PDF',
    icon: 'FileText',
    featured: false,
    trending: false,
    popular: true,
    color: 'from-blue-500 to-indigo-400',
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress JPG, PNG, and WebP images with quality control — free, browser-based.',
    category: 'Image',
    icon: 'ImageDown',
    featured: false,
    trending: true,
    popular: true,
    color: 'from-pink-500 to-rose-400',
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to exact pixel dimensions — free online tool, no upload needed.',
    category: 'Image',
    icon: 'Resize',
    featured: false,
    trending: false,
    popular: true,
    color: 'from-cyan-500 to-blue-400',
  },
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate custom-color QR codes for URLs and text — free, downloadable PNG.',
    category: 'Productivity',
    icon: 'QrCode',
    featured: true,
    trending: true,
    popular: true,
    color: 'from-violet-600 to-indigo-500',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and prettify JSON with syntax checking — free online tool.',
    category: 'Text',
    icon: 'Braces',
    featured: false,
    trending: false,
    popular: true,
    color: 'from-emerald-600 to-lime-500',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong random passwords with custom length and character sets — free.',
    category: 'Productivity',
    icon: 'KeyRound',
    featured: true,
    trending: true,
    popular: true,
    color: 'from-amber-500 to-orange-400',
  },
];

// ─── Rich per-tool SEO content ────────────────────────────────────────────────
// Each entry drives: H1, meta description, intro, features, use cases,
// how-to steps, FAQ, and structured data. Minimum 600 words of indexable
// content per tool page is generated from this data.

export const TOOL_PAGE_CONTENT = {
  'image-to-pdf': {
    title: 'Image to PDF Converter — Free Online Tool',
    h1: 'Convert Images to PDF Free Online',
    metaDescription:
      'Convert JPG, PNG, and WebP images to PDF instantly in your browser. No upload, no signup, no software. Combine multiple images into one PDF for free.',
    intro:
      'Convert one or more images into a clean, shareable PDF document directly in your browser. Upload JPG, PNG, or WebP files, arrange the order, and export a properly formatted PDF in seconds — without sending your files to any server.',
    description:
      'A fast, private image-to-PDF converter that runs entirely in your browser using the jsPDF library. Supports batch conversion of multiple images into a single multi-page PDF.',
    features: [
      'Convert JPG, JPEG, PNG, and WebP to PDF',
      'Combine multiple images into a single multi-page PDF',
      'Images are centered and scaled to A4 page dimensions',
      'No file upload — processing happens locally in your browser',
      'No account or signup required',
      'Instant download of the generated PDF',
    ],
    useCases: [
      'Scanning documents with a phone camera and converting photos to PDF',
      'Combining product photos into a single PDF catalog',
      'Creating a PDF portfolio from design screenshots',
      'Submitting image-based assignments or reports as PDF',
      'Archiving photos in a compact, shareable PDF format',
    ],
    howTo: [
      'Click the upload area or drag and drop one or more image files (JPG, PNG, WebP).',
      'Review the file list and reorder if needed.',
      'Click "Convert to PDF" to generate the document.',
      'Download the PDF file to your device.',
    ],
    privacy:
      'All image processing uses the jsPDF library running entirely in your browser. No image data is transmitted to any server. Files are held in browser memory only during the conversion and are released when you close or reset the tool.',
    faq: [
      { question: 'Which image formats can I convert to PDF?', answer: 'JPG, JPEG, PNG, and WebP are supported.' },
      { question: 'Can I convert multiple images into one PDF?', answer: 'Yes. Upload multiple images and they will be combined into a single multi-page PDF, one image per page.' },
      { question: 'Do my images get uploaded to a server?', answer: 'No. All processing happens locally in your browser using the jsPDF library. Your files never leave your device.' },
      { question: 'What page size does the PDF use?', answer: 'Images are scaled to fit A4 page dimensions while preserving aspect ratio.' },
      { question: 'Is there a file size limit?', answer: 'There is no hard limit, but very large images may be slow depending on your device memory.' },
      { question: 'Can I use this tool on mobile?', answer: 'Yes. The tool works on mobile browsers, though desktop is recommended for large batches.' },
    ],
  },

  'pdf-compressor': {
    title: 'PDF Compressor — Reduce PDF File Size Free Online',
    h1: 'Compress PDF File Size Free Online',
    metaDescription:
      'Compress PDF files to reduce size for email, web upload, or storage. Free browser-based PDF compressor — no upload, no signup, instant download.',
    intro:
      'Reduce the file size of any PDF directly in your browser. Upload your PDF, set a target size, and download a compressed version optimized for email attachments, web uploads, or long-term storage — without sending your document to any external server.',
    description:
      'A browser-based PDF compressor that re-renders each page at an optimized resolution to achieve meaningful file size reduction. Uses PDF.js for rendering and jsPDF for output generation.',
    features: [
      'Compress PDF to a target file size in MB',
      'Re-renders each page at optimized resolution for strong compression',
      'Shows original size vs. compressed size after processing',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
      'Supports PDFs of any page count',
    ],
    useCases: [
      'Reducing PDF size before sending as an email attachment',
      'Compressing scanned documents for web upload portals',
      'Shrinking PDF reports for sharing via WhatsApp or Telegram',
      'Reducing storage size of archived PDF documents',
      'Optimizing PDFs for faster loading on websites',
    ],
    howTo: [
      'Upload a PDF file by clicking the upload area or dragging and dropping.',
      'Enter your target file size in MB using the input field.',
      'Click "Compress PDF" to start the browser-based compression.',
      'Review the original and compressed file sizes shown after processing.',
      'Download the compressed PDF to your device.',
    ],
    privacy:
      'PDF compression uses PDF.js and jsPDF running entirely in your browser. No PDF data is transmitted to any server. The document is processed in browser memory and released when you close or reset the tool.',
    faq: [
      { question: 'How much can I reduce a PDF file size?', answer: 'Compression results depend on the PDF content. Image-heavy PDFs compress significantly. Text-only PDFs have less room for reduction.' },
      { question: 'Is the compression lossless?', answer: 'No. The compressor re-renders pages as images at a lower resolution, which reduces quality slightly in exchange for smaller file size.' },
      { question: 'Does my PDF get uploaded to a server?', answer: 'No. All processing happens locally in your browser using PDF.js and jsPDF.' },
      { question: 'Can I compress a password-protected PDF?', answer: 'Password-protected PDFs cannot be processed. Remove the password protection first.' },
      { question: 'What is the maximum PDF size supported?', answer: 'There is no hard limit, but very large PDFs (50MB+) may be slow depending on your device memory.' },
      { question: 'Will the compressed PDF look different?', answer: 'At moderate compression levels the visual difference is minimal. Higher compression levels may reduce text sharpness slightly.' },
    ],
  },

  'pdf-merger': {
    title: 'PDF Merger — Combine PDF Files Free Online',
    h1: 'Merge PDF Files Free Online',
    metaDescription:
      'Merge multiple PDF files into one document for free. Browser-based PDF merger — no upload, no signup, drag to reorder pages, instant download.',
    intro:
      'Combine multiple PDF documents into a single organized file directly in your browser. Upload your PDFs, drag to set the merge order, and download the combined document — no server upload, no account required.',
    description:
      'A browser-based PDF merger powered by pdf-lib. Supports merging any number of PDF files with drag-and-drop reordering before export.',
    features: [
      'Merge unlimited PDF files into one document',
      'Drag-and-drop reordering of files before merging',
      'Preserves original page content and quality',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
      'Instant download of the merged PDF',
    ],
    useCases: [
      'Combining multiple invoices into a single PDF for accounting',
      'Merging chapters of a report or thesis into one document',
      'Combining scanned pages into a complete document',
      'Assembling a multi-section proposal from separate files',
      'Joining monthly statements into an annual archive',
    ],
    howTo: [
      'Upload two or more PDF files using the upload area.',
      'Drag the files to set the order you want them merged.',
      'Click "Merge PDFs" to combine them into one document.',
      'Download the merged PDF file.',
    ],
    privacy:
      'PDF merging uses the pdf-lib library running entirely in your browser. No PDF data is transmitted to any server.',
    faq: [
      { question: 'How many PDFs can I merge at once?', answer: 'There is no hard limit. Merge as many PDFs as your browser memory allows.' },
      { question: 'Can I reorder the files before merging?', answer: 'Yes. Drag the uploaded files to set the exact order before clicking Merge.' },
      { question: 'Does merging reduce PDF quality?', answer: 'No. The merger copies pages directly without re-rendering, preserving original quality.' },
      { question: 'Do my files get uploaded to a server?', answer: 'No. All processing happens locally in your browser using pdf-lib.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'Password-protected PDFs cannot be merged. Remove protection first.' },
    ],
  },

  'pdf-splitter': {
    title: 'PDF Splitter — Extract PDF Pages Free Online',
    h1: 'Split PDF Pages Free Online',
    metaDescription:
      'Split a PDF by page range — extract specific pages from any PDF for free. Browser-based PDF splitter, no upload, no signup, instant download.',
    intro:
      'Extract a specific range of pages from any PDF document directly in your browser. Enter the start and end page numbers, and download a new PDF containing only those pages — without uploading your file to any server.',
    description:
      'A browser-based PDF page extractor powered by pdf-lib. Enter a page range to produce a new PDF containing only the selected pages.',
    features: [
      'Extract any page range from a PDF',
      'Preserves original page content and quality',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
      'Instant download of the extracted pages',
    ],
    useCases: [
      'Extracting a specific chapter from a large PDF book',
      'Pulling out selected pages from a scanned document',
      'Separating individual invoices from a batch PDF',
      'Extracting a signature page from a contract',
      'Creating a summary document from selected report pages',
    ],
    howTo: [
      'Upload a PDF file using the upload area.',
      'Enter the start page number and end page number.',
      'Click "Split PDF" to extract the selected pages.',
      'Download the new PDF containing only those pages.',
    ],
    privacy:
      'PDF splitting uses the pdf-lib library running entirely in your browser. No PDF data is transmitted to any server.',
    faq: [
      { question: 'Can I split a PDF into every individual page?', answer: 'You can extract any range. To get individual pages, run the tool multiple times with single-page ranges.' },
      { question: 'Does splitting reduce PDF quality?', answer: 'No. Pages are copied directly without re-rendering, preserving original quality.' },
      { question: 'Do my files get uploaded to a server?', answer: 'No. All processing happens locally in your browser using pdf-lib.' },
      { question: 'How do I know how many pages my PDF has?', answer: 'Open the PDF in any viewer to check the page count before using the splitter.' },
    ],
  },

  'word-to-pdf': {
    title: 'Word to PDF Converter — Convert DOCX to PDF Free Online',
    h1: 'Convert Word to PDF Free Online',
    metaDescription:
      'Convert Word DOCX files to PDF free online. Browser-based Word to PDF converter — no upload, no signup, no Microsoft Office required.',
    intro:
      'Convert Microsoft Word DOCX files to PDF format directly in your browser. Upload a DOCX document, extract the text content, and download a clean PDF — no Microsoft Office installation required, no server upload.',
    description:
      'A browser-based Word-to-PDF converter using the mammoth.js library for DOCX text extraction and jsPDF for PDF generation. Text structure is preserved in the output.',
    features: [
      'Convert DOCX files to PDF without Microsoft Office',
      'Extracts and preserves text content and basic structure',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
      'Instant download of the generated PDF',
    ],
    useCases: [
      'Converting a resume or CV from DOCX to PDF for job applications',
      'Sharing a Word document as a non-editable PDF',
      'Converting a report or proposal to PDF for email delivery',
      'Archiving Word documents in PDF format',
    ],
    howTo: [
      'Upload a DOCX file using the upload area.',
      'The tool extracts the text content from the document.',
      'Click "Convert Word to PDF" to generate the PDF.',
      'Download the PDF file to your device.',
    ],
    privacy:
      'DOCX processing uses the mammoth.js library running entirely in your browser. No document data is transmitted to any server.',
    faq: [
      { question: 'Do I need Microsoft Office installed?', answer: 'No. The converter works entirely in your browser without any software installation.' },
      { question: 'Is formatting preserved in the PDF?', answer: 'Text content and basic paragraph structure are preserved. Complex Word formatting such as tables, columns, and custom fonts may render differently.' },
      { question: 'Does my document get uploaded to a server?', answer: 'No. All processing happens locally in your browser using mammoth.js.' },
      { question: 'Does it support .doc files (older Word format)?', answer: 'DOCX files work best. Classic .doc format has limited support in browser-based processing.' },
    ],
  },

  'image-compressor': {
    title: 'Image Compressor — Reduce Image File Size Free Online',
    h1: 'Compress Images Free Online',
    metaDescription:
      'Compress JPG, PNG, and WebP images to reduce file size for web, email, or social media. Free browser-based image compressor — no upload, no signup.',
    intro:
      'Reduce image file size before uploading to websites, sending via email, or sharing on social media. Upload one or more images, adjust the compression quality, and download the optimized files — all processed locally in your browser.',
    description:
      'A browser-based image compressor using the browser-image-compression library. Supports batch compression with adjustable quality control and before/after size comparison.',
    features: [
      'Compress JPG, PNG, and WebP images',
      'Adjustable compression quality slider',
      'Batch compression of multiple images',
      'Preserves PNG transparency',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
    ],
    useCases: [
      'Reducing image size before uploading to a website or CMS',
      'Compressing photos before sending as email attachments',
      'Optimizing images for faster page load speed',
      'Reducing image file size for WhatsApp or Telegram sharing',
      'Compressing product photos before uploading to an e-commerce store',
    ],
    howTo: [
      'Upload one or more image files (JPG, PNG, WebP) using the upload area.',
      'Adjust the compression quality slider to your preferred level.',
      'Click "Compress Images" to process the files.',
      'Download the compressed image or images.',
    ],
    privacy:
      'Image compression uses the browser-image-compression library running entirely in your browser. No image data is transmitted to any server.',
    faq: [
      { question: 'What image formats are supported?', answer: 'JPG, JPEG, PNG, and WebP are supported.' },
      { question: 'Does compression reduce image quality?', answer: 'Compression reduces file size by lowering quality slightly. You control the quality level with the compression slider.' },
      { question: 'Are transparent PNG backgrounds preserved?', answer: 'Yes. PNG transparency is preserved during compression.' },
      { question: 'Can I compress multiple images at once?', answer: 'Yes. Upload multiple images and they will all be compressed in sequence.' },
      { question: 'Do my images get uploaded to a server?', answer: 'No. All processing happens locally in your browser.' },
    ],
  },

  'image-resizer': {
    title: 'Image Resizer — Resize Images to Exact Dimensions Free Online',
    h1: 'Resize Images to Exact Dimensions Free Online',
    metaDescription:
      'Resize images to exact pixel dimensions for free online. Browser-based image resizer — set width and height, no upload, no signup, instant download.',
    intro:
      'Resize any image to exact pixel dimensions directly in your browser. Set the target width and height, and download the resized image as a JPEG — no software installation, no server upload.',
    description:
      'A browser-based image resizer using the HTML5 Canvas API. Renders the image at the specified dimensions and exports as JPEG.',
    features: [
      'Resize images to any exact pixel dimensions',
      'Supports JPG, PNG, and WebP input',
      'Output exported as JPEG',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
      'Instant download of the resized image',
    ],
    useCases: [
      'Resizing profile photos to platform-specific dimensions',
      'Creating thumbnails for blog posts or YouTube videos',
      'Resizing product images for e-commerce listings',
      'Preparing images for social media posts with exact size requirements',
      'Generating design assets at specific pixel dimensions',
    ],
    howTo: [
      'Upload an image file using the upload area.',
      'Enter the target width in pixels.',
      'Enter the target height in pixels.',
      'Click "Resize Image" to process.',
      'Download the resized JPEG image.',
    ],
    privacy:
      'Image resizing uses the browser Canvas API running entirely in your browser. No image data is transmitted to any server.',
    faq: [
      { question: 'Will resizing change the aspect ratio?', answer: 'The resizer uses the exact dimensions you enter. To preserve aspect ratio, calculate the proportional height before resizing.' },
      { question: 'What format is the output?', answer: 'The resized image is exported as JPEG.' },
      { question: 'What image formats can I upload?', answer: 'JPG, PNG, and WebP are supported as input.' },
      { question: 'Do my images get uploaded to a server?', answer: 'No. All processing happens locally using the browser Canvas API.' },
    ],
  },

  'qr-code-generator': {
    title: 'QR Code Generator — Free Custom Color QR Codes Online',
    h1: 'Generate QR Codes Free Online',
    metaDescription:
      'Generate custom QR codes for URLs, text, and contact details. Choose from 10 color presets. Free online QR code generator — no signup, instant PNG download.',
    intro:
      'Create scannable QR codes for any URL, plain text, phone number, or contact detail. Choose from 10 color presets — Classic, Ocean, Forest, Violet, Sunset, Rose, Midnight, Gold, Teal, and Indigo — or use the custom color picker. Download as a high-resolution PNG ready for print or digital use.',
    description:
      'A browser-based QR code generator using the qrcode library. Supports custom foreground and background colors with 10 built-in presets. Output is a 420px PNG.',
    features: [
      'Generate QR codes for URLs, text, phone numbers, and contact data',
      '10 built-in color presets with live mini-QR previews',
      'Custom foreground and background color picker',
      'Live QR preview updates when color or text changes',
      'Download as high-resolution PNG (420px)',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
    ],
    useCases: [
      'QR codes for business cards linking to a portfolio or LinkedIn profile',
      'QR codes for product packaging linking to a product page',
      'QR codes for event posters linking to registration forms',
      'QR codes for restaurant menus or price lists',
      'QR codes for marketing materials linking to landing pages',
      'QR codes for app store listings',
    ],
    howTo: [
      'Enter the URL or text you want to encode in the input field.',
      'Select a color preset or use the custom color picker.',
      'Click "Generate QR Code" to create the QR code.',
      'Preview the QR code in the output section.',
      'Download the PNG file for use in print or digital materials.',
    ],
    privacy:
      'QR code generation uses the qrcode library running entirely in your browser. No input data is transmitted to any server.',
    faq: [
      { question: 'What can a QR code encode?', answer: 'Any text string — URLs, email addresses, phone numbers, plain text, or vCard contact data.' },
      { question: 'Can I use custom colors?', answer: 'Yes. Choose from 10 built-in color presets or use the custom color picker to set any foreground and background color.' },
      { question: 'What format is the QR code download?', answer: 'The QR code is downloaded as a PNG image at 420px resolution.' },
      { question: 'Can I change the color after generating?', answer: 'Yes. Changing the color preset or text after generating automatically updates the QR code in real time.' },
      { question: 'Is the QR code suitable for print?', answer: 'Yes. The 420px PNG is suitable for most print uses. For very large print formats, consider scaling up in a vector editor.' },
      { question: 'Do I need to create an account?', answer: 'No. The tool is completely free with no signup required.' },
    ],
  },

  'json-formatter': {
    title: 'JSON Formatter & Validator — Free Online JSON Beautifier',
    h1: 'Format & Validate JSON Free Online',
    metaDescription:
      'Format, validate, and prettify JSON online for free. Instant syntax checking, readable indented output, one-click copy. Browser-based JSON formatter — no upload.',
    intro:
      'Paste raw, minified, or malformed JSON and get a properly indented, human-readable output instantly. Syntax errors are detected and reported immediately. Copy the formatted result with one click or download it as a .json file.',
    description:
      'A browser-based JSON formatter and validator. Uses native JSON.parse for validation and JSON.stringify for pretty-printing with 2-space indentation.',
    features: [
      'Format and prettify minified or raw JSON',
      'Validate JSON syntax with immediate error reporting',
      'Copy formatted output to clipboard with one click',
      'Download formatted JSON as a .json file',
      'No file upload — runs entirely in your browser',
      'No account or signup required',
    ],
    useCases: [
      'Debugging REST API responses from Postman or browser DevTools',
      'Formatting JSON configuration files for readability',
      'Validating JSON before sending to a backend service',
      'Cleaning up minified JSON from third-party data sources',
      'Reading and understanding complex nested JSON structures',
    ],
    howTo: [
      'Paste your raw or minified JSON into the input text area.',
      'Click "Format JSON" to validate and prettify the output.',
      'Review the formatted output in the output text area.',
      'Click "Copy Output" to copy to clipboard, or download as a file.',
    ],
    privacy:
      'JSON formatting uses native browser JavaScript APIs. No JSON data is transmitted to any server.',
    faq: [
      { question: 'Does the formatter validate JSON syntax?', answer: 'Yes. Invalid JSON triggers an immediate error message showing what went wrong.' },
      { question: 'Can I format very large JSON files?', answer: 'Yes, within browser memory limits. Files up to a few MB format instantly.' },
      { question: 'Is my JSON data sent to a server?', answer: 'No. All formatting and validation happens locally in your browser.' },
      { question: 'Can I download the formatted output?', answer: 'Yes. A download button exports the formatted JSON as a .json file.' },
      { question: 'What indentation style does the formatter use?', answer: '2-space indentation following standard JSON formatting conventions.' },
    ],
  },

  'password-generator': {
    title: 'Password Generator — Create Strong Random Passwords Free',
    h1: 'Generate Strong Passwords Free Online',
    metaDescription:
      'Generate strong, random passwords with custom length and character sets. Uses browser crypto API for true randomness. Free online password generator — no signup.',
    intro:
      'Create cryptographically strong passwords for accounts, applications, and internal tools. Configure password length (8–32 characters), toggle uppercase letters, numbers, and symbols. Generated passwords use the browser\'s crypto API for true randomness and are never transmitted anywhere.',
    description:
      'A browser-based password generator using the Web Crypto API (crypto.getRandomValues). Supports configurable length and character set selection.',
    features: [
      'Configurable password length from 8 to 32 characters',
      'Toggle uppercase letters, numbers, and symbols',
      'Uses browser crypto.getRandomValues for cryptographic randomness',
      'Generated passwords are never transmitted to any server',
      'Copy to clipboard with one click',
      'Download password as a text file',
      'No account or signup required',
    ],
    useCases: [
      'Generating strong passwords for new account registrations',
      'Creating temporary passwords for client handoffs',
      'Generating API keys and secret tokens for development',
      'Creating strong passwords for database credentials',
      'Generating random strings for testing and development',
    ],
    howTo: [
      'Set the desired password length using the slider (8–32 characters).',
      'Toggle uppercase letters, numbers, and symbols as needed.',
      'Click "Generate Password" to create a new password.',
      'Copy the password to clipboard or download as a text file.',
    ],
    privacy:
      'Passwords are generated using the browser\'s crypto.getRandomValues API. No password data is transmitted to any server. Passwords exist only in your browser session.',
    faq: [
      { question: 'Are generated passwords truly random?', answer: 'Yes. Passwords use crypto.getRandomValues, the browser\'s cryptographically secure random number generator.' },
      { question: 'Are my passwords stored or transmitted?', answer: 'No. Passwords are generated and displayed locally. They are never sent to any server.' },
      { question: 'What character sets are available?', answer: 'Lowercase letters (always included), uppercase letters, numbers (0–9), and symbols (!@#$%^&*()-_=+[]{};:,.?/).' },
      { question: 'What is the maximum password length?', answer: '32 characters. For most use cases, 16–24 characters provides strong security.' },
      { question: 'Can I use this for generating API keys?', answer: 'Yes. The random output is suitable for API keys, tokens, and other secret strings.' },
    ],
  },
};
