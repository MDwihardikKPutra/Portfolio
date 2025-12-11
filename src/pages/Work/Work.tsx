import { motion } from "framer-motion";
import type { Translations } from "../../translations";

interface WorkProps {
  t: Translations;
  isDarkMode: boolean;
  language: string;
}

export const Work = ({ t, isDarkMode, language }: WorkProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";

  return (
    <div className={`h-screen h-[100dvh] ${bgColor} ${textColor} overflow-hidden w-full`}>
      <div className="h-full max-w-[1400px] w-full mx-auto px-6 lg:px-10 py-6 pb-20 md:pb-24">
        {/* Empty */}
      </div>
    </div>
  );
};
