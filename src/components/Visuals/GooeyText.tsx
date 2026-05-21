"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface GooeyTextProps {
  className?: string;
  textClassName?: string;
  texts?: string[];
  morphTime?: number;
  cooldownTime?: number;
}

export function GooeyText({
  className = "",
  textClassName = "",
  texts: _texts,
  morphTime: _morphTime,
  cooldownTime: _cooldownTime,
}: GooeyTextProps) {
  const words = ["Making", "things", "work,", "then", "making", "them", "matter."];

  const handleMatterClick = (e: React.MouseEvent) => {
    const heroElement = document.getElementById("home");
    if (heroElement) {
      e.preventDefault();
      heroElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Framer Motion staggered child animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08, // Stagger delay between each word
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 12 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any // Premium easeOutQuart
      }
    }
  };

  return (
    <div className={cn("w-full flex items-center justify-start text-left select-none", className)}>
      <motion.h2 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
        className={cn(
          "font-medium tracking-tight font-helvetica text-text-primary leading-tight md:leading-snug max-w-none flex flex-wrap", 
          textClassName
        )}
      >
        {words.map((word, idx) => {
          let content;
          if (idx === 2) {
            // "work," is a Link to projects
            content = (
              <Link 
                to="/projects"
                className="relative group inline-block cursor-pointer text-text-primary pb-0.5 hover:text-neutral-400 transition-colors"
              >
                {word}
              </Link>
            );
          } else if (idx === 6) {
            // "matter." is a Link that scrolls back to top
            content = (
              <Link 
                to="/home"
                onClick={handleMatterClick}
                className="relative group inline-block cursor-pointer text-text-primary pb-0.5 hover:text-neutral-400 transition-colors"
              >
                {word}
              </Link>
            );
          } else {
            content = word;
          }

          return (
            <motion.span 
              key={idx} 
              variants={wordVariants}
              className="inline-block"
            >
              {content}
              {idx !== words.length - 1 && "\u00A0"}
            </motion.span>
          );
        })}
      </motion.h2>
    </div>
  );
}
