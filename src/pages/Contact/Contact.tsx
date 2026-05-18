import { contactInfo } from "../../data";
import { memo } from "react";
import { Github, Linkedin, FileText } from "lucide-react";

// --- CONTACT COMPONENT (Revision 8.2: Symmetrical Full-Grid Editorial Footer with Logos) ---
export const Contact = memo(() => {
  return (
    <div id="contact" className="w-full">
      <div className="editorial-grid gap-y-10 lg:gap-y-0">
        
        {/* Column 1: Label (3-span) - Aligned Left */}
        <div className="col-span-12 lg:col-span-3 text-left">
          <span className="editorial-label font-normal">Connect</span>
        </div>

        {/* Column 2: Core Action & Location (4-span) - Aligned Left */}
        <div className="col-span-12 lg:col-span-4 mt-2 lg:mt-0 flex flex-col justify-between min-h-[110px] text-left">
          <div className="space-y-4">
            <h2 className="text-[15px] md:text-[16px] leading-relaxed font-normal tracking-tight text-text-primary">
              Let's build something intentional.
            </h2>
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="text-[20px] md:text-[24px] font-normal tracking-tight border-b border-text-primary/30 pb-0.5 hover:border-text-primary hover:opacity-60 transition-all duration-300 w-fit text-text-primary block"
            >
              {contactInfo.email}
            </a>
          </div>
          <span className="text-[11px] font-normal text-text-primary/50 mt-4 block">
            Jakarta, ID — GMT +7
          </span>
        </div>

        {/* Column 3: Notice & High-Density Social Logos (5-span) - Flush Right on Desktop */}
        <div className="col-span-12 lg:col-span-5 mt-6 lg:mt-0 flex flex-col justify-between min-h-[110px] items-start lg:items-end text-left lg:text-right">
          <p className="text-editorial-body text-[14px] leading-relaxed text-text-primary/60 w-full">
            Making things work, then making them matter.
          </p>
          
          {/* Horizontal low-profile social logos - pushed right on desktop */}
          <div className="flex gap-6 items-center mt-6 w-full justify-start lg:justify-end">
            <a 
              href="https://github.com/MDwihardikKPutra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-primary/60 hover:text-text-primary hover:scale-110 transition-all duration-300 block"
              aria-label="GitHub"
            >
              <Github size={16} strokeWidth={1.5} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-primary/60 hover:text-text-primary hover:scale-110 transition-all duration-300 block"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} strokeWidth={1.5} />
            </a>
            <a 
              href="https://medium.com/@dykoputra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-primary/60 hover:text-text-primary hover:scale-110 transition-all duration-300 block"
              aria-label="Medium"
            >
              <FileText size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Full-width elegant divider */}
        <div className="col-span-12 h-[1px] bg-border-primary/60 mt-16 mb-6"></div>

        {/* Bottom Full-Width Horizontal Metadata Row - Perfectly Balanced Left/Right */}
        <div className="col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 text-[11px] tracking-wide text-text-primary/50 font-normal w-full">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-left">
            <span>Mokhamad Dwihardik Kusuma Putra / Diko Putra</span>
            <span className="hidden md:inline text-text-primary/20">|</span>
            <span>IT Engineer & Design Systems Architect</span>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-left md:text-right">
            <span>© 2026 Architectural Digital Artifact</span>
            <span className="hidden md:inline text-text-primary/20">|</span>
            <span>Built with Vite / Framer / Intent.</span>
          </div>
        </div>

      </div>
    </div>
  );
});

Contact.displayName = "Contact";
