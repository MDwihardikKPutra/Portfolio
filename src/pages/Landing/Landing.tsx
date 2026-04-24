import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preloadAll } from "../../utils/preloadImages";

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

      // We wait for BOTH assets to load AND or at least a 6-second timer to reach near 95%
      // To make it strictly 5-6s, we can just wait for assets AND a minimum timeout
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
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* 3D Spinner Container */}
      <div className="spinner-container">
        <div className="spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>

      {/* Progress Info */}
      <div className="mt-12 flex flex-col items-center gap-1">
        <motion.div 
          className="text-[14px] font-medium tracking-tight text-black/40 text-center italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          I mean, thanks for waiting
        </motion.div>
        <motion.span className="text-xl font-light tabular-nums text-black/60">
          {percentageText}
        </motion.span>
      </div>

      {/* Opening Curtain Effect on Finish */}
      <AnimatePresence>
        {count.get() >= 100 && (
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            className="absolute inset-0 bg-white z-50 origin-bottom"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};
