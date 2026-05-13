import { motion } from "framer-motion";
import { Github, Linkedin, FileText, Send } from "lucide-react";
import { contactInfo } from "../../data";
import { memo } from "react";

// --- CONTACT COMPONENT (Revision 7.10: Modularized notice) ---
export const Contact = memo(({ showNotice = true }: { showNotice?: boolean }) => {
  return (
    <div id="contact" className="w-full">
      <div className="flex flex-col gap-10">
        
        {/* Unified Connection Block */}
        <div className="space-y-10">
          {showNotice && (
            <p className="text-editorial-body text-[15px] md:text-[16px] leading-relaxed text-text-primary font-normal">
              I respond to inquiries within 24 hours. For urgent architectural digital projects, please mention the timeline in the brief.
            </p>
          )}
          
          <div className="flex flex-col gap-6">
             <a href={`mailto:${contactInfo.email}`} className="text-[20px] md:text-[24px] lg:text-[28px] font-normal tracking-tight border-b border-text-primary pb-4 hover:opacity-60 transition-all duration-700 w-fit text-text-primary">
               {contactInfo.email}
             </a>
             <span className="text-[11px] font-normal text-text-primary">Jakarta, ID — GMT +7</span>
          </div>
        </div>

        {/* Minimal Social Matrix - Unified Vertical Stack */}
        <div className="flex flex-col gap-4 max-w-sm">
           <a href="https://github.com/MDwihardikKPutra" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group border-b border-border-primary pb-3 hover:opacity-60 transition-all">
             <span className="text-[12px] font-normal tracking-tight text-text-primary">Github</span>
             <Github size={14} strokeWidth={1} className="text-text-primary" />
           </a>
           <a href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group border-b border-border-primary pb-3 hover:opacity-60 transition-all">
             <span className="text-[12px] font-normal tracking-tight text-text-primary">Linkedin</span>
             <Linkedin size={14} strokeWidth={1} className="text-text-primary" />
           </a>
           <a href="https://medium.com/@dykoputra" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group border-b border-border-primary pb-3 hover:opacity-60 transition-all">
             <span className="text-[12px] font-normal tracking-tight text-text-primary">Medium</span>
             <FileText size={14} strokeWidth={1} className="text-text-primary" />
           </a>
        </div>
      </div>
      
      {/* Footer Meta */}
      <div className="mt-24 pt-8 border-t border-border-primary flex flex-col md:flex-row justify-between items-end gap-8 pb-12">
        <div className="flex flex-col gap-1">
          <span className="text-[14px] font-normal tracking-tight text-text-primary">Mokhamad Dwihardik Kusuma Putra / Diko Putra</span>
          <span className="text-[11px] font-normal text-text-primary">IT Engineer & Design Systems Architect</span>
        </div>
        <div className="text-right flex flex-col gap-1">
          <span className="text-[11px] font-normal text-text-primary">© 2026 Architectural Digital Artifact</span>
          <span className="text-[11px] font-normal text-text-primary">Built with Vite / Framer / Intent.</span>
        </div>
      </div>
    </div>
  );
});
