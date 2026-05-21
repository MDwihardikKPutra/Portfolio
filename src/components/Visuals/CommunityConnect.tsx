import { Github, Linkedin, Instagram, FileText } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function CommunityConnect() {
  const { language } = useAppContext();

  interface StatItem {
    label: string;
    value: string;
    url: string;
    icon: React.ComponentType<any>;
    avatarUrl: string;
  }

  const stats: StatItem[] = [
    {
      label: "GitHub",
      value: "@MDwihardikKPutra",
      url: "https://github.com/MDwihardikKPutra",
      icon: Github,
      avatarUrl: "https://github.com/MDwihardikKPutra.png",
    },
    {
      label: "LinkedIn",
      value: "M. Dwihardik",
      url: "https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/",
      icon: Linkedin,
      avatarUrl: "/profile-linkedin-diko.png", // Unique file name to prevent collision
    },
    {
      label: "Instagram",
      value: "@dykoputra_",
      url: "https://www.instagram.com/dykoputra_/",
      icon: Instagram,
      avatarUrl: "/profile-instagram-diko.png", // Instagram profile is a solid color block
    },
    {
      label: "Medium",
      value: "@dykoputra",
      url: "https://medium.com/@dykoputra",
      icon: FileText,
      avatarUrl: "/profile-medium-diko.jpg", // Medium profile photo
    },
  ];

  return (
    <div className="bg-black pt-4 pb-16 px-4 md:px-8 lg:px-16 border-t border-neutral-900 relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        

        {/* Main Heading with Images */}
        <div className="text-center max-w-3xl mx-auto relative text-white px-2">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-light tracking-tight leading-relaxed md:leading-snug">
            {language === "id" ? "Memudahkan proses untuk" : "We make it easy to"}{" "}
            <span className="inline-flex align-middle mx-1.5 relative overflow-hidden sm:w-14 w-9 sm:h-14 h-9 origin-center transition-all duration-300 hover:scale-110 rounded-full border border-neutral-800">
              <img
                src="https://github.com/MDwihardikKPutra.png"
                alt="Diko Putra GitHub Avatar"
                className="object-cover w-full h-full"
                style={{ objectPosition: "center" }}
              />
            </span>{" "}
            {language === "id" ? "berkolaborasi & membangun" : "collaborate & build"}{" "}
            <span className="inline-flex align-middle mx-1.5 relative overflow-hidden sm:w-14 w-9 sm:h-14 h-9 origin-center transition-all duration-300 hover:scale-110 rounded-full border border-neutral-800">
              <img
                src="/wasnevermeant.png"
                alt="Hardware servers concept"
                className="object-cover w-full h-full"
              />
            </span>{" "}
            {language === "id" 
              ? "infrastruktur tangguh untuk masa depan." 
              : "resilient infrastructure for the future."
            }
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-neutral-950 mt-10 md:mt-14 w-full mx-auto px-4 md:px-8 py-6 md:py-8 border border-neutral-900 rounded-2xl relative">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <a
                key={stat.label}
                href={stat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 relative group cursor-pointer text-center justify-center items-center h-16 overflow-hidden"
              >
                {index !== 0 && (
                  <div className="hidden md:block w-0.5 h-9 border-l border-dashed border-neutral-800 absolute left-0" />
                )}
                
                {/* Default State: Lucide Icon */}
                <div className="text-white flex items-center justify-center w-full h-full translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                {/* Hover State: Avatar Image & Handle */}
                <div className="absolute inset-0 opacity-0 flex items-center justify-center gap-3 w-full group-hover:opacity-100 transition-all duration-300 ease-out">
                  <div className="w-8 h-8 rounded-full border border-neutral-800 overflow-hidden flex-shrink-0">
                    <img 
                      src={stat.avatarUrl} 
                      alt={`${stat.label} Profile`} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[12px] font-medium text-white tracking-tight leading-none">{stat.value}</span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mt-1">{stat.label}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
