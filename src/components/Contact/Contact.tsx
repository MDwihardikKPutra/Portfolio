import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import type { Translations } from "../../translations";

interface ContactProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Contact = ({ t, isDarkMode }: ContactProps) => {
  const descColor = isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]";
  const buttonClass = isDarkMode
    ? "bg-[#f5f5f5] text-[#0a0a0a] hover:bg-[#e5e5e5]"
    : "bg-[#1a1a1a] text-[#fafafa] hover:bg-[#2a2a2a]";

  return (
    <div className="flex flex-col space-y-6">
      <p className={`text-[clamp(0.875rem,1.8vw,1rem)] leading-relaxed ${descColor}`}>
        {t.contactDesc}
      </p>
      <motion.a
        href="mailto:ddiko105@gmail.com"
        className={`inline-flex items-center gap-3 px-8 py-3 rounded-full text-[clamp(0.875rem,1.5vw,1rem)] font-medium ${buttonClass} transition-all duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Mail size={18} />
        {t.getInTouch}
      </motion.a>
    </div>
  );
};