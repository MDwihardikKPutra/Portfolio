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
    aaPanelMgmt: { en: ContentSection; id: ContentSection };
    deployment: { en: ContentSection; id: ContentSection };
    security: { en: ContentSection; id: ContentSection };
    dashboard: { en: ContentSection; id: ContentSection };
  };
  footer: {
    p1: { en: string; id: string };
  };
}

export const articleData: JournalArticle = {
  title: {
    en: "Deploying Internal Dashboards with Ubuntu and aaPanel",
    id: "Deployment Dashboard Internal dengan Ubuntu dan aaPanel"
  },
  date: "29 Oct, 2025",
  readTime: {
    en: "10 min read",
    id: "10 mnt baca"
  },
  tags: ["Ubuntu 24", "aaPanel", "Laravel", "Server Management"],
  intro: {
    en: "PT Puri Ganesha Engineering (PGE) was struggling to find a reliable, centralized way to host their internal PHP/Laravel applications. Previous deployments on scattered machines led to maintenance nightmares and security vulnerabilities. Seeing this operational bottleneck, I took the initiative to design and build a dedicated Linux infrastructure from the ground up. By combining a robust Ubuntu 24 core with aaPanel for visual server management, I resolved their deployment issues—successfully launching the PGE Employee Dashboard within a secure, isolated environment.",
    id: "PT Puri Ganesha Engineering (PGE) kesulitan menemukan cara yang andal dan terpusat untuk menghosting aplikasi internal PHP/Laravel mereka. Deployment sebelumnya di mesin yang tersebar menyebabkan kendala pemeliharaan dan kerentanan keamanan. Melihat hambatan operasional ini, saya berinisiatif merancang dan membangun infrastruktur Linux khusus dari awal. Dengan menggabungkan core Ubuntu 24 yang tangguh dengan aaPanel untuk manajemen server visual, saya menyelesaikan masalah deployment mereka—dan berhasil meluncurkan PGE Employee Dashboard di dalam lingkungan yang aman dan terisolasi."
  },
  sections: {
    hostSpecs: {
      en: {
        heading: "Host Environment & Base Setup",
        paragraphs: [
          "The infrastructure runs on an Ubuntu 24.04 LTS operating system, deployed within the local intranet network on IP 192.168.22.225. The server is allocated 4 CPU cores and roughly 8 GB of RAM to comfortably handle multiple web applications and database services.",
          "Choosing Ubuntu as the host OS ensures broad compatibility with modern web stacks, extensive community support, and robust performance for backend operations."
        ]
      },
      id: {
        heading: "Lingkungan Host & Setup Dasar",
        paragraphs: [
          "Infrastruktur ini berjalan pada sistem operasi Ubuntu 24.04 LTS, di-deploy di dalam jaringan intranet lokal pada IP 192.168.22.225. Server dialokasikan dengan 4 core CPU dan sekitar 8 GB RAM untuk menangani berbagai aplikasi web dan layanan database dengan lancar.",
          "Memilih Ubuntu sebagai OS host memastikan kompatibilitas yang luas dengan tumpukan teknologi web modern, dukungan komunitas yang ekstensif, dan performa yang kuat untuk operasi backend."
        ]
      }
    },
    aaPanelMgmt: {
      en: {
        heading: "Visual Server Management with aaPanel",
        paragraphs: [
          "To avoid the overhead of strictly command-line server administration, I installed aaPanel as the primary control interface. aaPanel provides a comprehensive dashboard to monitor system status in real-time, displaying CPU load, RAM usage, and Disk space across different mount points like /data.",
          "The panel simplifies the installation of crucial software environments—such as Nginx, PHP (multiple versions), MySQL/MariaDB, and Docker—making it an ideal hub for rapid deployment and continuous server monitoring."
        ]
      },
      id: {
        heading: "Manajemen Server Visual dengan aaPanel",
        paragraphs: [
          "Untuk menghindari kerumitan administrasi server berbasis command-line secara terus-menerus, saya menginstal aaPanel sebagai antarmuka kontrol utama. aaPanel menyediakan dashboard yang komprehensif untuk memantau status sistem secara real-time, menampilkan beban CPU, penggunaan RAM, dan ruang Disk di berbagai mount point seperti /data.",
          "Panel ini menyederhanakan instalasi lingkungan perangkat lunak penting—seperti Nginx, PHP (berbagai versi), MySQL/MariaDB, dan Docker—menjadikannya hub ideal untuk deployment cepat dan pemantauan server berkelanjutan."
        ]
      }
    },
    deployment: {
      en: {
        heading: "Application Deployment & Site Configuration",
        paragraphs: [
          "Deploying the PHP application (built with Laravel) was streamlined via aaPanel's 'Website' module. I established a new site binding targeting the local IP on a custom port (192.168.22.225:12).",
          "This dedicated port routing isolates the employee dashboard from default web traffic on port 80/443, adding an extra layer of obscurity. The website path was routed directly to the public directory of the Laravel application, enabling secure processing of internal corporate data."
        ]
      },
      id: {
        heading: "Deployment Aplikasi & Konfigurasi Situs",
        paragraphs: [
          "Deployment aplikasi PHP (dibangun dengan Laravel) dipermudah melalui modul 'Website' di aaPanel. Saya membuat binding situs baru yang menargetkan IP lokal pada port khusus (192.168.22.225:12).",
          "Routing port khusus ini mengisolasi dashboard karyawan dari lalu lintas web default di port 80/443, menambahkan lapisan keamanan tambahan melalui obfuscation. Path situs diarahkan langsung ke direktori public dari aplikasi Laravel, memungkinkan pemrosesan data internal perusahaan yang aman."
        ]
      }
    },
    security: {
      en: {
        heading: "Firewall Configuration & Access Rules",
        paragraphs: [
          "Security is maintained directly from the aaPanel Security and Firewall settings. Only explicitly allowed ports are set to 'Listening'.",
          "Rules were strictly defined to allow inbound connections for SSH (port 22), standard web traffic (ports 80 and 443), database management (port 888), FTP passive ports, and the specific application port (port 12). Unnecessary ports remain closed to mitigate potential unauthorized network intrusion."
        ]
      },
      id: {
        heading: "Konfigurasi Firewall & Aturan Akses",
        paragraphs: [
          "Keamanan dijaga langsung dari pengaturan Security dan Firewall aaPanel. Hanya port yang secara eksplisit diizinkan yang disetel ke status 'Listening'.",
          "Aturan ditentukan secara ketat untuk mengizinkan koneksi masuk untuk SSH (port 22), lalu lintas web standar (port 80 dan 443), manajemen database (port 888), port pasif FTP, dan port aplikasi spesifik (port 12). Port yang tidak diperlukan tetap ditutup untuk memitigasi potensi intrusi jaringan yang tidak sah."
        ]
      }
    },
    dashboard: {
      en: {
        heading: "PGE Employee Dashboard Implementation",
        paragraphs: [
          "The culmination of this infrastructure setup is the PGE Employee Dashboard, a centralized hub for Work Management and Project Monitoring. It serves as an active portal for employees to track 'Rencana Kerja' (Work Plans), 'Realisasi Kerja' (Work Execution), and manage project statuses.",
          "With the robust backend provided by the Ubuntu server and aaPanel, the application runs with high responsiveness. Employees can securely submit Leave Requests (Cuti & Izin), track vendor payments, and monitor active Geothermal Survey and infrastructure projects across the company's sites."
        ]
      },
      id: {
        heading: "Implementasi Dashboard PGE Employee",
        paragraphs: [
          "Puncak dari setup infrastruktur ini adalah PGE Employee Dashboard, sebuah hub terpusat untuk Work Management dan Project Monitoring. Ini berfungsi sebagai portal aktif bagi karyawan untuk melacak Rencana Kerja, Realisasi Kerja, dan mengelola status proyek.",
          "Dengan backend kuat yang disediakan oleh server Ubuntu dan aaPanel, aplikasi berjalan dengan tingkat responsivitas tinggi. Karyawan dapat dengan aman mengajukan Cuti & Izin, melacak pembayaran vendor, dan memantau Proyek Survei Geothermal aktif serta proyek infrastruktur di berbagai lokasi perusahaan."
        ]
      }
    }
  },
  footer: {
    p1: {
      en: "This deployment strategy demonstrates how combining standard Linux architecture with modern server management tools like aaPanel accelerates the delivery of critical enterprise applications while ensuring security and manageability.",
      id: "Strategi deployment ini mendemonstrasikan bagaimana penggabungan arsitektur standar Linux dengan alat manajemen server modern seperti aaPanel dapat mempercepat pengiriman aplikasi enterprise kritis sambil tetap menjamin keamanan dan kemudahan manajemen."
    }
  }
};
