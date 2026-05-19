"use client";

import * as React from "react";
import { Link } from "react-router-dom";

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

interface GooeyTextProps {
  texts?: string[];
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  className = "",
  textClassName = "",
}: GooeyTextProps) {
  // Hybrid navigation: Smooth scroll to Hero if present on page, else standard react-router route transition
  const handleMatterClick = (e: React.MouseEvent) => {
    const heroElement = document.getElementById("home");
    if (heroElement) {
      e.preventDefault(); // Intercept normal navigation
      heroElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={cn("w-full flex items-center justify-start text-left", className)}>
      <h2 className={cn("font-medium tracking-tight font-helvetica text-text-primary leading-tight md:leading-snug max-w-none", textClassName)}>
        Making things{" "}
        <Link 
          to="/projects"
          className="relative group inline-block cursor-pointer text-text-primary pb-0.5"
        >
          work,
        </Link>{" "}
        then making them{" "}
        <Link 
          to="/home"
          onClick={handleMatterClick}
          className="relative group inline-block cursor-pointer text-text-primary pb-0.5"
        >
          matter.
        </Link>
      </h2>
    </div>
  );
}
