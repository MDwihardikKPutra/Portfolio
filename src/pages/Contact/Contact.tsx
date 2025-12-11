import { motion } from "framer-motion";
import { Contact as ContactComponent } from "../../components/Contact/Contact";
import { Footer } from "../../components/Footer/Footer";
import type { Translations } from "../../translations";

interface ContactProps {
  t: Translations;
  isDarkMode: boolean;
}

export const Contact = ({ t, isDarkMode }: ContactProps) => {
  const bgColor = isDarkMode ? "bg-[#0a0a0a]" : "bg-white";
  const textColor = isDarkMode ? "text-[#f5f5f5]" : "text-[#1a1a1a]";

  return (
    <div className={`h-screen h-[100dvh] ${bgColor} ${textColor} flex items-center overflow-hidden w-full`}>
      <div className="max-w-[1600px] w-full mx-auto px-8 lg:px-12 pt-8 pb-20 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start h-full">
          
          {/* Column 1 - Title */}
          <div className="md:col-span-4 flex items-center h-full">
            <motion.h2
              className="text-[clamp(2rem,6vw,4rem)] font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.letsBuild.split(" ").map((word, i) => {
                if (word === "powerful") {
                  return <span key={i} className="italic">{word} </span>;
                }
                return <span key={i}>{word} </span>;
              })}
            </motion.h2>
          </div>

          {/* Column 2 - Contact & Footer */}
          <div className="md:col-span-8 flex flex-col space-y-8">
            <ContactComponent t={t} isDarkMode={isDarkMode} />
            <Footer t={t} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};