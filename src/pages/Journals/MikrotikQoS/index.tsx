import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

import { articleData } from "./journalData";

export const MikrotikQoS = () => {
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

            {/* SECTION 1: TRAFFIC IDENTIFICATION */}
            <section id="traffic-identification" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.trafficId[langKey].heading}</h2>
              <div className="space-y-4">
                {s.trafficId[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
                {s.trafficId[langKey].listItems && (
                  <ul className="list-disc pl-5 space-y-1.5 text-justify">
                    {s.trafficId[langKey].listItems.map((item, idx) => (
                      <li key={idx}>
                        <span dangerouslySetInnerHTML={{
                          __html: item.replace(/\*(.*?)\*/g, "<em>$1</em>")
                        }} />
                      </li>
                    ))}
                  </ul>
                )}
                {s.trafficId[langKey].postParagraphs && s.trafficId[langKey].postParagraphs.map((p, idx) => (
                  <p key={`post-${idx}`} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/Mikrotik/Screenshot 2026-01-14 101102.png" 
                    alt="MikroTik RAW Firewall SNI Rules" 
                    className="w-full h-auto object-cover rounded border border-neutral-200/40"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id' 
                    ? "Fig 1. — Konfigurasi RAW Firewall menangkap SNI TLS Host ke dalam Address Lists" 
                    : "Fig 1. — RAW Firewall configuration capturing TLS Host SNIs into Address Lists"}
                </span>
              </div>
            </section>

            {/* SECTION 2: HIERARCHICAL QOS */}
            <section id="hierarchical-qos" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.hierarchicalQoS[langKey].heading}</h2>
              <div className="space-y-4">
                {s.hierarchicalQoS[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
                {s.hierarchicalQoS[langKey].listItems && (
                  <ul className="list-disc pl-5 space-y-1.5 text-justify">
                    {s.hierarchicalQoS[langKey].listItems.map((item, idx) => (
                      <li key={idx}>
                        <span dangerouslySetInnerHTML={{
                          __html: item.replace(/\*(.*?)\*/g, "<em>$1</em>")
                        }} />
                      </li>
                    ))}
                  </ul>
                )}
                {s.hierarchicalQoS[langKey].postParagraphs && s.hierarchicalQoS[langKey].postParagraphs.map((p, idx) => (
                  <p key={`post-${idx}`} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <img 
                      src="/Mikrotik/image copy.png" 
                      alt="QoS and Bandwidth Management Flowchart" 
                      className="w-full h-auto object-cover rounded border border-neutral-200/40"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 text-center">
                    {language === 'id'
                      ? "Fig 2. — Diagram Alur Arsitektur QoS dan Manajemen Prioritas Bandwidth"
                      : "Fig 2. — QoS Architecture and Bandwidth Priority Management Flowchart"}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <img 
                      src="/Mikrotik/Screenshot 2025-12-23 134414.png" 
                      alt="MikroTik Mangle Rules for QoS" 
                      className="w-full h-auto object-cover rounded border border-neutral-200/40"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 text-center">
                    {language === 'id'
                      ? "Fig 3. — Aturan Mangle memisahkan traffic streaming, prioritas kantor, dan browsing umum"
                      : "Fig 3. — Mangle rules separating streaming, office priority, and general browsing traffic"}
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 3: BITTORRENT FILTER */}
            <section id="bittorrent-filter" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.bittorrentFilter[langKey].heading}</h2>
              <div className="space-y-4">
                {s.bittorrentFilter[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
                {s.bittorrentFilter[langKey].listItems && (
                  <ul className="list-disc pl-5 space-y-1.5 text-justify">
                    {s.bittorrentFilter[langKey].listItems.map((item, idx) => (
                      <li key={idx}>
                        <span dangerouslySetInnerHTML={{
                          __html: item.replace(/\*(.*?)\*/g, "<em>$1</em>")
                        }} />
                      </li>
                    ))}
                  </ul>
                )}
                {s.bittorrentFilter[langKey].postParagraphs && s.bittorrentFilter[langKey].postParagraphs.map((p, idx) => (
                  <p key={`post-${idx}`} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/Mikrotik/Screenshot 2025-12-23 134423.png" 
                    alt="Active Connections in MikroTik" 
                    className="w-full h-auto object-cover rounded border border-neutral-200/40"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 4. — Tabel Koneksi aktif yang menunjukkan koneksi telah berhasil ditandai (Connection Mark)"
                    : "Fig 4. — Active Connections table showing successfully marked traffic (Connection Mark)"}
                </span>
              </div>
            </section>

            {/* SECTION 4: SECURITY HARDENING */}
            <section id="security-hardening" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.securityHardening[langKey].heading}</h2>
              <div className="space-y-4">
                {s.securityHardening[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
                {s.securityHardening[langKey].listItems && (
                  <ul className="list-disc pl-5 space-y-1.5 text-justify">
                    {s.securityHardening[langKey].listItems.map((item, idx) => (
                      <li key={idx}>
                        <span dangerouslySetInnerHTML={{
                          __html: item.replace(/\*(.*?)\*/g, "<em>$1</em>")
                        }} />
                      </li>
                    ))}
                  </ul>
                )}
                {s.securityHardening[langKey].postParagraphs && s.securityHardening[langKey].postParagraphs.map((p, idx) => (
                  <p key={`post-${idx}`} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/Mikrotik/Screenshot 2026-01-13 140320.png" 
                    alt="MikroTik Firewall Filter Rules" 
                    className="w-full h-auto object-cover rounded border border-neutral-200/40"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 5. — Aturan Filter Firewall untuk isolasi VLAN dan perlindungan keamanan akses"
                    : "Fig 5. — Firewall Filter rules enforcing VLAN isolation and access security protection"}
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
              href="#traffic-identification" 
              onClick={(e) => handleScroll(e, "traffic-identification")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.trafficId[langKey].heading}
            </a>
            <a 
              href="#hierarchical-qos" 
              onClick={(e) => handleScroll(e, "hierarchical-qos")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.hierarchicalQoS[langKey].heading}
            </a>
            <a 
              href="#bittorrent-filter" 
              onClick={(e) => handleScroll(e, "bittorrent-filter")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.bittorrentFilter[langKey].heading}
            </a>
            <a 
              href="#security-hardening" 
              onClick={(e) => handleScroll(e, "security-hardening")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.securityHardening[langKey].heading}
            </a>
          </nav>
        </aside>

      </div>
    </div>
  );
};
