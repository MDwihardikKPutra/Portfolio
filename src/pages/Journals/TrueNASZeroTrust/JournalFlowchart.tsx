import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";

export const JournalFlowchart = () => {
  const { language } = useAppContext();
  const [location, setLocation] = useState<"office" | "outside">("office");
  const [profile, setProfile] = useState<"public" | "local">("public");

  const isOffice = location === "office";
  const isOutside = location === "outside";
  const isPublic = profile === "public";
  const isLocal = profile === "local";

  // Active path evaluation
  const pathOfficeActive = isOffice;
  const pathOutsideActive = isOutside;
  const pathPublicActive = isOutside && isPublic;
  const pathLocalActive = isOutside && isLocal;
  const serverActive = isOffice || (isOutside && isPublic);

  // Translation copy
  const t = {
    title: {
      en: "Interactive Sync & Access Flowchart",
      id: "Diagram Alur Akses & Sinkronisasi Interaktif"
    },
    subtitle: {
      en: "Select parameters to trace the data synchronization path:",
      id: "Pilih parameter untuk melacak jalur sinkronisasi data:"
    },
    locationLabel: {
      en: "User Location",
      id: "Lokasi Pengguna"
    },
    profileLabel: {
      en: "Active Profile",
      id: "Profil Aktif"
    },
    officeOpt: {
      en: "In Office",
      id: "Di Kantor"
    },
    outsideOpt: {
      en: "Outside Office",
      id: "Luar Kantor"
    },
    publicOpt: {
      en: "Public Account",
      id: "Akun Publik"
    },
    localOpt: {
      en: "Local Account",
      id: "Akun Lokal"
    },
    start: {
      en: "CLIENT SYNC TRIGGER",
      id: "PEMICU SINKRONISASI KLIEN"
    },
    locCheck: {
      en: "Detecting Network...",
      id: "Mendeteksi Jaringan..."
    },
    officeDirect: {
      en: "Local LAN Connection",
      id: "Koneksi LAN Lokal"
    },
    directSync: {
      en: "Direct sync to 192.168.22.23 via local intranet",
      id: "Sinkronisasi langsung ke 192.168.22.23 via intranet lokal"
    },
    profileCheck: {
      en: "Check Desktop Profile",
      id: "Periksa Profil Desktop"
    },
    publicSync: {
      en: "Cloudflare Tunnel Route",
      id: "Rute Cloudflare Tunnel"
    },
    remoteSync: {
      en: "Secure TLS connection routed to central server",
      id: "Koneksi TLS aman diarahkan ke server pusat"
    },
    localBlocked: {
      en: "Sync Suspended (Offline)",
      id: "Sinkronisasi Ditangguhkan (Offline)"
    },
    localBlockedDesc: {
      en: "Local IP unreachable. Files cached on PC locally.",
      id: "IP Lokal tidak terjangkau. File di-cache lokal di PC."
    },
    centralServer: {
      en: "CENTRAL SERVER (TrueNAS Scale / ZFS)",
      id: "SERVER PUSAT (TrueNAS Scale / ZFS)"
    },
    statusActive: {
      en: "ACTIVE SYNC RUNNING",
      id: "SINKRONISASI AKTIF BERJALAN"
    },
    statusBlocked: {
      en: "SYNC SUSPENDED (OFFLINE)",
      id: "SINKRONISASI DITANGGUHKAN (OFFLINE)"
    }
  };

  const l = language === "id" ? "id" : "en";

  return (
    <div className="w-full my-6 border border-neutral-200/60 p-6 sm:p-8 bg-neutral-50/20 font-sans text-neutral-800 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-neutral-100">
        <div>
          <h4 className="text-[13px] font-bold text-neutral-900 tracking-tight mb-0.5">{t.title[l]}</h4>
          <p className="text-[11px] text-neutral-400 font-normal">{t.subtitle[l]}</p>
        </div>
        
        {/* Dynamic Status Tag (Rectangular) */}
        <div className="flex items-center">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-[9px] font-mono tracking-wider font-semibold transition-all duration-300 ${
            serverActive 
              ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
              : "bg-rose-50 border-rose-200 text-rose-600"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-sm ${serverActive ? "bg-emerald-500" : "bg-rose-500 animate-pulse"}`}></span>
            <span>{serverActive ? t.statusActive[l] : t.statusBlocked[l]}</span>
          </div>
        </div>
      </div>

      {/* Simulator Control Tabs (Clean flat bottom-bordered tabs, no capsules) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 bg-neutral-50 p-5 rounded-md border border-neutral-200">
        
        {/* Location Selector */}
        <div>
          <span className="text-neutral-400 block mb-3 uppercase text-[9px] tracking-widest font-bold">{t.locationLabel[l]}</span>
          <div className="flex gap-5 border-b border-neutral-200 select-none">
            <button
              onClick={() => setLocation("office")}
              className={`text-[12px] font-medium pb-2 border-b-2 transition-all duration-200 -mb-[2px] ${
                isOffice 
                  ? "border-neutral-900 text-neutral-900 font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {t.officeOpt[l]}
            </button>
            <button
              onClick={() => setLocation("outside")}
              className={`text-[12px] font-medium pb-2 border-b-2 transition-all duration-200 -mb-[2px] ${
                isOutside 
                  ? "border-neutral-900 text-neutral-900 font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {t.outsideOpt[l]}
            </button>
          </div>
        </div>

        {/* Profile Selector */}
        <div>
          <span className="text-neutral-400 block mb-3 uppercase text-[9px] tracking-widest font-bold">{t.profileLabel[l]}</span>
          <div className="flex gap-5 border-b border-neutral-200 select-none">
            <button
              onClick={() => setProfile("public")}
              className={`text-[12px] font-medium pb-2 border-b-2 transition-all duration-200 -mb-[2px] ${
                isPublic 
                  ? "border-neutral-900 text-neutral-900 font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {t.publicOpt[l]}
            </button>
            <button
              onClick={() => setProfile("local")}
              className={`text-[12px] font-medium pb-2 border-b-2 transition-all duration-200 -mb-[2px] ${
                isLocal 
                  ? "border-neutral-900 text-neutral-900 font-bold" 
                  : "border-transparent text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {t.localOpt[l]}
            </button>
          </div>
        </div>
      </div>

      {/* Flowchart Tree with clean rectangular styling */}
      <div className="flex flex-col items-center w-full py-2">
        
        {/* START NODE (Rectangular with slight rounded corner) */}
        <div className="bg-neutral-900 text-white px-4 py-1.5 rounded-sm font-mono text-[9px] tracking-wider font-semibold border border-neutral-850">
          {t.start[l]}
        </div>
        
        {/* Connector Line 1 */}
        <div className="w-1 h-6 bg-neutral-300"></div>

        {/* NETWORK DETECTION NODE (Rectangular) */}
        <div className="border border-neutral-200 bg-white px-4.5 py-2 rounded-sm text-neutral-850 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-center font-semibold text-[11px]">
          {t.locCheck[l]}
        </div>

        {/* Splitting Connector (Desktop Grid / Mobile Stack) */}
        <div className="w-full relative mt-1">
          {/* Horizontal connecting bridge for desktop */}
          <div className="hidden md:block absolute left-1/4 right-1/4 top-0 h-[3px] bg-neutral-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-4">
            
            {/* LEFT BRANCH: OFFICE */}
            <div className="flex flex-col items-center relative">
              {/* Vertical line connector from bridge */}
              <div className={`hidden md:block absolute -top-4 h-4 transition-all duration-300 ${pathOfficeActive ? "w-[3px] bg-emerald-400" : "w-px bg-neutral-200"}`}></div>
              
              <span className={`text-[10px] uppercase tracking-wider font-bold mb-2.5 flex items-center gap-1.5 transition-colors duration-355 ${pathOfficeActive ? "text-emerald-600 font-bold" : "text-neutral-400 font-normal"}`}>
                <span>📍</span> {t.officeOpt[l]}
              </span>
              
              <div className={`border p-4 rounded-md w-full text-center transition-all duration-300 shadow-sm ${
                pathOfficeActive 
                  ? "border-emerald-400 bg-emerald-50/10 text-neutral-800 ring-1 ring-emerald-400/10" 
                  : "border-neutral-100 bg-white text-neutral-400 opacity-40"
              }`}>
                <div className={`font-bold text-[12px] ${pathOfficeActive ? "text-neutral-900" : "text-neutral-400"}`}>
                  {t.officeDirect[l]}
                </div>
                <div className="text-[10px] opacity-80 mt-1 leading-normal">
                  {t.directSync[l]}
                </div>
              </div>
              
              <div className={`h-8 transition-all duration-300 ${pathOfficeActive ? "w-[3px] bg-emerald-400 opacity-100" : "w-px bg-neutral-200 opacity-30"}`}></div>
            </div>

            {/* RIGHT BRANCH: OUTSIDE OFFICE */}
            <div className="flex flex-col items-center relative">
              {/* Vertical line connector from bridge */}
              <div className={`hidden md:block absolute -top-4 h-4 transition-all duration-300 ${pathOutsideActive ? "w-[3px] bg-neutral-400" : "w-px bg-neutral-200"}`}></div>
              
              <span className={`text-[10px] uppercase tracking-wider font-bold mb-2.5 flex items-center gap-1.5 transition-colors duration-355 ${pathOutsideActive ? "text-neutral-900 font-bold" : "text-neutral-400 font-normal"}`}>
                <span>☁️</span> {t.outsideOpt[l]}
              </span>
              
              <div className={`border p-3.5 rounded-md w-full text-center transition-all duration-300 shadow-sm font-semibold text-[11px] ${
                pathOutsideActive 
                  ? "border-neutral-300 bg-white text-neutral-800" 
                  : "border-neutral-100 bg-white text-neutral-400 opacity-40"
              }`}>
                {t.profileCheck[l]}
              </div>
              
              {/* Profile Sub-Branching Connector */}
              <div className="w-full relative mt-1">
                <div className={`hidden md:block absolute left-1/4 right-1/4 top-0 transition-all duration-300 ${pathOutsideActive ? "h-[3px] bg-neutral-300 opacity-100" : "h-px bg-neutral-200 opacity-30"}`}></div>
                
                <div className="grid grid-cols-2 gap-4 w-full pt-4">
                  {/* Public Account Profile */}
                  <div className="flex flex-col items-center relative">
                    <div className={`hidden md:block absolute -top-4 h-4 transition-all duration-300 ${pathOutsideActive ? "w-[3px] bg-neutral-300 opacity-100" : "w-px bg-neutral-200 opacity-30"}`}></div>
                    <span className={`text-[9px] font-bold tracking-wide uppercase mb-1.5 transition-colors duration-305 ${pathPublicActive ? "text-emerald-600" : "text-neutral-400"}`}>
                      {t.publicOpt[l]}
                    </span>
                    <div className={`border p-3 rounded-md w-full text-center text-[10px] leading-normal transition-all duration-300 shadow-sm ${
                      pathPublicActive 
                        ? "border-emerald-450 bg-emerald-50/10 text-neutral-800 ring-1 ring-emerald-450/10" 
                        : "border-neutral-100 bg-white text-neutral-400 opacity-40"
                    }`}>
                      <div className={`font-bold ${pathPublicActive ? "text-neutral-900" : "text-neutral-400"}`}>
                        Cloudflare Tunnel
                      </div>
                      <div className="opacity-80 mt-0.5 text-[9.5px]">
                        {t.remoteSync[l]}
                      </div>
                    </div>
                    <div className={`h-8 transition-all duration-300 ${pathPublicActive ? "w-[3px] bg-emerald-450 opacity-100" : "w-px bg-neutral-200 opacity-30"}`}></div>
                  </div>

                  {/* Local Account Profile */}
                  <div className="flex flex-col items-center relative">
                    <div className={`hidden md:block absolute -top-4 h-4 transition-all duration-300 ${pathOutsideActive ? "w-[3px] bg-neutral-300 opacity-100" : "w-px bg-neutral-200 opacity-30"}`}></div>
                    <span className={`text-[9px] font-bold tracking-wide uppercase mb-1.5 transition-colors duration-305 ${pathLocalActive ? "text-rose-600" : "text-neutral-400"}`}>
                      {t.localOpt[l]}
                    </span>
                    <div className={`border p-3 rounded-md w-full text-center text-[10px] leading-normal transition-all duration-300 shadow-sm ${
                      pathLocalActive 
                        ? "border-rose-300 bg-rose-50/10 text-neutral-800 ring-1 ring-rose-300/10" 
                        : "border-neutral-100 bg-white text-neutral-400 opacity-40"
                    }`}>
                      <div className={`font-bold ${pathLocalActive ? "text-rose-700" : "text-neutral-400"}`}>
                        {t.localBlocked[l]}
                      </div>
                      <div className="opacity-80 mt-0.5 text-[9.5px]">
                        {t.localBlockedDesc[l]}
                      </div>
                    </div>
                    <div className={`h-8 transition-all duration-300 ${pathLocalActive ? "w-[3px] bg-rose-300 opacity-100" : "w-px bg-rose-200/50 opacity-0"}`}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Central Server Connector Merger */}
        <div className="w-full max-w-lg relative h-4 hidden md:block">
          {/* Connecting line to merge both successful paths */}
          <div className={`absolute left-1/4 right-1/4 bottom-0 transition-all duration-300 ${serverActive ? "h-[3px] bg-neutral-300 opacity-100" : "h-px bg-neutral-200 opacity-30"}`}></div>
          <div className={`absolute left-1/4 bottom-0 h-4 transition-all duration-300 ${pathOfficeActive ? "w-[3px] bg-emerald-400 opacity-100" : "w-px bg-neutral-200 opacity-30"}`}></div>
          <div className={`absolute right-1/4 bottom-0 h-4 transition-all duration-300 ${pathPublicActive ? "w-[3px] bg-emerald-450 opacity-100" : "w-px bg-neutral-200 opacity-30"}`}></div>
        </div>
        <div className={`h-4 hidden md:block transition-all duration-300 ${serverActive ? "w-[3px] bg-neutral-300 opacity-100" : "w-px bg-neutral-200 opacity-30"}`}></div>

        {/* TARGET NODE: CENTRAL SERVER (Rectangular) */}
        <div className={`border p-4 rounded-md w-full max-w-sm text-center shadow-md transition-all duration-300 mt-2 ${
          serverActive
            ? "border-neutral-900 bg-neutral-900 text-white font-semibold"
            : "border-neutral-200 bg-neutral-50 text-neutral-400"
        }`}>
          <div className="text-[10px] font-mono tracking-wider opacity-60 uppercase mb-1">Target Destination</div>
          <div className="text-[12px] font-bold">{t.centralServer[l]}</div>
        </div>

      </div>
    </div>
  );
};
