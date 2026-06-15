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
    hostSpecs: { en: ContentSection; id: ContentSection };
    containers: { en: ContentSection; id: ContentSection };
    tunneling: { en: ContentSection; id: ContentSection };
    syncWorkflows: { en: ContentSection; id: ContentSection };
    securityAudit: { en: ContentSection; id: ContentSection };
  };
  footer: {
    p1: { en: string; id: string };
  };
}

export const articleData: JournalArticle = {
  title: {
    en: "Building a Centralized Office Server with TrueNAS, Nextcloud, and Cloudflare Tunnel",
    id: "Membangun Server Kantor Terpusat dengan TrueNAS, Nextcloud, dan Cloudflare Tunnel"
  },
  date: "28 Aug, 2025",
  readTime: {
    en: "12 min read",
    id: "12 mnt baca"
  },
  tags: ["TrueNAS Scale", "Cloudflare Tunnel", "Nextcloud Hub", "Docker / K3s", "ZFS Filesystem"],
  intro: {
    en: "Faced with the challenge of organizing file collaborations, project monitoring data, and sensitive archives across PT Puri Ganesha Engineering's operations, I designed and implemented a centralized, private cloud server environment. By combining TrueNAS Scale with containerized Nextcloud services and Cloudflare Zero-Trust Tunnels, we eliminated traditional VPN bottlenecks while guaranteeing robust data security and access tracking.",
    id: "Dihadapkan pada tantangan mengorganisasi kolaborasi file, data pemantauan proyek, dan arsip sensitif di PT Puri Ganesha Engineering, saya merancang dan menerapkan lingkungan server cloud privat yang terpusat. Dengan menggabungkan TrueNAS Scale dengan layanan Nextcloud ter-kontainerisasi dan Cloudflare Zero-Trust Tunnel, kami mengeliminasi hambatan VPN tradisional sekaligus menjamin keamanan data dan pelacakan akses yang kuat."
  },
  sections: {
    hostSpecs: {
      en: {
        heading: "Host Platform & ZFS Storage Architecture",
        paragraphs: [
          "The central server runs on TrueNAS Scale (Community Edition, version 24.04.2), deployed on budget-friendly but reliable hardware powered by an Intel Core i3-4150 CPU running at 3.50GHz and 8 GB of RAM. The server is assigned a static IP of 192.168.22.23 in the local network. ZFS is selected as the underlying filesystem for its active data self-healing, transactional file writes, and compression capabilities.",
          "Storage is structured under a primary ZFS pool named PGE_DATA. To enforce security, access restrictions, and administrative clarity, I created four distinct datasets: (1) data1, acting as a general SMB share with 1.85 GiB in use; (2) Nextcloud_PGE, an unencrypted dataset dedicated to Nextcloud application files; (3) Pusat-Data, a dual-protocol share supporting SMB and NFS, hosting 4.29 GiB of corporate records; and (4) Sharing-Data, specifically configured with www-data permissions to allow direct access from Nextcloud and external file clients."
        ]
      },
      id: {
        heading: "Platform Host & Arsitektur Penyimpanan ZFS",
        paragraphs: [
          "Server pusat berjalan pada TrueNAS Scale (Community Edition, versi 24.04.2), yang dideploy pada perangkat keras hemat anggaran namun andal yang ditenagai oleh CPU Intel Core i3-4150 berkecepatan 3.50GHz dan RAM 8 GB. Server ini diberi IP statis 192.168.22.23 di jaringan lokal. ZFS dipilih sebagai sistem file dasar karena kemampuan self-healing data aktif, penulisan file transaksional, dan fitur kompresinya.",
          "Penyimpanan disusun di bawah pool ZFS utama bernama PGE_DATA. Untuk menegakkan keamanan, pembatasan akses, dan kejelasan administratif, saya membuat empat dataset berbeda: (1) data1, bertindak sebagai share SMB umum dengan 1.85 GiB digunakan; (2) Nextcloud_PGE, dataset tanpa enkripsi yang didedikasikan untuk file aplikasi Nextcloud; (3) Pusat-Data, share protokol ganda yang mendukung SMB dan NFS, menampung 4.29 GiB catatan perusahaan; dan (4) Sharing-Data, yang dikonfigurasi secara khusus dengan izin www-data untuk memungkinkan akses langsung dari Nextcloud dan klien file eksternal."
        ]
      }
    },
    containers: {
      en: {
        heading: "Docker Containerization & Network Topology",
        paragraphs: [
          "Inside the TrueNAS Scale application runtime, services are deployed as isolated containers. The primary collaboration hub is Nextcloud (v31.0.9), running on local port 30027 (and 30000). The deployment leverages an integrated application stack featuring a main Nextcloud app container, a PostgreSQL database container for metadata storage, and a Redis container for transactional file locking and caching.",
          "To secure public internet access without exposing ports publicly via traditional router configuration, a secondary containerized service, cloudflared, is installed. The cloudflared container runs in the same local network, serving as a secure gateway that links the local Nextcloud port (30027) directly to the Cloudflare Edge network."
        ]
      },
      id: {
        heading: "Kontainerisasi Docker & Topologi Jaringan",
        paragraphs: [
          "Di dalam runtime aplikasi TrueNAS Scale, layanan dideploy sebagai kontainer terisolasi. Hub kolaborasi utama adalah Nextcloud (v31.0.9), yang berjalan pada port lokal 30027 (dan 30000). Penerapannya memanfaatkan tumpukan aplikasi terintegrasi yang menampilkan kontainer aplikasi Nextcloud utama, kontainer database PostgreSQL untuk penyimpanan metadata, dan kontainer Redis untuk penguncian file transaksional dan caching.",
          "Untuk mengamankan akses internet publik tanpa mengekspos port secara terbuka via konfigurasi router tradisional, layanan kontainer kedua, cloudflared, diinstal. Kontainer cloudflared berjalan di jaringan lokal yang sama, bertindak sebagai gateway aman yang menghubungkan port Nextcloud lokal (30027) secara langsung ke jaringan Cloudflare Edge."
        ]
      }
    },
    tunneling: {
      en: {
        heading: "Exposing Local Services via Cloudflare Tunnel",
        paragraphs: [
          "Exposing private infrastructure safely requires bypassing traditional mechanisms like port forwarding, dynamic DNS, or complex client-side VPN setups. To address this, I configured a Cloudflare Tunnel named cloud-truenas-pge. The tunnel initiates outbound connections to Cloudflare's global network over HTTPS, ensuring that no inbound ports on our firewall need to be opened.",
          "In the Cloudflare Zero Trust console, I established a Hostname Route: nextcloud.pg-engineering.com, directing incoming traffic to the internal address http://192.168.22.23:30027 (Nextcloud Web UI). All traffic is encrypted using SSL/TLS, managed at the Cloudflare Edge, providing PT Puri Ganesha Engineering with a reliable, corporate-grade domain entry point."
        ]
      },
      id: {
        heading: "Ekspos Layanan Lokal via Cloudflare Tunnel",
        paragraphs: [
          "Mengekspos infrastruktur privat dengan aman memerlukan metode yang menghindari mekanisme tradisional seperti port forwarding, dynamic DNS, atau VPN client-side yang rumit. Untuk mengatasi ini, saya mengonfigurasi Cloudflare Tunnel bernama cloud-truenas-pge. Tunnel ini memulai koneksi keluar ke jaringan global Cloudflare melalui HTTPS, memastikan tidak ada port masuk pada firewall kami yang perlu dibuka.",
          "Di konsol Cloudflare Zero Trust, saya menetapkan Hostname Route: nextcloud.pg-engineering.com, mengarahkan lalu lintas masuk ke alamat internal http://192.168.22.23:30027 (UI Web Nextcloud). Semua lalu lintas dienkripsi menggunakan SSL/TLS yang dikelola di Cloudflare Edge, menyediakan titik masuk domain kelas korporat yang andal bagi PT Puri Ganesha Engineering."
        ]
      }
    },
    syncWorkflows: {
      en: {
        heading: "Location-Aware Client Synchronization Mechanics",
        paragraphs: [
          "To facilitate seamless file synchronization, employees utilize the Nextcloud desktop client. The client allows managing multiple profile mappings (e.g. user accounts like diko and pge_admin). However, since employees work both in the office and remotely, understanding network topology is critical to avoid sync errors.",
          "When employees are at the Office, they connect using the local network (192.168.x.x). Uploads go directly to the Central Server. When working Outside the Office (Luar Kantor), they must use the Public Account profile mapped to the nextcloud.pg-engineering.com domain. If they attempt to sync using the Local IP profile while away from the office, the connection fails, files remain locally cached, and sync is suspended until they return to the office network."
        ]
      },
      id: {
        heading: "Mekanisme Sinkronisasi Klien Berdasarkan Lokasi",
        paragraphs: [
          "Untuk memfasilitasi sinkronisasi file yang mulus, karyawan menggunakan klien desktop Nextcloud. Klien memungkinkan pengelolaan beberapa pemetaan profil (misalnya akun pengguna seperti diko dan pge_admin). Namun, karena karyawan bekerja baik di dalam kantor maupun secara remote, pemahaman tentang topologi jaringan sangat penting untuk menghindari kesalahan sinkronisasi.",
          "Ketika karyawan berada di Kantor, mereka terhubung menggunakan jaringan lokal (192.168.x.x). Unggahan langsung masuk ke Server Pusat. Saat bekerja di Luar Kantor, mereka harus menggunakan profil Akun Publik yang dipetakan ke domain nextcloud.pg-engineering.com. Jika mereka mencoba menyinkronkan menggunakan profil IP Lokal saat berada jauh dari kantor, koneksi akan gagal, file tetap tersimpan secara lokal di PC, dan sinkronisasi ditangguhkan hingga mereka kembali ke jaringan kantor."
        ]
      }
    },
    securityAudit: {
      en: {
        heading: "Security Hardening & System Resilience",
        paragraphs: [
          "The zero-trust setup provides multiple layers of defense. By routing all external access through Cloudflare, we can apply security policies, geoblocking, and access controls before traffic even reaches our local firewall. Any potential threats are mitigated at the edge.",
          "Additionally, ZFS compression (LZ4) and automatic daily snapshots secure the database and user files against accidental deletion or ransomware attacks. In the event of a breach or data loss, the administrator can roll back any dataset (such as PGE_DATA/Sharing-Data or Nextcloud_PGE) to a pristine state within seconds, ensuring continuous operational uptime."
        ]
      },
      id: {
        heading: "Pengerasan Keamanan & Ketahanan Sistem",
        paragraphs: [
          "Pengaturan zero-trust menyediakan beberapa lapisan pertahanan. Dengan mengarahkan semua akses eksternal melalui Cloudflare, kami dapat menerapkan kebijakan keamanan, geoblocking, dan kontrol akses bahkan sebelum lalu lintas mencapai firewall lokal kami. Ancaman potensial dimitigasi di sisi edge.",
          "Selain itu, kompresi ZFS (LZ4) dan snapshot harian otomatis mengamankan database dan file pengguna dari penghapusan tidak sengaja atau serangan ransomware. Jika terjadi pelanggaran keamanan atau kehilangan data, administrator dapat mengembalikan dataset (seperti PGE_DATA/Sharing-Data atau Nextcloud_PGE) ke keadaan semula dalam hitungan detik, memastikan kelangsungan operasional yang lancar."
        ]
      }
    }
  },
  footer: {
    p1: {
      en: "This architecture ensures that enterprise file storage remains private, self-hosted, and fully secure, yet easily accessible to authorized users globally. The fusion of TrueNAS, Docker, and Cloudflare Zero Trust proves that high-security standards can be implemented using open-source platforms and standard hardware.",
      id: "Arsitektur ini memastikan penyimpanan file perusahaan tetap privat, self-hosted, dan sepenuhnya aman, namun mudah diakses oleh pengguna yang berwenang secara global. Penggabungan TrueNAS, Docker, dan Cloudflare Zero Trust membuktikan bahwa standar keamanan tinggi dapat diterapkan menggunakan platform open-source dan perangkat keras standar."
    }
  }
};
