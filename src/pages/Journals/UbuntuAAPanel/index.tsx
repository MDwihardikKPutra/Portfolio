import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

import { articleData } from "./journalData";

export const UbuntuAAPanel = () => {
  const { language } = useAppContext();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const langKey = language === "id" ? "id" : "en";
  const s = articleData.sections;

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white pt-24 pb-20 flex flex-col font-sans">
      
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Main Article (col-span-9) */}
        <article className="lg:col-span-9 flex flex-col min-w-0">
          
          <Link 
            to="/home" 
            className="text-[11px] font-mono tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors uppercase flex items-center gap-1.5 mb-8 self-start"
          >
            <span>←</span> <span>{language === 'id' ? "Beranda" : "Home"}</span>
          </Link>

          <div className="flex flex-col mb-10 pb-8 border-b border-neutral-100">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-0 leading-tight">
              {language === 'id' ? articleData.title.id : articleData.title.en}
            </h1>
          </div>

          <div className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-800 space-y-10">
            
            <p className="text-[17px] text-neutral-900 leading-relaxed font-normal italic pl-4 border-l-2 border-neutral-900 text-justify">
              {articleData.intro[langKey]}
            </p>

            {/* SECTION 1: HOST ENVIRONMENT */}
            <section id="host-environment" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.hostSpecs[langKey].heading}</h2>
              <div className="space-y-4">
                {s.hostSpecs[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>
            </section>

            {/* SECTION 2: AAPANEL MANAGEMENT */}
            <section id="aapanel-management" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.aaPanelMgmt[langKey].heading}</h2>
              <div className="space-y-4">
                {s.aaPanelMgmt[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/Linux-Ubuntu/Screenshot 2025-10-14 160607.png" 
                    alt="aaPanel Dashboard Overview" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id' 
                    ? "Fig 1. — Tampilan utama aaPanel menampilkan metrik load CPU, RAM, dan penyimpanan" 
                    : "Fig 1. — Main aaPanel dashboard displaying CPU load, RAM, and storage metrics"}
                </span>
              </div>
            </section>

            {/* SECTION 3: APPLICATION DEPLOYMENT */}
            <section id="application-deployment" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.deployment[langKey].heading}</h2>
              <div className="space-y-4">
                {s.deployment[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <img 
                      src="/Linux-Ubuntu/Screenshot 2025-10-14 164550.png" 
                      alt="Adding a new site in aaPanel" 
                      className="w-full h-auto object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 text-center">
                    {language === 'id'
                      ? "Fig 2. — Konfigurasi domain dan IP binding untuk situs baru di port 12"
                      : "Fig 2. — Domain and IP binding configuration for a new site on port 12"}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <img 
                      src="/Linux-Ubuntu/Screenshot 2025-10-14 164710.png" 
                      alt="Site creation success in aaPanel" 
                      className="w-full h-auto object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 text-center">
                    {language === 'id'
                      ? "Fig 3. — Situs web/aplikasi PHP berhasil dibuat dan dijalankan"
                      : "Fig 3. — PHP website/application successfully created and running"}
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 4: SECURITY & FIREWALL */}
            <section id="security-firewall" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.security[langKey].heading}</h2>
              <div className="space-y-4">
                {s.security[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/Linux-Ubuntu/Screenshot 2025-10-15 132219.png" 
                    alt="aaPanel Firewall and Port Rules" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 4. — Aturan firewall port di aaPanel membatasi akses hanya untuk layanan yang dibutuhkan"
                    : "Fig 4. — Port firewall rules in aaPanel restricting access to essential services"}
                </span>
              </div>
            </section>

            {/* SECTION 5: DASHBOARD IMPLEMENTATION */}
            <section id="dashboard-implementation" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.dashboard[langKey].heading}</h2>
              <div className="space-y-4">
                {s.dashboard[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/Linux-Ubuntu/Screenshot 2025-10-29 164221.png" 
                    alt="PGE Employee Dashboard Interface" 
                    className="w-full h-auto object-cover rounded border border-neutral-200"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 5. — Antarmuka pengguna PGE Employee Dashboard yang beroperasi penuh"
                    : "Fig 5. — Fully operational PGE Employee Dashboard user interface"}
                </span>
              </div>
            </section>

            {/* Outro summary callout */}
            <div className="bg-neutral-50 border border-neutral-200/60 p-6 rounded-lg text-neutral-800 text-[14px] leading-relaxed shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] mt-8">
              <span className="font-semibold text-neutral-900 block mb-1">Architecture Summary:</span>
              {articleData.footer.p1[langKey]}
            </div>

          </div>
        </article>

        {/* RIGHT COLUMN: Sticky Table of Contents Sidebar (col-span-3) */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-32 self-start pl-6 border-l border-neutral-100">
          <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-widest font-bold mb-4">
            {language === 'id' ? "Daftar Isi" : "Table of Contents"}
          </span>
          <nav className="flex flex-col gap-3 text-[13px] font-sans text-neutral-500">
            <a 
              href="#host-environment" 
              onClick={(e) => handleScroll(e, "host-environment")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.hostSpecs[langKey].heading}
            </a>
            <a 
              href="#aapanel-management" 
              onClick={(e) => handleScroll(e, "aapanel-management")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.aaPanelMgmt[langKey].heading}
            </a>
            <a 
              href="#application-deployment" 
              onClick={(e) => handleScroll(e, "application-deployment")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.deployment[langKey].heading}
            </a>
            <a 
              href="#security-firewall" 
              onClick={(e) => handleScroll(e, "security-firewall")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.security[langKey].heading}
            </a>
            <a 
              href="#dashboard-implementation" 
              onClick={(e) => handleScroll(e, "dashboard-implementation")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.dashboard[langKey].heading}
            </a>
          </nav>
        </aside>

      </div>
    </div>
  );
};
