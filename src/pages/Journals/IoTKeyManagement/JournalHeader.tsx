import { motion } from "framer-motion";
import { articleData } from "./journalData";

interface JournalHeaderProps {
  language: string;
}

export const JournalHeader = ({ language }: JournalHeaderProps) => {
  const title = language === "id" ? articleData.title.id : articleData.title.en;
  const readTime = language === "id" ? articleData.readTime.id : articleData.readTime.en;
  const introText = language === "id" ? articleData.intro.id : articleData.intro.en;

  return (
    <>
      {/* Title Header */}
      <div className="border-b border-neutral-200 pb-8 mb-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] md:text-[13px] font-mono text-neutral-400 mb-4 tracking-tight uppercase">
          <span>{articleData.date}</span>
          <span className="opacity-30">•</span>
          <span>{readTime}</span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 font-helvetica mb-8 leading-[1.1]"
        >
          {title}
        </motion.h1>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-2">
          {articleData.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-[11px] font-mono border border-neutral-200 px-3 py-1 rounded-full text-neutral-500 hover:bg-neutral-50 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Intro Text */}
      <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-800 mb-12">
        {introText}
      </p>
    </>
  );
};
