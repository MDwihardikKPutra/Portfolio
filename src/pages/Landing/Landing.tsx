import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preloadAll } from "../../utils/preloadImages";
import { ConstellationBg } from "../../components/Visuals/ConstellationBg";

export const Landing = () => {
  const navigate = useNavigate();
  
  // High-performance motion values
  const count = useMotionValue(0);
  const progress = useTransform(count, [0, 100], [0, 1]);
  const percentage = useTransform(count, (v) => Math.floor(v));
  const percentageText = useTransform(percentage, (v) => `${v}%`);

  useEffect(() => {
    let isMounted = true;

    // Phase 1: Smoothly animate to 95% 
    const crawlAnimation = animate(count, 95, {
      duration: 6, // 6 seconds for the main crawl
      ease: [0.16, 1, 0.3, 1],
    });

    // Phase 2: Wait for real assets to load
    const startLoading = async () => {
      const windowLoad = new Promise(resolve => {
        if (document.readyState === "complete") resolve(null);
        else window.addEventListener("load", resolve, { once: true });
      });

      const minDuration = new Promise(resolve => setTimeout(resolve, 5500));

      await Promise.all([preloadAll(), windowLoad, minDuration]);

      if (isMounted) {
        crawlAnimation.stop();
        // Phase 3: Finish the remaining progress 
        animate(count, 100, {
          duration: 1.5,
          ease: "circOut",
          onComplete: () => {
             setTimeout(() => {
               if (isMounted) navigate("/home");
             }, 800); 
          }
        });
      }
    };

    startLoading();

    return () => {
      isMounted = false;
      crawlAnimation.stop();
    };
  }, [count, navigate]);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Static Cosmic Background */}
      <div className="absolute inset-0 z-0">
        <ConstellationBg pages={1} showLabels={false} />
      </div>

      <AnimatePresence>
        {count.get() < 100 && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[10]"
          >
            <div className="flex flex-col items-center justify-center">
              {/* 3D Spinner Container (White) */}
              <div className="spinner-container invert brightness-200">
                <div className="spinner">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>

              {/* Progress Info (White) */}
              <div className="mt-32 flex flex-col items-center gap-1">
                <motion.div 
                  className="text-[14px] font-medium tracking-tight text-white/40 text-center italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  I mean, thanks for waiting
                </motion.div>
                <motion.span className="text-xl font-light tabular-nums text-white">
                  {percentageText}
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


