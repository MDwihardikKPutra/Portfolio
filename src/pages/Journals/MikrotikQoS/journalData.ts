export interface ContentSection {
  heading: string;
  paragraphs: string[];
  listItems?: string[];
  postParagraphs?: string[];
}

export interface JournalArticle {
  title: { en: string; id: string };
  date: string;
  readTime: { en: string; id: string };
  tags: string[];
  intro: { en: string; id: string };
  sections: {
    trafficId: { en: ContentSection; id: ContentSection };
    hierarchicalQoS: { en: ContentSection; id: ContentSection };
    bittorrentFilter: { en: ContentSection; id: ContentSection };
    securityHardening: { en: ContentSection; id: ContentSection };
  };
  footer: {
    p1: { en: string; id: string };
  };
}

export const articleData: JournalArticle = {
  title: {
    en: "Advanced Traffic Management and Security with MikroTik QoS",
    id: "Manajemen Lalu Lintas Lanjutan dan Keamanan dengan MikroTik QoS"
  },
  date: "14 Jan, 2026",
  readTime: {
    en: "12 min read",
    id: "12 mnt baca"
  },
  tags: ["MikroTik RouterOS", "QoS Mangle", "TLS SNI Layer 7", "Bandwidth Management", "Network Security"],
  intro: {
    en: "PT Puri Ganesha Engineering (PGE) faced severe network congestion during peak operational hours. Unrestricted streaming and peer-to-peer downloading were heavily degrading critical VoIP and video conferencing traffic (like Zoom and Microsoft Teams). Additionally, the network was vulnerable to external intrusion and DNS amplification attacks. Rather than purchasing expensive enterprise bandwidth controllers, I took the initiative to architect a highly optimized, resource-efficient traffic management system using the existing MikroTik infrastructure. By implementing advanced TLS SNI sniffing in the RAW firewall, dynamic QoS Mangle rules, and strict VLAN isolation, I permanently resolved their congestion issues and secured the network edge.",
    id: "PT Puri Ganesha Engineering (PGE) menghadapi kepadatan jaringan yang parah selama jam operasional sibuk. Streaming tanpa batas dan pengunduhan peer-to-peer sangat menurunkan kualitas lalu lintas VoIP dan konferensi video penting (seperti Zoom dan Microsoft Teams). Selain itu, jaringan rentan terhadap intrusi eksternal dan serangan amplifikasi DNS. Alih-alih membeli perangkat pengendali bandwidth enterprise yang mahal, saya berinisiatif merancang sistem manajemen lalu lintas yang sangat optimal dan hemat sumber daya menggunakan infrastruktur MikroTik yang ada. Dengan menerapkan sniffing TLS SNI lanjutan di firewall RAW, aturan QoS Mangle dinamis, dan isolasi VLAN yang ketat, saya menyelesaikan masalah kepadatan mereka secara permanen dan mengamankan perimeter jaringan."
  },
  sections: {
    trafficId: {
      en: {
        heading: "CPU-Efficient Traffic Identification (RAW Firewall & SNI)",
        paragraphs: [
          "Traditional Layer-7 packet inspection using regular expressions consumes significant CPU resources, leading to potential router bottlenecks. To solve this, I designed a traffic identification system leveraging the Server Name Indication (SNI) feature via the 'TLS Host' matcher in the MikroTik RAW firewall.",
          "By inspecting the TLS handshake on port 443, the router dynamically identifies specific domains and automatically adds the destination IPs to dynamic Address Lists. For example:"
        ],
        listItems: [
          "Communications: *whatsapp*, *discord*",
          "Video Streaming: *youtube.com*, *netflix*",
          "Social Media: *tiktok*, *instagram*",
          "E-commerce Live Streaming — *live.shopee*, *tokopedia.tv*"
        ],
        postParagraphs: [
          "This pre-routing capture mechanism classifies traffic like E-commerce Live Streaming, Audio Streaming, and OS Updates efficiently before it even reaches the main firewall engine."
        ]
      },
      id: {
        heading: "Identifikasi Lalu Lintas Hemat CPU (Firewall RAW & SNI)",
        paragraphs: [
          "Inspeksi paket Layer-7 tradisional menggunakan ekspresi reguler memakan sumber daya CPU yang signifikan, yang berpotensi menyebabkan bottleneck pada router. Untuk mengatasinya, saya merancang sistem identifikasi lalu lintas yang memanfaatkan fitur Server Name Indication (SNI) melalui pencocokan 'TLS Host' di firewall RAW MikroTik.",
          "Dengan menginspeksi handshake TLS pada port 443, router secara dinamis mengidentifikasi domain spesifik dan secara otomatis menambahkan IP tujuan ke dalam Address Lists dinamis. Sebagai contoh:"
        ],
        listItems: [
          "Komunikasi: *whatsapp*, *discord*",
          "Streaming Video: *youtube.com*, *netflix*",
          "Media Sosial: *tiktok*, *instagram*",
          "E-commerce Live Streaming — *live.shopee*, *tokopedia.tv*"
        ],
        postParagraphs: [
          "Mekanisme penangkapan pre-routing ini mengklasifikasikan lalu lintas seperti Live Streaming E-commerce, Audio Streaming, dan Update OS secara efisien bahkan sebelum mencapai mesin firewall utama."
        ]
      }
    },
    hierarchicalQoS: {
      en: {
        heading: "Hierarchical QoS & Bandwidth Management",
        paragraphs: [
          "With traffic accurately categorized into Address Lists, I implemented a comprehensive Quality of Service (QoS) hierarchy using Mangle rules. The architecture splits traffic into three distinct priority levels.",
          "High Priority is dedicated to office essentials (Zoom, Microsoft Teams, Google Meet) utilizing specific UDP port and TLS Host markings to guarantee crystal-clear VoIP and video streams. Medium Priority handles general browsing and background OS downloads. Low Priority restricts bandwidth-heavy activities like Short Video streaming (TikTok, Reels) and VOD services, preventing them from monopolizing the corporate bandwidth pool."
        ]
      },
      id: {
        heading: "QoS Hierarkis & Manajemen Bandwidth",
        paragraphs: [
          "Dengan lalu lintas yang telah dikategorikan secara akurat ke dalam Address Lists, saya menerapkan hierarki Quality of Service (QoS) yang komprehensif menggunakan aturan Mangle. Arsitektur ini membagi lalu lintas menjadi tiga tingkat prioritas yang berbeda.",
          "Prioritas Tinggi didedikasikan untuk kebutuhan esensial kantor (Zoom, Microsoft Teams, Google Meet) memanfaatkan port UDP spesifik dan penandaan TLS Host untuk menjamin kualitas aliran VoIP dan video yang jernih. Prioritas Sedang menangani penjelajahan umum dan unduhan OS di latar belakang. Prioritas Rendah membatasi aktivitas yang memakan banyak bandwidth seperti streaming Video Pendek (TikTok, Reels) dan layanan VOD, mencegah aktivitas tersebut memonopoli kumpulan bandwidth perusahaan."
        ]
      }
    },
    bittorrentFilter: {
      en: {
        heading: "Advanced BitTorrent Detection & Throttling",
        paragraphs: [
          "Peer-to-peer (P2P) traffic, specifically BitTorrent, is notoriously difficult to block because it utilizes randomized dynamic ports. I engineered a two-stage detection and throttling mechanism to neutralize P2P abuse.",
          "First, the RAW firewall catches standard Torrent TCP/UDP ports and uses behavioral Port Scan Detection (PSD) to identify randomized BitTorrent activity, subsequently adding the offending IP to a 'bittorrent-users' address list. Second, the Mangle stage marks the connections and packets of these specific IPs, allowing Simple Queues or Queue Trees to aggressively throttle their upload and download speeds without affecting other users on the network."
        ]
      },
      id: {
        heading: "Deteksi Lanjutan & Pembatasan BitTorrent",
        paragraphs: [
          "Lalu lintas Peer-to-peer (P2P), khususnya BitTorrent, sangat sulit untuk diblokir karena menggunakan port dinamis yang diacak. Saya merancang mekanisme deteksi dan pembatasan dua tahap untuk menetralkan penyalahgunaan P2P.",
          "Pertama, firewall RAW menangkap port TCP/UDP standar Torrent dan menggunakan Port Scan Detection (PSD) perilaku untuk mengidentifikasi aktivitas BitTorrent yang diacak, yang kemudian menambahkan IP pelanggar ke address list 'bittorrent-users'. Kedua, tahap Mangle menandai koneksi dan paket dari IP spesifik ini, memungkinkan Simple Queues atau Queue Trees untuk secara agresif membatasi kecepatan unggah dan unduh mereka tanpa memengaruhi pengguna lain di jaringan."
        ]
      }
    },
    securityHardening: {
      en: {
        heading: "Network Security & VLAN Isolation",
        paragraphs: [
          "Beyond bandwidth management, hardening the network edge was a critical priority. I enforced strict VLAN isolation by dropping forwarding traffic between different corporate subnets (e.g., preventing DHCP-LAN93 from communicating with DHCP-LAN27), halting potential lateral movement by malware.",
          "The router itself is secured by dropping DNS requests from the WAN interface to prevent DNS Amplification DDoS attacks. Furthermore, administrative access to WinBox (port 8291) is locked behind a strict whitelist, with automated drop rules protecting against unauthorized brute-force intrusion attempts."
        ]
      },
      id: {
        heading: "Pengerasan Keamanan Jaringan & Isolasi VLAN",
        paragraphs: [
          "Selain manajemen bandwidth, memperkeras keamanan perimeter jaringan adalah prioritas kritis. Saya memberlakukan isolasi VLAN yang ketat dengan men-drop lalu lintas forwarding antar subnet perusahaan yang berbeda (misalnya, mencegah DHCP-LAN93 berkomunikasi dengan DHCP-LAN27), menghentikan potensi pergerakan lateral oleh malware.",
          "Router itu sendiri diamankan dengan men-drop permintaan DNS dari antarmuka WAN untuk mencegah serangan DDoS Amplifikasi DNS. Lebih jauh lagi, akses administratif ke WinBox (port 8291) dikunci di balik whitelist yang ketat, dengan aturan drop otomatis yang melindungi router dari upaya intrusi brute-force yang tidak sah."
        ]
      }
    }
  },
  footer: {
    p1: {
      en: "This deployment strategy proves that enterprise-grade traffic shaping and network security do not always require expensive proprietary appliances. By deeply understanding network protocols and maximizing the capabilities of MikroTik RouterOS, we achieved a highly resilient, optimized, and secure corporate infrastructure.",
      id: "Strategi deployment ini membuktikan bahwa traffic shaping tingkat enterprise dan keamanan jaringan tidak selalu memerlukan perangkat proprietary yang mahal. Dengan memahami secara mendalam protokol jaringan dan memaksimalkan kemampuan MikroTik RouterOS, kami mencapai infrastruktur perusahaan yang sangat tangguh, optimal, dan aman."
    }
  }
};
