import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFile, FaImage, FaFilePdf, FaFileLines, FaQrcode, FaLock, FaScissors, FaCode, FaFileArrowDown, FaFileArrowUp } from 'react-icons/fa6';

const iconMap = {
  FileImage: FaImage,
  Archive: FaFilePdf,
  Merge: FaFileLines,
  Scissors: FaScissors,
  FileText: FaFileLines,
  ImageDown: FaFileArrowDown,
  Resize: FaFileArrowUp,
  QrCode: FaQrcode,
  Braces: FaCode,
  KeyRound: FaLock,
};

export default function ToolCard({ tool }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group flex h-full min-h-[240px] flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:min-h-[280px] sm:p-5"
    >
      <div className="flex h-full flex-col space-y-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-sm sm:h-14 sm:w-14`}>
            {(() => {
              const Icon = iconMap[tool.icon] || FaFile;
              return <Icon className="h-5 w-5 sm:h-6 sm:w-6" />;
            })()}
          </div>
          {tool.featured ? <span className="hidden rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:inline-flex">Featured</span> : null}
        </div>
        <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{tool.name}</h3>
        <p
          className="text-sm leading-6 text-slate-600"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
          }}
        >
          {tool.description}
        </p>
        <Link
          to={`/tools/${tool.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Open Tool
          <FaArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
