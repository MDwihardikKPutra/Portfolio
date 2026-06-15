import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

import { articleData } from "./journalData";
import { JournalFlowchart } from "./JournalFlowchart";

export const IoTKeyManagement = () => {
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

            {/* SECTION 1: HARDWARE */}
            <section id="hardware-architecture" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.hardware[langKey].heading}</h2>
              <div className="space-y-4">
                {s.hardware[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/simulasi-iot.png" 
                    alt="ESP32 IoT Key Management Hardware Simulation" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id' 
                    ? "Fig 1. — Simulasi Perangkat Keras Wokwi ESP32" 
                    : "Fig 1. — Wokwi ESP32 Hardware Simulator"}
                </span>
              </div>
            </section>

            {/* SECTION 2: STATE MACHINE */}
            <section id="state-machine" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.stateMachine[langKey].heading}</h2>
              <div className="space-y-4">
                {s.stateMachine[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-white rounded-lg border border-neutral-200/60 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-neutral-800">
                  <JournalFlowchart />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 2. — Diagram Alur Logika State Machine"
                    : "Fig 2. — State Machine Logic Flow Diagram"}
                </span>
              </div>
            </section>

            {/* SECTION 3: DATA INTEGRITY */}
            <section id="data-integrity" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.dataIntegrity[langKey].heading}</h2>
              <div className="space-y-4">
                {s.dataIntegrity[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>
            </section>

            {/* SECTION 4: GOOGLE WORKSPACE */}
            <section id="google-workspace" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.googleWork[langKey].heading}</h2>
              <div className="space-y-4">
                {s.googleWork[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <div className="bg-[#fcfcfc] p-2.5 rounded border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                  <img 
                    src="/IOT-LOG.png" 
                    alt="Google Spreadsheet IoT Log Output" 
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 text-center">
                  {language === 'id'
                    ? "Fig 3. — Log Data Akses di Google Spreadsheet"
                    : "Fig 3. — Access Data Logs in Google Spreadsheet"}
                </span>
              </div>
            </section>

            {/* SECTION 5: LCD FEEDBACK */}
            <section id="lcd-feedback" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.lcdFeedback[langKey].heading}</h2>
              <div className="space-y-4">
                {s.lcdFeedback[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>
            </section>

            {/* SECTION 6: REFLECTIONS */}
            <section id="reflections" className="space-y-4 pt-4 scroll-mt-24">
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">{s.reflections[langKey].heading}</h2>
              <div className="space-y-4">
                {s.reflections[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
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
              href="#hardware-architecture" 
              onClick={(e) => handleScroll(e, "hardware-architecture")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.hardware[langKey].heading}
            </a>
            <a 
              href="#state-machine" 
              onClick={(e) => handleScroll(e, "state-machine")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.stateMachine[langKey].heading}
            </a>
            <a 
              href="#data-integrity" 
              onClick={(e) => handleScroll(e, "data-integrity")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.dataIntegrity[langKey].heading}
            </a>
            <a 
              href="#google-workspace" 
              onClick={(e) => handleScroll(e, "google-workspace")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.googleWork[langKey].heading}
            </a>
            <a 
              href="#lcd-feedback" 
              onClick={(e) => handleScroll(e, "lcd-feedback")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.lcdFeedback[langKey].heading}
            </a>
            <a 
              href="#reflections" 
              onClick={(e) => handleScroll(e, "reflections")}
              className="hover:text-neutral-900 transition-colors py-0.5 leading-snug"
            >
              {s.reflections[langKey].heading}
            </a>
          </nav>
        </aside>

      </div>
    </div>
  );
};
