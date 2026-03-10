import { motion } from "framer-motion";
import type { Translations } from "../../translations";

interface HomeProps {
  t: Translations;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
  language: string;
}

export const Home = ({ t }: HomeProps) => {
  const firstName = t.firstName;
  const lastName = t.lastName;

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="h-full flex flex-col w-full relative overflow-hidden text-[#f5f5f5]">

      {/* Subtle accent gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-4 md:pt-8 pb-6 w-full mx-auto">
        <div className="flex flex-col max-w-4xl">

          {/* Name - Letter by letter reveal */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.1] text-white">
              <span className="block">
                {firstName.split("").map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    style={{ minWidth: letter === " " ? "0.3em" : undefined }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
              <span className="block text-shimmer">
                {lastName.split("").map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    custom={i + firstName.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    style={{ minWidth: letter === " " ? "0.3em" : undefined }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>


          {/* About text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-sm sm:text-base leading-[1.8] text-justify text-gray-300 max-w-2xl"
          >
            {t.aboutText1}
          </motion.p>

        </div>
      </div>
    </div>
  );
};