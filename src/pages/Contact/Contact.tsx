import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, ArrowUpRight } from "lucide-react";
import type { Translations } from "../../translations";

interface ContactProps {
  t: Translations;
  isDarkMode: boolean;
}

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "ddiko105@gmail.com",
    href: "mailto:ddiko105@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 878 5632 4656",
    href: "https://wa.me/6287856324656",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Mokhamad Dwihardik K.P.",
    href: "https://linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "MDwihardikKPutra",
    href: "https://github.com/MDwihardikKPutra",
  },
];

export const Contact = ({ t }: ContactProps) => {
  return (
    <div className="h-full bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden w-full">
      <div className="h-full w-full px-6 md:px-10 lg:px-16 py-6 md:py-8 flex flex-col justify-center">
        <div className="max-w-[600px] w-full">

          {/* Quote */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight mb-16"
          >
            Trying to do <span className="font-medium">better</span>
          </motion.h2>

          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#555555] mb-1">
              {t.getInTouch || "Get in Touch"}
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed max-w-[400px]">
              Feel free to reach out for collaborations, opportunities, or just a friendly conversation.
            </p>
          </motion.div>

          {/* Contact List */}
          <div className="space-y-0">
            {contactItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.08 }}
                className="flex items-center justify-between py-4 border-t border-white/[0.06] group cursor-pointer transition-colors hover:bg-white/[0.02] -mx-3 px-3"
              >
                <div className="flex items-center gap-4">
                  <item.icon size={16} className="text-[#555555] group-hover:text-[#f5f5f5] transition-colors shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#555555] block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-sm text-[#d4d4d4] group-hover:text-[#f5f5f5] transition-colors">
                      {item.value}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-[#333333] group-hover:text-[#f5f5f5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                />
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-[10px] text-[#333333] tracking-wide"
          >
            © {new Date().getFullYear()} Mokhamad Dwihardik Kusuma Putra
          </motion.p>

        </div>
      </div>
    </div>
  );
};
