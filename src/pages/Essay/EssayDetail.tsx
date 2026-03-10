import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getEssayById, type Language } from "../../data";

interface EssayDetailProps {
  t: any;
  isDarkMode: boolean;
  language: string;
}

export const EssayDetail = ({ isDarkMode }: EssayDetailProps) => {
  const { id } = useParams<{ id: string }>();

  // Always use English for essays
  const essay = id ? getEssayById(id, "en" as Language) : undefined;

  if (!essay) {
    return (
      <div className="h-full bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Essay not found</h1>
          <Link to="/essay" className="text-sm text-[#a0a0a0] underline">
            Back to Essays
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden w-full relative">
      <div className="h-full w-full overflow-y-auto no-scrollbar">
        <div className="max-w-[680px] mx-auto px-6 md:px-8 pt-12 sm:pt-16 pb-16">

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              to="/essay"
              className="inline-flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Essays</span>
            </Link>
          </motion.div>

          {/* Title & Date */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight tracking-tight mb-3">
              {essay.title}
            </h1>
            <time className="text-[11px] text-[#666666] uppercase tracking-widest">
              {new Date(essay.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </motion.header>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-8" />

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            {essay.content
              .split("\n\n")
              .filter((p) => p.trim().length > 0)
              .map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-[1.8] text-[#d4d4d4] text-justify mb-6 last:mb-0"
                >
                  {paragraph.trim()}
                </p>
              ))}
          </motion.article>

        </div>
      </div>
    </div>
  );
};
