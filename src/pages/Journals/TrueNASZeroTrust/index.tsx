import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

import { articleData } from "./journalData";
import { JournalFlowchart } from "./JournalFlowchart";

export const TrueNASZeroTrust = () => {
  const { language } = useAppContext();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update history hash without scroll jumping
      window.history.pushState(null, "", `#${id}`);
    }
  };

  // Language mapping helpers
  const langKey = language === "id" ? "id" : "en";
  const s = articleData.sections;

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white pt-24 pb-20 flex flex-col font-sans">
      
      {/* 2-Column Grid: Main Article Content (Left) + Table of Contents Sidebar (Right) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Main Article (col-span-9) */}
        <article className="lg:col-span-9 flex flex-col min-w-0">
          
          {/* Breadcrumb Back */}
          <Link 
            to="/home" 
            className="text-[11px] font-mono tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors uppercase flex items-center gap-1.5 mb-8 self-start"
          >
            <span>←</span> <span>{language === 'id' ? "Beranda" : "Home"}</span>
          </Link>

          {/* Metadata Block (Medium Style) */}
          <div className="flex flex-col mb-10 pb-8 border-b border-neutral-100">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-0 leading-tight">
              {language === 'id' ? articleData.title.id : articleData.title.en}
            </h1>
          </div>

          {/* Narrative Flow */}
          <div className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-800 space-y-10">
            
            {/* Introduction block */}
            <p className="text-[17px] text-neutral-900 leading-relaxed font-normal italic pl-4 border-l-2 border-neutral-900 text-justify">
              {articleData.intro[langKey]}
            </p>

            {/* SECTION 1: HOST & ZFS ARCHITECTURE */}
            <section id="host-platform" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.hostSpecs[langKey].heading}</h2>
              <div className="space-y-4">
                {s.hostSpecs[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* Host Hardware List */}
              <div className="my-6 pl-4 border-l border-neutral-200 space-y-2.5 bg-neutral-50/30 py-2 pr-2">
                <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider font-semibold">Host Hardware Registry</span>
                <ul className="space-y-1.5 text-[13.5px] text-neutral-850 list-none pl-0">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">CPU Model:</span> Intel Core i3-4150 @ 3.50GHz <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— 2 Cores / 4 Threads Host CPU</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">System RAM:</span> 8.0 GB (7.7 GiB Available) <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— ZFS ARC Cache + App Runtime Memory</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">OS Platform:</span> TrueNAS Scale 24.04.2.4 <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— Community Edition Host OS</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">Local Static IP:</span> 192.168.22.23 <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— Intranet LAN Host IP</span>
                  </li>
                </ul>
              </div>

              {/* ZFS Datasets List */}
              <div className="my-6 pl-4 border-l border-neutral-200 space-y-2.5 bg-neutral-50/30 py-2 pr-2">
                <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider font-semibold">ZFS Dataset Configuration</span>
                <ul className="space-y-1.5 text-[13.5px] text-neutral-850 list-none pl-0">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">data1:</span> 1.85 GiB <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— SMB Protocol (General SMB Share, owned by root)</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">Nextcloud_PGE:</span> 898.92 MiB <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— App Internal (Dedicated Nextcloud application files, owned by root)</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">Pusat-Data:</span> 4.29 GiB <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— SMB & NFS Protocols (Corporate archives sharing, owned by root)</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">Sharing-Data:</span> 50.08 MiB <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— Multi-Protocol Mount (Container shared storage, owned by www-data:www-data)</span>
                  </li>
                </ul>
              </div>

              {/* FIG 1 & 2: TrueNAS and ZFS Images */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <img 
                      src="/True-Nas/Screenshot 2025-09-22 122955.png" 
                      alt="TrueNAS Scale Host Dashboard" 
                      className="w-full h-auto object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 text-center">Fig 1. — TrueNAS Scale Host Dashboard displaying CPU load and memory ARC cache</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <img 
                      src="/True-Nas/Screenshot 2025-10-02 155437.png" 
                      alt="ZFS pool and dataset hierarchy" 
                      className="w-full h-auto object-cover rounded"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 text-center">Fig 2. — ZFS datasets under the PGE_DATA pool</span>
                </div>
              </div>
            </section>

            {/* SECTION 2: DOCKER CONTAINERS */}
            <section id="docker-containers" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.containers[langKey].heading}</h2>
              <div className="space-y-4">
                {s.containers[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* TrueNAS App Deployments List */}
              <div className="my-6 pl-4 border-l border-neutral-200 space-y-3.5 bg-neutral-50/30 py-2 pr-2">
                <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider font-semibold">TrueNAS Scale App Deployments</span>
                <div className="space-y-3.5 text-[13.5px] text-neutral-850">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900">app/nextcloud</span>
                      <span className="text-[10px] font-mono text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-bold uppercase">Running</span>
                    </div>
                    <p className="text-[12.5px] text-neutral-500 mt-1 leading-relaxed text-justify">
                      Powered by Nextcloud Hub (stable train) with containerized PHP-FPM/Nginx. Database queries are handled by a PostgreSQL container, with Redis managing file locks.
                    </p>
                    <span className="text-[11px] text-neutral-400 font-mono mt-0.5 block">Port Mapping: 30027:80, 30000:80</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900">app/cloudflared</span>
                      <span className="text-[10px] font-mono text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-bold uppercase">Running</span>
                    </div>
                    <p className="text-[12.5px] text-neutral-500 mt-1 leading-relaxed text-justify">
                      Cloudflare Tunnel Agent (community train) establishing outbound TLS connections to Cloudflare Edge.
                      Inbound traffic from nextcloud.pg-engineering.com resolves to the local nextcloud ports safely.
                    </p>
                    <span className="text-[11px] text-neutral-400 font-mono mt-0.5 block">Port Mapping: Outbound-Only (No local inbound port exposure)</span>
                </div>
              </div>
            </div>

            {/* FIG 3: Installed Apps Dashboard */}
              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/True-Nas/Screenshot 2025-09-29 125259.png" 
                    alt="TrueNAS Scale Installed Applications" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id' 
                    ? "Fig 3. — Dashboard aplikasi TrueNAS Scale menampilkan status berjalan untuk nextcloud dan cloudflared" 
                    : "Fig 3. — TrueNAS Scale applications dashboard showing running status of nextcloud and cloudflared"}
                </span>
              </div>

              {/* FIG 4: Nextcloud Dashboard */}
              <div className="flex flex-col gap-2 pt-6">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/True-Nas/Screenshot 2025-09-26 160433.png" 
                    alt="Nextcloud Web Dashboard" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 4. — Halaman beranda kolaborasi antarmuka web Nextcloud utama"
                    : "Fig 4. — Central Nextcloud web interface collaboration landing page"}
                </span>
              </div>
            </section>

            {/* SECTION 3: CLOUDFLARE TUNNEL */}
            <section id="cloudflare-tunnel" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.tunneling[langKey].heading}</h2>
              <div className="space-y-4">
                {s.tunneling[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* Cloudflare Tunnel Routes List */}
              <div className="my-6 pl-4 border-l border-neutral-200 space-y-2.5 bg-neutral-50/30 py-2 pr-2">
                <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider font-semibold">Cloudflare Tunnel Routes Schema</span>
                <ul className="space-y-1.5 text-[13.5px] text-neutral-850 list-none pl-0">
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">Tunnel Name:</span> cloud-truenas-pge <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— Zero-Trust outbound daemon</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">Public Hostname:</span> nextcloud.pg-engineering.com <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— Secure Edge HTTPS Endpoint</span>
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-semibold text-neutral-900">Local Inbound Target:</span> http://192.168.22.23:30027 <span className="text-neutral-400 italic text-[12.5px] ml-1.5">— Intranet Nextcloud gateway</span>
                  </li>
                </ul>
              </div>

              {/* FIG 5: Cloudflare Tunnels mapping dashboard */}
              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/True-Nas/Screenshot 2025-09-26 161729.png" 
                    alt="Cloudflare Zero Trust hostname route config" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 5. — Pemetaan terowongan hostname Cloudflare Zero Trust ke port lokal 30027"
                    : "Fig 5. — Cloudflare Zero Trust hostname tunnels mapping to local port 30027"}
                </span>
              </div>
            </section>

            {/* SECTION 4: CLIENT SYNC WORKFLOWS */}
            <section id="client-sync" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.syncWorkflows[langKey].heading}</h2>
              <div className="space-y-4">
                {s.syncWorkflows[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* FIG 6: Interactive sync flow diagram */}
              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-white rounded border border-neutral-200/60 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-neutral-800">
                  <JournalFlowchart />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 6. — Diagram Alir Sinkronisasi Berdasarkan Lokasi yang Interaktif"
                    : "Fig 6. — Interactive Location-Aware Sync Flowchart"}
                </span>
              </div>

              {/* FIG 7: Nextcloud client profile mapping */}
              <div className="flex flex-col gap-2 pt-6">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/True-Nas/Screenshot 2025-09-29 105625.png" 
                    alt="Nextcloud Desktop Client Profile Manager" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 7. — Pengaturan sinkronisasi multi-profil klien desktop (akun Lokal & Publik)"
                    : "Fig 7. — Desktop client multi-profile sync setup (Local & Public accounts)"}
                </span>
              </div>
            </section>

            {/* SECTION 5: SECURITY AUDIT & SNAPSHOT */}
            <section id="security-snapshots" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.securityAudit[langKey].heading}</h2>
              <div className="space-y-4">
                {s.securityAudit[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* FIG 8: Nextcloud Web UI Files */}
              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/True-Nas/Screenshot 2025-10-02 155341.png" 
                    alt="Nextcloud Web UI Files Manager" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 8. — UI Web Nextcloud yang menampung file korporat PGE"
                    : "Fig 8. — Nextcloud Web UI hosting PGE corporate files"}
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
              href="#host-platform" 
              onClick={(e) => handleScroll(e, "host-platform")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.hostSpecs[langKey].heading}
            </a>
            <a 
              href="#docker-containers" 
              onClick={(e) => handleScroll(e, "docker-containers")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.containers[langKey].heading}
            </a>
            <a 
              href="#cloudflare-tunnel" 
              onClick={(e) => handleScroll(e, "cloudflare-tunnel")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.tunneling[langKey].heading}
            </a>
            <a 
              href="#client-sync" 
              onClick={(e) => handleScroll(e, "client-sync")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.syncWorkflows[langKey].heading}
            </a>
            <a 
              href="#security-snapshots" 
              onClick={(e) => handleScroll(e, "security-snapshots")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.securityAudit[langKey].heading}
            </a>
          </nav>
        </aside>

      </div>
    </div>
  );
};
