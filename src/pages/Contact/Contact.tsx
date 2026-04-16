import { motion } from "framer-motion";
import type { Translations } from "../../translations";
import { contactInfo, socialLinks } from "../../data";
import { Github, Linkedin } from "lucide-react";

interface ContactProps {
  t: Translations;
  isDarkMode: boolean;
}

const MediumIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <Github size={20} />,
  LinkedIn: <Linkedin size={20} />,
  Medium: <MediumIcon size={20} />,
};

export const Contact = ({}: ContactProps) => {
  return (
    <div id="contact" className="section-full bg-white">
      <div className="section-container w-full h-full flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full">

          {/* Left: Statement */}
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter uppercase text-black">
              Trying<br />to do<br />better.
            </h2>
          </div>

          {/* Right: Contact Information */}
          <div className="space-y-6">

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Email</p>
              <a href={`mailto:${contactInfo.email}`} className="text-lg font-black text-black hover:opacity-50 transition-opacity block">
                {contactInfo.email}
              </a>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">WhatsApp</p>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-lg font-black text-black hover:opacity-50 transition-opacity block">
                {contactInfo.phone}
              </a>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Connect</p>
              <div className="flex gap-4 items-center">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-40 transition-opacity" title={link.name}>
                    {iconMap[link.name]}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Based In</p>
              <p className="text-sm font-black text-black uppercase tracking-wide">
                {contactInfo.location}
              </p>
              <p className="text-sm font-black text-black/50 uppercase tracking-wide">
                {contactInfo.zone}
              </p>
            </div>

          </div>
          </div>
        </div>

        {/* Copyright footer pinned to bottom */}
        <div className="mt-auto pt-6 border-t border-black/5">
          <p className="text-[9px] font-semibold text-black/20 uppercase tracking-[0.3em]">
            {contactInfo.copyright}
          </p>
        </div>
      </div>
    </div>
  );
};
