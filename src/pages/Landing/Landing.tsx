import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  
  // High-performance motion values
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toString().padStart(2, '0'));

  useEffect(() => {
    // Animate smoothly from 0 to 100 natively at 60fps
    const controls = animate(count, 100, {
      duration: 2.4, // Match duration
      ease: [0.16, 1, 0.3, 1], // Custom cinematic easeOutQuart
      onComplete: () => {
        setTimeout(() => navigate("/home"), 200); // Brief pause at 100
      }
    });

    return () => controls.stop();
  }, [count, navigate]);

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      <div className="flex flex-col items-center justify-center mt-[-10vh]">
        
        {/* Massive Percentage Counter */}
        <div className="overflow-hidden flex items-end">
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start"
          >
            <motion.span className="text-[120px] md:text-[180px] font-black text-black leading-none tracking-tighter tabular-nums drop-shadow-sm">
              {rounded}
            </motion.span>
            <span className="text-2xl md:text-3xl font-bold mt-6 md:mt-10 ml-2">
              %
            </span>
          </motion.div>
        </div>

        {/* Small branding text */}
        <div className="overflow-hidden mt-6">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.5em] text-black"
          >
            Initiating Digital Archive Let's Wait
          </motion.p>
        </div>

      </div>

      {/* Edge-to-edge subtle precise progress line */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black/5">
         <motion.div 
           className="h-full bg-black origin-left"
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }} 
         />
      </div>
    </div>
  );
};
