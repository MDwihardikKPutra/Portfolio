export interface ContentSection {
  heading: string;
  paragraphs: string[];
}

export interface JournalArticle {
  title: { en: string; id: string };
  date: string;
  readTime: { en: string; id: string };
  tags: string[];
  intro: { en: string; id: string };
  sections: {
    hardware: { en: ContentSection; id: ContentSection };
    stateMachine: { en: ContentSection; id: ContentSection };
    dataIntegrity: { en: ContentSection; id: ContentSection };
    googleWork: { en: ContentSection; id: ContentSection };
    lcdFeedback: { en: ContentSection; id: ContentSection };
    reflections: { en: ContentSection; id: ContentSection };
  };
  footer: {
    p1: { en: string; id: string };
  };
}

export const articleData: JournalArticle = {
  title: {
    en: "IoT Key Management Hub",
    id: "Pusat Manajemen Kunci IoT"
  },
  date: "04 Jun, 2025",
  readTime: {
    en: "8 min read",
    id: "8 mnt baca"
  },
  tags: ["ESP32 C++", "Google Apps Script", "Wokwi Simulation", "Preferences NVS"],
  intro: {
    en: "PT Puri Ganesha Engineering (PGE) was experiencing significant accountability gaps due to unmonitored physical key movements in their warehouse and laboratory environments. Manual human logging was proving to be error-prone and unreliable. Recognizing this critical security blind spot, I took the initiative to build an automated tracking system from scratch rather than relying on expensive third-party vendors. I engineered a custom ESP32-based IoT Key Management Hub that successfully forces identity validation, logs all physical access in real-time to Google Workspace, and permanently resolves their auditing problem—even maintaining accuracy through sudden power failures.",
    id: "PT Puri Ganesha Engineering (PGE) mengalami celah akuntabilitas yang signifikan akibat pergerakan kunci fisik yang tidak terpantau di lingkungan gudang dan laboratorium mereka. Pencatatan manual oleh manusia terbukti sering keliru dan tidak dapat diandalkan. Menyadari titik buta keamanan yang kritis ini, saya berinisiatif membangun sistem pelacakan otomatis dari awal daripada bergantung pada vendor pihak ketiga yang mahal. Saya merancang Pusat Manajemen Kunci IoT khusus berbasis ESP32 yang berhasil memaksa validasi identitas, mencatat semua akses fisik secara real-time ke Google Workspace, dan secara permanen menyelesaikan masalah audit mereka—bahkan tetap mempertahankan keakuratan saat terjadi pemadaman listrik mendadak."
  },
  sections: {
    hardware: {
      en: {
        heading: "Hardware Architecture & GPIO Mapping",
        paragraphs: [
          "The brain of the system is the ESP32 DevKit C v4, selected for its dual-core Xtensa LX6 running at 240 MHz, built-in 802.11 b/g/n Wi-Fi, and 34 configurable GPIO pins. For the visual interface, I deployed an ILI9341 2.4-inch LCD at 320×240 pixel resolution, communicating over the Hardware SPI bus — not Software SPI — to minimize CPU overhead on every render operation.",
          "The GPIO mapping was carefully designed to avoid pin conflicts. The Hardware SPI pins used are: GPIO 23 (MOSI), GPIO 18 (CLK), with GPIO 21 (CS), GPIO 2 (D/C), and GPIO 4 (RST) as display control lines. The four key-presence limit switches connect to GPIO 14, 5, 12, 15 respectively, each configured with INPUT_PULLUP — meaning the normal state (key present) reads HIGH, and the key-removed state triggers a transition to LOW as the switch connects to GND.",
          "The door servo connects to GPIO 13 (PWM-capable). Three authentication simulation buttons use GPIO 25 (User A / green), GPIO 32 (User B / rejected), and GPIO 33 (User C / blue), while the door-close sensor uses GPIO 27. All buttons are configured with rising-edge detection to prevent double-triggering."
        ]
      },
      id: {
        heading: "Arsitektur Perangkat Keras & Pemetaan GPIO",
        paragraphs: [
          "Otak sistem adalah ESP32 DevKit C v4 yang dipilih karena memiliki dua core Xtensa LX6 240 MHz, kapabilitas Wi-Fi 802.11 b/g/n bawaan, dan 34 pin GPIO yang dapat dikonfigurasi. Untuk antarmuka visual, saya menggunakan layar LCD ILI9341 berukuran 2.4 inci dengan resolusi 320×240 piksel yang dikomunikasikan melalui jalur Hardware SPI — bukan Software SPI — untuk meminimalkan overhead CPU pada setiap operasi rendering.",
          "Pemetaan GPIO dirancang dengan teliti untuk menghindari konflik pin. Pin SPI Hardware ESP32 yang digunakan adalah: GPIO 23 (MOSI), GPIO 18 (CLK), dengan GPIO 21 (CS), GPIO 2 (D/C), dan GPIO 4 (RST) sebagai kontrol layar. Keempat limit switch pemantau kunci terhubung ke GPIO 14, 5, 12, 15 masing-masing dengan konfigurasi INPUT_PULLUP — artinya kondisi normal (kunci tersedia) menghasilkan logika HIGH, dan kondisi kunci diambil menghasilkan perubahan ke logika LOW karena switch terhubung ke GND.",
          "Motor Servo penggerak pintu terhubung ke GPIO 13 (pin PWM). Tiga tombol simulasi autentikasi pengguna menggunakan GPIO 25 (User A / hijau), GPIO 32 (User B / ditolak), dan GPIO 33 (User C / biru), sementara sensor penutupan pintu menggunakan GPIO 27. Semua tombol dikonfigurasi dengan deteksi rising edge untuk mencegah double-trigger."
        ]
      }
    },
    stateMachine: {
      en: {
        heading: "State Machine & Access Control Logic",
        paragraphs: [
          "The system operates as a finite state machine with two primary states: LOCKED (servo at 0°, door closed) and UNLOCKED (servo at 90°, door open). The global flag servoTerbuka acts as the state guardian. When a user is granted access, the state transitions to UNLOCKED and the active user identity is recorded in the userAktif variable.",
          "The door re-locks automatically when the door sensor (PIN_SW_DOOR) detects physical closure — this prevents a scenario where the server believes the door is open when it has already been manually closed. This design separates authentication access (who opened it) from physical confirmation (when the door actually closed), ensuring temporally accurate logs.",
          "The cekKunci() function monitors all four keys simultaneously on every loop() cycle. State change detection uses a debouncing technique with a 50ms delay and double-read to filter electrical noise. Only when the state changes consistently does the system commit a log entry and transmit data to the spreadsheet."
        ]
      },
      id: {
        heading: "Mesin Status & Logika Kontrol Akses",
        paragraphs: [
          "Sistem beroperasi sebagai finite state machine dengan dua state utama: LOCKED (servo pada 0°, pintu tertutup) dan UNLOCKED (servo pada 90°, pintu terbuka). Variabel servoTerbuka menjadi penjaga state global. Ketika pengguna diterima, state berubah ke UNLOCKED dan identitas pengguna aktif dicatat dalam variabel userAktif.",
          "Kunci kembali terkunci secara otomatis ketika sensor pintu (PIN_SW_DOOR) mendeteksi bahwa pintu telah ditutup secara fisik — ini mencegah kondisi di mana server menganggap pintu terbuka padahal sudah ditutup manual. Desain ini memisahkan antara akses autentikasi (siapa yang membuka) dan konfirmasi fisik (kapan pintu benar-benar tertutup), sehingga log yang dihasilkan akurat secara temporal.",
          "Fungsi cekKunci() memantau empat kunci secara bersamaan dalam setiap siklus loop(). Deteksi perubahan state menggunakan teknik debouncing dengan delay(50ms) dan pembacaan ganda untuk memfilter noise elektrik. Hanya ketika state berubah secara konsisten barulah sistem mencatat log dan mengirim data ke spreadsheet."
        ]
      }
    },
    dataIntegrity: {
      en: {
        heading: "Data Integrity & NVS Flash Persistence",
        paragraphs: [
          "One of the greatest challenges in any IoT system is data volatility during power failures. Consider this scenario: a user takes key #3, then a power outage occurs. When the system reboots, who is recorded as holding the key? Without a persistence mechanism, the answer is \"no one\" — and this is a fatal gap in the audit trail.",
          "To solve this, I implemented the Preferences.h library, a high-level abstraction over ESP32's Non-Volatile Storage (NVS). NVS stores data in key-value format in a dedicated flash partition, separate from program storage, using a built-in wear-leveling mechanism to extend flash cell lifespan. Each borrower name is stored under a unique key (\"k0\" through \"k3\") within the \"kunci-app\" namespace.",
          "On boot, the system calls preferences.getString() to restore the last known state of all four keys. If a key has never been borrowed, the default value \"-\" is returned. This mechanism guarantees audit trail continuity — the chain of custody is never broken, even after a hard reboot."
        ]
      },
      id: {
        heading: "Integritas Data & Persistensi Memori Flash NVS",
        paragraphs: [
          "Salah satu tantangan terbesar dalam sistem IoT adalah volatilitas data saat kegagalan daya. Bayangkan skenario: pengguna mengambil kunci nomor 3, lalu terjadi pemadaman listrik. Ketika sistem menyala kembali, siapa yang tercatat sebagai pemegang kunci? Tanpa mekanisme persistensi, jawaban sistem adalah \"tidak ada\" — dan ini adalah celah audit yang fatal.",
          "Untuk menyelesaikan ini, saya mengimplementasikan pustaka Preferences.h yang merupakan abstraksi tingkat tinggi di atas Non-Volatile Storage (NVS) ESP32. NVS menyimpan data dalam format key-value di partisi flash yang terpisah dari program, menggunakan mekanisme wear leveling bawaan untuk memperpanjang umur sel flash. Setiap nama peminjam disimpan dengan key unik (\"k0\" s/d \"k3\") dalam namespace \"kunci-app\".",
          "Pada saat boot, sistem memanggil preferences.getString() untuk memulihkan state terakhir dari semua empat kunci. Jika kunci belum pernah dipinjam, nilai default \"-\" dikembalikan. Mekanisme ini menjamin audit trail continuity — rantai kepemilikan kunci tidak pernah terputus, bahkan setelah reboot mendadak."
        ]
      }
    },
    googleWork: {
      en: {
        heading: "Google Workspace Integration via HTTPS Apps Script",
        paragraphs: [
          "Rather than relying on third-party database brokers like Firebase or subscription-based IoT platforms, I built a direct transmission pathway into the Google ecosystem using Google Apps Script as a serverless endpoint. The script, deployed as a Web App, exposes a public HTTPS URL that accepts GET parameters and writes them directly as new rows into the spreadsheet.",
          "On the ESP32 side, WiFiClientSecure is used with setInsecure() mode to bypass SSL certificate validation — a pragmatic choice for the Wokwi simulation environment where the full certificate chain isn't always available. In a production environment, this would be replaced with setCACert() using an explicitly pinned Google root certificate.",
          "The system implements an automatic 3-retry strategy with a 3-second gap between attempts. This is critical because Google Apps Script issues an HTTP 302 redirect before executing, and the first connection can sometimes fail during TLS handshake stabilization. The HTTPC_STRICT_FOLLOW_REDIRECTS flag ensures the HTTPClient follows this redirect automatically. A 20-second timeout is set to accommodate cold-start latency on the serverless Apps Script runtime.",
          "Every event produces a new row in the spreadsheet with 5 columns: item (key/door name), tanggal (YYYY-MM-DD), waktu (HH:MM:SS), status (Akses_Diterima / DIAMBIL / DIKEMBALIKAN), and user (identity). Timestamps are generated by NTPClient synchronized to id.pool.ntp.org with a GMT+7 offset."
        ]
      },
      id: {
        heading: "Integrasi Google Workspace via HTTPS Apps Script",
        paragraphs: [
          "Daripada mengandalkan broker database pihak ketiga seperti Firebase atau platform IoT berlangganan, saya membangun jalur transmisi langsung ke ekosistem Google menggunakan Google Apps Script sebagai serverless endpoint. Script yang di-deploy sebagai Web App mengekspos URL HTTPS publik yang menerima parameter GET dan menuliskannya langsung ke baris spreadsheet.",
          "Sisi ESP32 menggunakan WiFiClientSecure dengan mode setInsecure() untuk melewati validasi sertifikat SSL — pilihan yang pragmatis untuk lingkungan simulasi Wokwi di mana rantai sertifikat tidak selalu tersedia secara lengkap. Di lingkungan produksi, ini dapat diganti dengan setCACert() menggunakan sertifikat root Google yang di-pin secara eksplisit.",
          "Sistem menerapkan strategi retry otomatis sebanyak 3 kali dengan jeda 3 detik antar percobaan. Ini krusial karena Google Apps Script menggunakan redirect HTTP 302 sebelum eksekusi, dan koneksi pertama kadang gagal saat handshake TLS belum stabil. Flag HTTPC_STRICT_FOLLOW_REDIRECTS memastikan HTTPClient mengikuti redirect tersebut secara otomatis. Timeout 20 detik ditetapkan untuk mengakomodasi latensi cold-start pada serverless Apps Script.",
          "Setiap event menghasilkan baris baru di spreadsheet dengan 5 kolom: item (nama kunci/pintu), tanggal (YYYY-MM-DD), waktu (HH:MM:SS), status (Akses_Diterima / DIAMBIL / DIKEMBALIKAN), dan user (identitas pengguna). Stempel waktu dihasilkan dari NTPClient yang tersinkronisasi ke server id.pool.ntp.org dengan offset GMT+7 (WIB)."
        ]
      }
    },
    lcdFeedback: {
      en: {
        heading: "LCD Display & Real-Time Visual Feedback",
        paragraphs: [
          "The ILI9341 display is split into two panels: the left side hosts the status panel (displaying access status, user identity, and active key information), while the right side shows the key grid (a live table of all four keys' current status). The vertical divider is rendered using drawFastVLine() and the header using drawFastHLine() for zero-overhead line rendering.",
          "Color serves as an intuitive visual language: green for User A access granted, blue for User C, red for access denied, and yellow for key taken/returned events. The updateStatusKiri() function always calls fillRect() first to clear the previous content — preventing text artifact overlap that is common on LCDs without a framebuffer."
        ]
      },
      id: {
        heading: "Tampilan LCD & Umpan Balik Visual Real-Time",
        paragraphs: [
          "Layar ILI9341 dibagi menjadi dua panel: sisi kiri untuk status panel (menampilkan status akses, identitas user, dan informasi kunci yang sedang aktif), dan sisi kanan untuk grid kunci (menampilkan status real-time keempat kunci dalam tabel sederhana). Pemisah vertikal digambar menggunakan drawFastVLine() dan header menggunakan drawFastHLine().",
          "Warna digunakan sebagai bahasa visual yang intuitif: hijau untuk akses diterima User A, biru untuk User C, merah untuk akses ditolak, dan kuning untuk event kunci diambil/dikembalikan. Fungsi updateStatusKiri() selalu melakukan fillRect() terlebih dahulu untuk membersihkan area sebelumnya — menghindari artefak teks tumpang tindih yang umum terjadi pada LCD tanpa framebuffer."
        ]
      }
    },
    reflections: {
      en: {
        heading: "Engineering Reflections & Next Steps",
        paragraphs: [
          "This project demonstrates that low-cost hardware (a bill of materials under $15) can execute corporate-grade audit workflows when paired with rigorous software engineering. Using Google Workspace as the backend layer eliminates the need for a dedicated server, making this system serverless by design.",
          "For future development, the system can be hardened with: (1) integration of an RC522 RFID module for genuine physical card authentication, replacing button simulation; (2) AES encryption of payloads before transmission; (3) OTA (Over-the-Air) firmware updates via ArduinoOTA; and (4) a React-based web dashboard consuming the Google Sheets API v4 for historical log visualization and analytics."
        ]
      },
      id: {
        heading: "Refleksi Teknis & Pengembangan Selanjutnya",
        paragraphs: [
          "Proyek ini membuktikan bahwa perangkat keras berbiaya rendah (bill of materials di bawah $15) mampu mengeksekusi alur kerja audit berskala korporat ketika dikombinasikan dengan rekayasa perangkat lunak yang matang. Penggunaan Google Workspace sebagai lapisan backend mengeliminasi kebutuhan server dedicated, menjadikan sistem ini serverless by design.",
          "Untuk pengembangan selanjutnya, sistem ini dapat diperkuat dengan: (1) integrasi modul RFID RC522 untuk autentikasi kartu fisik yang sesungguhnya, menggantikan simulasi tombol; (2) enkripsi AES pada payload sebelum transmisi; (3) implementasi OTA (Over-the-Air) update firmware menggunakan ArduinoOTA; dan (4) dashboard web berbasis React yang mengkonsumsi data dari Google Sheets API v4 untuk visualisasi log secara historis."
        ]
      }
    }
  },
  footer: {
    p1: {
      en: "This architecture guarantees flawless data synchronization. An integrated Network Time Protocol (NTPClient) running in the background ensures precision timestamping for every log. Ultimately, this build proves that low-cost hardware can autonomously handle corporate-grade auditing workflows through rigorous software engineering.",
      id: "Arsitektur ini membuktikan sinkronisasi data yang sempurna. Protokol klien waktu (NTPClient) yang terintegrasi di latar belakang menjamin stempel waktu (timestamp) log yang presisi setiap saat. Secara keseluruhan, sistem ini membuktikan bahwa perangkat keras berbiaya rendah pun mampu menangani alur kerja audit berskala korporat dengan rekayasa perangkat lunak yang matang."
    }
  }
};
