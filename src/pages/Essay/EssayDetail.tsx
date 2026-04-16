import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getEssayById, type Language } from "../../data";

interface EssayDetailProps {
  t: any;
  isDarkMode: boolean;
  language: string;
}

export const EssayDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Always use English for essays
  const essay = id ? getEssayById(id, "en" as Language) : undefined;

  if (!essay) {
    return (
      <div className="min-h-screen bg-white text-text-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-medium mb-4">Essay not found</h1>
          <Link to="/" className="text-[10px] font-medium uppercase tracking-widest border-b border-black">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen relative">
      <div className="max-w-[720px] mx-auto px-6 md:px-8 py-20 md:py-32">

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-[10px] uppercase font-medium tracking-[0.2em] text-black hover:text-accent transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Thoughts</span>
          </Link>
        </motion.div>

        {/* Title & Date */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <time className="text-[10px] text-black uppercase tracking-[0.5em] font-medium block mb-6 px-1 border-l-2 border-accent">
            {new Date(essay.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tighter mb-8 text-black">
            {essay.title}
          </h1>
          <div className="w-10 h-px bg-black" />
        </motion.header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="prose prose-lg max-w-none"
        >
          {essay.content
            .split("\n\n")
            .filter((p) => p.trim().length > 0)
            .map((paragraph, index) => (
              <p
                key={index}
                className="text-sm md:text-base leading-relaxed text-black/80 text-justify mb-8 font-normal"
              >
                {paragraph.trim()}
              </p>
            ))}
        </motion.article>

        {/* Footer Navigation */}
        <div className="mt-32 pt-16 border-t border-black/10 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
           <span className="text-text-secondary">Keep reading</span>
           <Link to="/" className="border-b border-black pb-1 hover:pb-2 transition-all">Next Essay</Link>
        </div>

      </div>
    </div>
  );
};
