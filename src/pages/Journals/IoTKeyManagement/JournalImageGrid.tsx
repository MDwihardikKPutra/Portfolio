import React from "react";

interface JournalHardwareGridProps {
  imgRef: React.RefObject<HTMLImageElement>;
  imgHeight: number | undefined;
  onImgLoad: () => void;
}

export const JournalHardwareGrid = ({
  imgRef,
  imgHeight,
  onImgLoad
}: JournalHardwareGridProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-stretch">
      {/* Left: Simulation Screenshot */}
      <div className="flex flex-col">
        <img 
          ref={imgRef}
          onLoad={onImgLoad}
          src="/simulasi-iot.png" 
          alt="ESP32 IoT Key Management Hardware Simulation" 
          className="w-full h-auto object-cover border border-neutral-200"
          loading="lazy"
          decoding="async"
        />
        <p className="text-[12px] font-mono text-neutral-400 mt-3 tracking-tight">
          Fig 1. — Wokwi hardware simulation layout.
        </p>
      </div>

      {/* Right: diagram.json snippet */}
      <div className="flex flex-col">
        <div className="bg-[#0d0d0d] rounded-none border border-neutral-800 text-[11px] leading-relaxed overflow-y-auto p-5" style={{ height: imgHeight ?? "auto", minHeight: imgHeight ? undefined : "300px" }}>
          <pre className="text-neutral-300 font-mono">
{`{
  "parts": [
    { "type": "board-esp32-devkit-c-v4",
      "id": "esp", "rotate": 270 },
    { "type": "board-ili9341-cap-touch",
      "id": "lcd1", "rotate": 90 },
    { "type": "wokwi-slide-switch", "id": "sw1" },
    { "type": "wokwi-slide-switch", "id": "sw2" },
    { "type": "wokwi-slide-switch", "id": "sw3" },
    { "type": "wokwi-slide-switch", "id": "sw4" },
    { "type": "wokwi-servo",        "id": "servo1" },
    { "type": "wokwi-pushbutton",
      "id": "btn1", "color": "green" },
    { "type": "wokwi-pushbutton",
      "id": "btn2", "color": "green" },
    { "type": "wokwi-pushbutton",
      "id": "btn3", "color": "blue" },
    { "type": "wokwi-pushbutton",
      "id": "btn_close", "color": "red" }
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
        <p className="text-[12px] font-mono text-neutral-400 mt-3 tracking-tight">
          Fig 2. — Wokwi circuit manifest (diagram.json).
        </p>
      </div>
    </div>
  );
};

interface JournalNetworkGridProps {
  logRef: React.RefObject<HTMLImageElement>;
  logHeight: number | undefined;
  onLogLoad: () => void;
}

export const JournalNetworkGrid = ({
  logRef,
  logHeight,
  onLogLoad
}: JournalNetworkGridProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-10 items-stretch">
      {/* Left: Google Sheets Log Screenshot */}
      <div className="flex flex-col">
        <img
          ref={logRef}
          onLoad={onLogLoad}
          src="/IOT-LOG.png"
          alt="Google Spreadsheet IoT Log Output"
          className="w-full h-auto object-cover border border-neutral-200"
          loading="lazy"
          decoding="async"
        />
        <p className="text-[12px] font-mono text-neutral-400 mt-3 tracking-tight">
          Fig 3. — Live database payload received via Google Apps Script.
        </p>
      </div>

      {/* Right: C++ sendToSpreadsheet code */}
      <div className="flex flex-col">
        <div
          className="bg-[#0d0d0d] rounded-none border border-neutral-800 text-[11px] md:text-[12px] leading-relaxed overflow-y-auto p-5"
          style={{ height: logHeight ?? "auto", minHeight: logHeight ? undefined : "300px" }}
        >
          <pre className="text-neutral-300 font-mono">
{`void sendToSpreadsheet(
  String item, String tanggal,
  String waktu, String status,
  String user
) {
  if (WiFi.status() != WL_CONNECTED)
    return;

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

  WiFiClientSecure *client =
    new WiFiClientSecure;
  client->setInsecure();

  HTTPClient http;
  if (http.begin(*client, url)) {
    http.setFollowRedirects(
      HTTPC_STRICT_FOLLOW_REDIRECTS
    );
    http.setTimeout(20000);
    int code = http.GET();
    if (code > 0) {
      Serial.println(
        ">>> OK: " + String(code)
      );
    } else {
      Serial.println(
        ">>> FAIL: "
        + http.errorToString(code)
      );
    }
    http.end();
  }
  delete client;
}`}
          </pre>
        </div>
        <p className="text-[12px] font-mono text-neutral-400 mt-3 tracking-tight">
          Fig 4. — HTTPS transmission to Google Apps Script endpoint.
        </p>
      </div>
    </div>
  );
};
