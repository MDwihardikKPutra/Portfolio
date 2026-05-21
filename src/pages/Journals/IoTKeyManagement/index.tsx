import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

import { articleData } from "./journalData";
import { JournalFlowchart } from "./JournalFlowchart";

export const IoTKeyManagement = () => {
  const { language } = useAppContext();
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgHeight, setImgHeight] = useState<number | undefined>(undefined);
  const logRef = useRef<HTMLImageElement>(null);
  const [logHeight, setLogHeight] = useState<number | undefined>(undefined);

  const syncHeight = () => {
    if (imgRef.current) setImgHeight(imgRef.current.offsetHeight);
    if (logRef.current) setLogHeight(logRef.current.offsetHeight);
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const htmlEl = document.documentElement;
    const originalHtmlOverflow = htmlEl.style.overflow;

    if (isDesktop) {
      htmlEl.style.overflow = "hidden";
    }

    // Initial sync on mount to capture cached layout dimensions
    syncHeight();
    const handleLoad = () => syncHeight();
    const handleResize = () => {
      syncHeight();
      if (window.innerWidth >= 1024) {
        htmlEl.style.overflow = "hidden";
      } else {
        htmlEl.style.overflow = "";
      }
    };

    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleResize);
    return () => {
      htmlEl.style.overflow = originalHtmlOverflow;
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Language mapping helpers
  const langKey = language === "id" ? "id" : "en";
  const s = articleData.sections;

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 selection:bg-neutral-900 selection:text-white pt-20 flex flex-col font-sans">
      
      {/* Stripe-style API Docs Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0">
        
        {/* LEFT COLUMN: API Reference Documentation (Light, Clean, Detailed) */}
        <div className="lg:col-span-7 bg-white px-6 md:px-12 py-10 lg:overflow-y-auto lg:h-[calc(100vh-80px)] scrollbar-thin flex flex-col" style={{ scrollbarWidth: 'thin' }}>
          
          {/* Breadcrumb Back */}
          <Link 
            to="/home" 
            className="text-[11px] font-mono tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors uppercase flex items-center gap-1.5 mb-6"
          >
            <span>←</span> <span>{language === 'id' ? "Beranda" : "Home"}</span>
          </Link>

          {/* API Header Title Block */}
          <div className="mb-10 pb-6 border-b border-neutral-100">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 font-sans">
              {language === 'id' ? articleData.title.id : articleData.title.en}
            </h1>
          </div>

          {/* Narrative Content */}
          <div className="font-sans text-[14px] leading-relaxed text-black space-y-8">
            
            {/* Introduction description block */}
            <div className="prose prose-neutral max-w-none">
              <p className="text-[15px] text-black leading-relaxed font-normal italic pl-4 border-l-2 border-neutral-900">
                {articleData.intro[langKey]}
              </p>
            </div>

            {/* SECTION 1: HARDWARE API */}
            <div className="pt-6 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">{s.hardware[langKey].heading}</h2>
              <div className="text-[11px] font-mono text-neutral-400 mb-4">GET /v1/hardware/gpio-mapping</div>
              <div className="space-y-4">
                {s.hardware[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* API Parameter Table - Hardware Pins */}
              <div className="mt-6 overflow-x-auto">
                <span className="text-[11px] font-mono text-neutral-400 block mb-2 uppercase tracking-wider">GPIO Registry Configuration</span>
                <table className="w-full text-left border-collapse text-[12px] font-sans">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-400 font-mono">
                      <th className="py-2 font-medium">Pin Parameter</th>
                      <th className="py-2 font-medium">GPIO Connection</th>
                      <th className="py-2 font-medium">Logical Mode / Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-black">
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">ILI9341_CS</code></td>
                      <td className="py-2">GPIO 21</td>
                      <td className="py-2 font-mono text-[11px] text-neutral-500">OUTPUT (SPI Chip Select)</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">SW_LIMIT_0..3</code></td>
                      <td className="py-2">GPIO 14, 5, 12, 15</td>
                      <td className="py-2 font-mono text-[11px] text-neutral-500">INPUT_PULLUP (Key Presence)</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">SERVO_PWM</code></td>
                      <td className="py-2">GPIO 13</td>
                      <td className="py-2 font-mono text-[11px] text-neutral-500">PWM Output (Lock Controller)</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">BTN_AUTH_A..C</code></td>
                      <td className="py-2">GPIO 25, 32, 33</td>
                      <td className="py-2 font-mono text-[11px] text-neutral-500">INPUT (Access Simulation)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 2: STATE MACHINE API */}
            <div className="pt-8 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">{s.stateMachine[langKey].heading}</h2>
              <div className="text-[11px] font-mono text-neutral-400 mb-4">GET /v1/logic/state-machine</div>
              <div className="space-y-4">
                {s.stateMachine[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* API Properties Table - State Variables */}
              <div className="mt-6 overflow-x-auto">
                <span className="text-[11px] font-mono text-neutral-400 block mb-2 uppercase tracking-wider">State Machine Variables</span>
                <table className="w-full text-left border-collapse text-[12px] font-sans">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-400 font-mono">
                      <th className="py-2 font-medium">Variable</th>
                      <th className="py-2 font-medium">Type</th>
                      <th className="py-2 font-medium">Default State Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-black">
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">servoTerbuka</code></td>
                      <td className="py-2 font-mono text-[11px]">bool</td>
                      <td className="py-2">Global guard for LOCKED (false / 0°) & UNLOCKED (true / 90°) states.</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">userAktif</code></td>
                      <td className="py-2 font-mono text-[11px]">String</td>
                      <td className="py-2">Saves the identifier of the authenticated user during an open sequence.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 3: DATA INTEGRITY & NVS FLASH */}
            <div className="pt-8 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">{s.dataIntegrity[langKey].heading}</h2>
              <div className="text-[11px] font-mono text-neutral-400 mb-4">GET /v1/storage/nvs-persistence</div>
              <div className="space-y-4">
                {s.dataIntegrity[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>
            </div>

            {/* SECTION 4: GOOGLE WORKSPACE API ENDPOINT */}
            <div className="pt-8 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">{s.googleWork[langKey].heading}</h2>
              <div className="text-[11px] font-mono text-neutral-400 mb-4">POST /v1/spreadsheets/append-log</div>
              <div className="space-y-4">
                {s.googleWork[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>

              {/* API Query Parameters Table */}
              <div className="mt-6 overflow-x-auto">
                <span className="text-[11px] font-mono text-neutral-400 block mb-2 uppercase tracking-wider">HTTPS GET/POST Payload Schema</span>
                <table className="w-full text-left border-collapse text-[12px] font-sans">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-400 font-mono">
                      <th className="py-2 font-medium">Payload Parameter</th>
                      <th className="py-2 font-medium">Type</th>
                      <th className="py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-black">
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">item</code></td>
                      <td className="py-2 font-mono text-[11px]">String</td>
                      <td className="py-2">Identifier of the target key (e.g. "Kunci%201") or door state.</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">tanggal</code></td>
                      <td className="py-2 font-mono text-[11px]">String</td>
                      <td className="py-2">NTP-derived local date structured as YYYY-MM-DD.</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">waktu</code></td>
                      <td className="py-2 font-mono text-[11px]">String</td>
                      <td className="py-2">NTP-derived precision local time structured as HH:MM:SS.</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">status</code></td>
                      <td className="py-2 font-mono text-[11px]">String</td>
                      <td className="py-2">Transaction trigger state: Akses_Diterima, DIAMBIL, or DIKEMBALIKAN.</td>
                    </tr>
                    <tr>
                      <td className="py-2"><code className="text-neutral-800 font-mono text-[11px] bg-neutral-50 px-1 py-0.5 border border-neutral-100 rounded">user</code></td>
                      <td className="py-2 font-mono text-[11px]">String</td>
                      <td className="py-2">The identified system user initiating the lock state cycle.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 5: LCD FEEDBACK API */}
            <div className="pt-8 border-t border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">{s.lcdFeedback[langKey].heading}</h2>
              <div className="text-[11px] font-mono text-neutral-400 mb-4">GET /v1/display/lcd-feedback</div>
              <div className="space-y-4">
                {s.lcdFeedback[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>
            </div>

            {/* SECTION 6: REFLECTIONS */}
            <div className="pt-8 border-t border-neutral-100 pb-16">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">{s.reflections[langKey].heading}</h2>
              <div className="text-[11px] font-mono text-neutral-400 mb-4">GET /v1/system/reflections</div>
              <div className="space-y-4">
                {s.reflections[langKey].paragraphs.map((p, idx) => (
                  <p key={idx} className="text-justify">{p}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
        
        {/* RIGHT COLUMN: Interactive Tech/Code Console (High-End Light Theme) */}
        <div className="lg:col-span-5 bg-white text-neutral-800 p-6 md:p-8 lg:overflow-y-auto lg:h-[calc(100vh-80px)] border-t lg:border-t-0 lg:border-l border-neutral-200/60 flex flex-col gap-10 scrollbar-thin" style={{ scrollbarWidth: 'thin' }}>
          
          {/* Console Header */}
          <div className="pb-4 border-b border-neutral-200/60 font-mono text-[11px] text-neutral-400">
            CONSOLE REQUEST & SOURCE CODE PREVIEW
          </div>

          {/* FIG 1 CARD: Simulation screenshot */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono text-neutral-400 tracking-wider">Fig 1. — Wokwi ESP32 Hardware Simulator</span>
            <div className="bg-[#fcfcfc] p-2.5 rounded-lg border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <img 
                ref={imgRef}
                onLoad={syncHeight}
                src="/simulasi-iot.png" 
                alt="ESP32 IoT Key Management Hardware Simulation" 
                className="w-full h-auto object-cover rounded border border-neutral-200/40"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* FIG 2 CARD: diagram.json file snippet */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono text-neutral-400 tracking-wider">Fig 2. — diagram.json Circuit Mapping Connections</span>
            <div className="bg-neutral-50 rounded-lg border border-neutral-200/60 p-4 font-mono text-[10px] md:text-[11px] leading-relaxed text-neutral-700 overflow-y-auto shadow-inner" style={{ height: imgHeight ? `${imgHeight}px` : "240px" }}>
              <pre>
{`{
  "parts": [
    { "type": "board-esp32-devkit-c-v4", "id": "esp", "rotate": 270 },
    { "type": "board-ili9341-cap-touch", "id": "lcd1", "rotate": 90 },
    { "type": "wokwi-slide-switch", "id": "sw1" },
    { "type": "wokwi-slide-switch", "id": "sw2" },
    { "type": "wokwi-slide-switch", "id": "sw3" },
    { "type": "wokwi-slide-switch", "id": "sw4" },
    { "type": "wokwi-servo",        "id": "servo1" },
    { "type": "wokwi-pushbutton",   "id": "btn1", "color": "green" },
    { "type": "wokwi-pushbutton",   "id": "btn2", "color": "green" },
    { "type": "wokwi-pushbutton",   "id": "btn3", "color": "blue" },
    { "type": "wokwi-pushbutton",   "id": "btn_close", "color": "red" }
  ],
  "connections": [
    [ "lcd1:CS",   "esp:21",  "cyan"    ],
    [ "lcd1:MOSI", "esp:23",  "green"   ],
    [ "lcd1:SCK",  "esp:18",  "magenta" ],
    [ "lcd1:RST",  "esp:4",   "red"     ],
    [ "lcd1:D/C",  "esp:2",   "green"   ],
    [ "sw1:1",     "esp:14",  "green"   ],
    [ "sw2:1",     "esp:5",   "green"   ],
    [ "sw3:1",     "esp:12",  "green"   ],
    [ "sw4:1",     "esp:15",  "green"   ],
    [ "servo1:PWM","esp:13",  "green"   ],
    [ "btn1:1.l",  "esp:25",  "green"   ],
    [ "btn2:1.l",  "esp:32",  "green"   ],
    [ "btn3:1.l",  "esp:33",  "green"   ],
    [ "btn_close", "esp:27",  "green"   ]
  ]
}`}
              </pre>
            </div>
          </div>

          {/* FLOWCHART CARD */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono text-neutral-400 tracking-wider">Fig 3. — State Machine Logic Flow Diagram</span>
            <div className="bg-white rounded-lg border border-neutral-200/60 p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] text-neutral-800">
              <JournalFlowchart />
            </div>
          </div>

          {/* FIG 4 CARD: C++ Code Request Block */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono text-neutral-400 tracking-wider">Fig 4. — C++ Client secure HTTPS GET Request Method</span>
            <div className="bg-neutral-50 rounded-lg border border-neutral-200/60 p-4 font-mono text-[10px] md:text-[11px] leading-relaxed text-neutral-700 overflow-y-auto shadow-inner" style={{ height: logHeight ? `${logHeight}px` : "320px" }}>
              <pre>
{`void sendToSpreadsheet(
  String item, String tanggal,
  String waktu, String status,
  String user
) {
  if (WiFi.status() != WL_CONNECTED) return;

  item.replace(" ", "%20");
  tanggal.replace(" ", "%20");
  waktu.replace(" ", "%20");
  status.replace(" ", "%20");
  user.replace(" ", "%20");

  String url = GOOGLE_SCRIPT_URL
    + "?item=" + item
    + "&tanggal=" + tanggal
    + "&waktu=" + waktu
    + "&status=" + status
    + "&user=" + user;

  WiFiClientSecure *client = new WiFiClientSecure;
  client->setInsecure();

  HTTPClient http;
  if (http.begin(*client, url)) {
    http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
    http.setTimeout(20000);
    int code = http.GET();
    if (code > 0) {
      Serial.println(">>> OK: " + String(code));
    } else {
      Serial.println(">>> FAIL: " + http.errorToString(code));
    }
    http.end();
  }
  delete client;
}`}
              </pre>
            </div>
          </div>

          {/* FIG 3 CARD: Google Sheets Log Database Output */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono text-neutral-400 tracking-wider">Fig 5. — Spreadsheet Database Payload Registry Logs</span>
            <div className="bg-[#fcfcfc] p-2.5 rounded-lg border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <img 
                ref={logRef}
                onLoad={syncHeight}
                src="/IOT-LOG.png" 
                alt="Google Spreadsheet IoT Log Output" 
                className="w-full h-auto object-cover rounded border border-neutral-200/40"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Callout box inside Code Panel */}
          <div className="bg-neutral-50 border border-neutral-200/60 p-4 rounded-lg text-black text-[12px] leading-relaxed shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] mt-4">
            <span className="font-semibold text-neutral-900 block mb-1">Architecture Summary:</span>
            {articleData.footer.p1[langKey]}
          </div>

        </div>

      </div>

    </div>
  );
};
