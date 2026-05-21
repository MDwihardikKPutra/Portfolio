import { contactInfo } from "../../data";
import { memo } from "react";

// --- CONTACT COMPONENT (Revision 12.0: Solid Pure White Theme for WebGL Dark Footer) ---
export const Contact = memo(() => {
  return (
    <div id="contact" className="w-full text-white">
      <div className="editorial-grid gap-y-10 lg:gap-y-0">
        
        {/* Left Column (Left Wing - 6-span): Connect & Copyright */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between min-h-[140px] text-left">
          <span className="editorial-label font-normal !text-white">Connect</span>
          <span className="text-[11px] tracking-wide text-white block">
            © 2026 Mokhamad Dwihardik Kusuma Putra / Diko Putra
          </span>
        </div>

        {/* Right Column (Right Wing - 6-span): Email & Tagline + Icons */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between min-h-[140px] items-start lg:items-end text-left lg:text-right mt-10 lg:mt-0">
          
          {/* Top Element: Core Action (Email Link) */}
          <a 
            href={`mailto:${contactInfo.email}`} 
            className="text-[20px] md:text-[24px] font-normal tracking-tight border-b border-white pb-0.5 hover:opacity-75 transition-all duration-300 w-fit text-white block"
          >
            {contactInfo.email}
          </a>

          {/* Bottom Element: Tagline only */}
          <div className="flex flex-col items-start lg:items-end gap-3 mt-6 lg:mt-0">
            <p className="text-editorial-body text-[14px] leading-relaxed !text-white">
              Making things work, then making them matter.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
});

Contact.displayName = "Contact";
