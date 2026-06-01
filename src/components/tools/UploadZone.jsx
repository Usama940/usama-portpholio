import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudArrowUp, FaFileArrowUp } from 'react-icons/fa6';

/**
 * UploadZone
 *
 * accept examples:
 *   Images (all types):  undefined  ← pass nothing, no filtering at all
 *   PDFs only:           { 'application/pdf': ['.pdf'] }
 *   DOCX only:           { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
 *
 * When `accept` is undefined/null, react-dropzone opens the picker with
 * no filter — the user can select any file. We then validate on our side
 * inside onFiles if needed.
 */
export default function UploadZone({
  onFiles,
  multiple = true,
  accept,          // pass undefined for "all images" — see note above
  title = 'Drop files here',
  subtitle = 'Drag and drop or browse from your device.',
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) onFiles(acceptedFiles);
    },
    [onFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    // Only pass accept to dropzone when it is explicitly provided.
    // Passing undefined lets the browser show ALL files in the picker.
    ...(accept ? { accept } : {}),
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-3xl border border-dashed p-6 transition ${
        isDragActive
          ? 'border-slate-900 bg-slate-50'
          : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
          {isDragActive ? (
            <FaFileArrowUp className="h-6 w-6" />
          ) : (
            <FaCloudArrowUp className="h-6 w-6" />
          )}
        </div>
        <div>
          <p className="text-base font-semibold text-slate-950">{title}</p>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
