export type Language = "en" | "id";

export interface Translations {
  about: string;
  experience: string;
  work: string;
  skills: string;
  contact: string;
  gallery: string;
  education: string;
  whoAmI: string;
  aboutText1: string;
  contactMe: string;
  letsBuild: string;
  contactDesc: string;
  getInTouch: string;
  thankYouMessage: string;
  selectedWork: string;
  projects: string;
  expertise: string;
  bachelorDegree: string;
  hello: string;
  anITEngineer: string;
  firstName: string;
  lastName: string;
  lightMode: string;
  darkMode: string;
  informationTechnologyEngineer: string;
  pgeCompany: string;
  jun2025Present: string;
  d4InformationTechnology: string;
  aug2020_2024: string;
  statePolytechnicMalang: string;
  gpa: string;
  expDesc1: string;
  expDesc2: string;
  expDesc3: string;
  wofWoodenCompany: string;
  wofWoodenPosition: string;
  wofWoodenDate: string;
  wofWoodenDesc1: string;
  wofWoodenDesc2: string;
  wofWoodenDesc3: string;
  techStack: string;
  project1Category: string;
  project1Desc: string;
  project2Category: string;
  project2Desc: string;
  project3Category: string;
  project3Desc: string;
  backendDev: string;
  frontendDev: string;
  databaseMgmt: string;
  systemAdmin: string;
  networkMgmt: string;
  cloudSecurity: string;
  copyright: string;
  backToProjects: string;
  projectDetails: string;
  background: string;
  needs: string;
  problems: string;
  solutions: string;
  finalOutput: string;
  developmentProcess: string;
  pgeDevelopmentProcess: string;
  pgeDevelopmentProcess2: string;
  pgeDevelopmentProcess3: string;
  pgeTechStackTitle: string;
  pgeTechStack: {
    backend: string;
    frontend: string;
    packages: string;
  };
  pgeBackground: string;
  pgeProblems: string;
  pgeSolutions: string;
  pgeOutput: string;
  essay: string;
  essayComingSoon: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    about: "About",
    experience: "Experience",
    work: "Work",
    skills: "Skills",
    contact: "Contact",
    gallery: "Gallery",
    education: "Education",
    whoAmI: "Who am I?",
    aboutText1:
      "Born in Kediri on May 2, 2001, I completed my secondary education at Lab School UM with a concentration in Natural Sciences (IPA). I continued my studies in Informatics Engineering at the State Polytechnic of Malang, earning a D4 degree in 2024 with a GPA of 3.42. Alongside my academic journey, I cultivate a strong passion for photography, which plays a significant role in shaping my creative direction and professional interests. I also write essays, exploring various topics that complement my technical expertise and creative pursuits.",
    contactMe: "Contact me",
    letsBuild: "Trying to do better",
    thankYouMessage: "Thanks for coming, for sure",
    contactDesc:
      "Have a project in mind? I'm open to discussing new opportunities and technical collaborations.",
    getInTouch: "Get in Touch",
    selectedWork: "Project Experience",
    projects: "03 Projects",
    expertise: "Expertise",
    bachelorDegree: "Bachelor's Degree in Informatics Engineering",
    hello: "Hello, I am",
    anITEngineer: "An IT Engineer.",
    firstName: "Mokhamad Dwihardik",
    lastName: "Kusuma Putra",
    lightMode: "Light",
    darkMode: "Dark",
    informationTechnologyEngineer: "Information Technology Engineer",
    pgeCompany: "PT Puri Ganesha Engineering",
    jun2025Present: "Jun 2025 - Present",
    d4InformationTechnology: "D4, Information Technology",
    aug2020_2024: "AUG 2020 - 2024",
    statePolytechnicMalang: "State Polytechnic of Malang",
    gpa: "GPA: 3.42",
    expDesc1:
      "Designed and deployed PGE System (v1.10.0), a comprehensive Integrated Management Platform managing critical office workflows. Mastered Database Management on relational databases MySQL and PostgreSQL.",
    expDesc2:
      "Responsible for installation, configuration, and maintenance of Ubuntu Server production environments. Designed and implemented distributed storage systems with TrueNAS Scale.",
    expDesc3:
      "Network Administration using RouterOS (MikroTik), including traffic shaping, Hotspot solutions, VLAN segmentation, and advanced routing configurations.",
    wofWoodenCompany: "WOF Wooden",
    wofWoodenPosition: "Photographer",
    wofWoodenDate: "Jan 2024 - May 2024",
    wofWoodenDesc1:
      "Developed and maintained company website using modern web technologies. Implemented responsive design and optimized website performance.",
    wofWoodenDesc2:
      "Provided technical support for IT infrastructure, troubleshooting hardware and software issues, and maintaining network systems.",
    wofWoodenDesc3:
      "Collaborated with team members to improve business processes through technology solutions and automation.",
    techStack: "Tech Stack",
    project1Category: "Corporate Website",
    project1Desc:
      "Full-stack corporate website for leading Indonesian engineering consultancy.",
    project2Category: "Enterprise Platform",
    project2Desc:
      "Integrated Management Platform for managing critical office workflows.",
    project3Category: "System Management",
    project3Desc:
      "Setup and maintenance of complete IT infrastructure including server deployment.",
    backendDev: "Backend Development",
    frontendDev: "Frontend Development",
    databaseMgmt: "Database Management",
    systemAdmin: "System Administration",
    networkMgmt: "Network Management",
    cloudSecurity: "Cloud & Security",
    copyright: "© 2025 Mokhamad Dwihardik Kusuma Putra. All rights reserved.",
    backToProjects: "Back to Projects",
    projectDetails: "Project Details",
    background: "Background",
    needs: "Needs",
    problems: "Problems",
    solutions: "Solutions",
    finalOutput: "Final Output",
    developmentProcess: "Development Process",
    pgeDevelopmentProcess:
      "The development process started with comprehensive planning and requirements gathering. This involved analyzing business needs, documenting functional requirements, and creating user stories for each module. The planning phase also included selecting the technology stack and establishing the project structure.",
    pgeDevelopmentProcess2:
      "System design documentation was created, focusing on Entity Relationship Diagram (ERD) development to map database tables and relationships across all modules. Flowcharts were designed to visualize business processes, approval workflows, and system interactions. System architecture diagrams were created to illustrate the application structure, and API endpoints were planned for frontend-backend integration.",
    pgeDevelopmentProcess3:
      "Database normalization was performed to ensure data integrity, followed by implementation of the database schema. The development phase then proceeded with backend and frontend implementation based on the established design documentation, ensuring all modules functioned according to the planned workflows and system architecture.",
    pgeTechStackTitle: "Tech Stack",
    pgeTechStack: {
      backend: "Backend: Laravel 11.31, PHP 8.2+, MySQL 8.x",
      frontend:
        "Frontend: Tailwind CSS 3.4, Alpine.js 3.x, Vite 6.0, Blade Templates",
      packages:
        "Packages: Spatie Permission (RBAC), Laravel Telescope (monitoring), DomPDF (PDF generation)",
    },
    pgeBackground:
      "The company operated daily processes manually across disconnected systems—work activities, leave, business trips, purchases, and vendor payments. This fragmented approach caused monitoring gaps, data inconsistencies, and inefficiencies. PGE System was developed as a mini-ERP to centralize all operational workflows into one integrated platform. The company needed automation for daily operations—work activities, leave, permissions, business trips, purchases, and vendor payments. The solution must unify workflows in one platform, eliminate data silos, accelerate approvals with documented flows, ensure data accuracy through traceable records, and provide real-time visibility into employee activities and project progress.",
    pgeProblems:
      "Fragmented processes across multiple systems caused data inconsistencies and inefficiencies. Approvals were slow and undocumented—no visibility into approvers or request status. Management lacked real-time insights into work progress and workload distribution. Manual reporting consumed time compiling activity summaries, leave reports, and payment documentation. Most critically, no audit trail existed to track data changes and user activities, hindering supervision and accountability.",
    pgeSolutions:
      "PGE System integrates nine core modules: Work Management for daily plans and progress tracking; Leave Management with auto-balance tracking and multi-layer approvals; SPD Management for business trips with cost calculations; Purchase & Vendor Payment with centralized approvals; unified Approval Center with real-time notifications; Project Management with granular access controls; User & Role Management with module-level permissions; real-time notifications and complete audit trails; and EAR module for automatic activity reports in daily, weekly, or monthly formats.",
    pgeOutput:
      "PGE System unified all operations in one platform, eliminating data silos. Approval cycles accelerated with automatic data persistence and structured workflows. Management gained real-time visibility into employee activities, leave balances, project progress, and payments through intuitive dashboards. Reporting automated—EAR reports, trip documents, purchase orders, and payment records generate automatically. Complete audit trails ensure transparency and accountability. Enhanced visibility enables comprehensive monitoring of activities, projects, and approvals, improving decision-making and organizational efficiency.",
    essay: "Essay",
    essayComingSoon: "Essays coming soon. Check back later for my thoughts and writings.",
  },
  id: {
    about: "Tentang",
    experience: "Pengalaman",
    work: "Proyek",
    skills: "Keahlian",
    contact: "Kontak",
    gallery: "Galeri",
    education: "Pendidikan",
    whoAmI: "Siapa saya?",
    aboutText1:
      "Lahir di Kediri pada tanggal 2 Mei 2001, saya menyelesaikan pendidikan menengah di Lab School UM dengan konsentrasi Ilmu Pengetahuan Alam (IPA). Saya melanjutkan studi di Teknik Informatika di Politeknik Negeri Malang, meraih gelar D4 pada tahun 2024 dengan IPK 3.42. Seiring dengan perjalanan akademik saya, saya mengembangkan minat yang kuat terhadap fotografi, yang memainkan peran penting dalam membentuk arah kreatif dan minat profesional saya. Saya juga menulis essay, mengeksplorasi berbagai topik yang melengkapi keahlian teknis dan minat kreatif saya.",
    contactMe: "Hubungi saya",
    letsBuild: "Mencoba untuk menjadi lebih baik",
    thankYouMessage: "Terima kasih sudah datang",
    contactDesc:
      "Ada proyek dalam pikiran? Saya terbuka untuk membahas peluang baru dan kolaborasi teknis.",
    getInTouch: "Hubungi Saya",
    selectedWork: "Pengalaman Proyek",
    projects: "03 Proyek",
    expertise: "Keahlian",
    bachelorDegree: "Sarjana Terapan Teknik Informatika",
    hello: "Halo, saya",
    anITEngineer: "Seorang IT Engineer.",
    firstName: "Mokhamad Dwihardik",
    lastName: "Kusuma Putra",
    lightMode: "Terang",
    darkMode: "Gelap",
    informationTechnologyEngineer: "Information Technology Engineer",
    pgeCompany: "PT Puri Ganesha Engineering",
    jun2025Present: "Jun 2025 - Sekarang",
    d4InformationTechnology: "D4, Teknik Informatika",
    aug2020_2024: "AGU 2020 - 2024",
    statePolytechnicMalang: "Politeknik Negeri Malang",
    gpa: "IPK: 3.42",
    expDesc1:
      "Merancang dan mengimplementasikan PGE System (v1.10.0), sebuah Integrated Management Platform yang komprehensif untuk mengelola alur kerja kantor yang kritis. Menguasai Database Management pada database relasional MySQL dan PostgreSQL.",
    expDesc2:
      "Bertanggung jawab atas instalasi, konfigurasi, dan pemeliharaan lingkungan produksi Ubuntu Server. Merancang dan mengimplementasikan sistem penyimpanan terdistribusi dengan TrueNAS Scale.",
    expDesc3:
      "Network Administration menggunakan RouterOS (MikroTik), termasuk traffic shaping, solusi Hotspot, segmentasi VLAN, dan konfigurasi routing lanjutan.",
    wofWoodenCompany: "WOF Wooden",
    wofWoodenPosition: "Photographer",
    wofWoodenDate: "Jan 2024 - Mei 2024",
    wofWoodenDesc1:
      "Mengembangkan dan memelihara website perusahaan menggunakan teknologi web modern. Mengimplementasikan desain responsif dan mengoptimalkan performa website.",
    wofWoodenDesc2:
      "Memberikan dukungan teknis untuk infrastruktur IT, troubleshooting masalah hardware dan software, serta memelihara sistem jaringan.",
    wofWoodenDesc3:
      "Berkolaborasi dengan anggota tim untuk meningkatkan proses bisnis melalui solusi teknologi dan otomatisasi.",
    techStack: "Tech Stack",
    project1Category: "Website Perusahaan",
    project1Desc:
      "Website perusahaan full-stack untuk konsultan teknik terkemuka di Indonesia.",
    project2Category: "Platform Enterprise",
    project2Desc:
      "Integrated Management Platform untuk mengelola alur kerja kantor yang kritis.",
    project3Category: "Manajemen Sistem",
    project3Desc:
      "Setup dan pemeliharaan infrastruktur IT lengkap termasuk deployment server.",
    backendDev: "Pengembangan Backend",
    frontendDev: "Pengembangan Frontend",
    databaseMgmt: "Manajemen Database",
    systemAdmin: "Administrasi Sistem",
    networkMgmt: "Manajemen Jaringan",
    cloudSecurity: "Cloud & Keamanan",
    copyright:
      "© 2025 Mokhamad Dwihardik Kusuma Putra. Hak cipta dilindungi.",
    backToProjects: "Kembali ke Proyek",
    projectDetails: "Detail Proyek",
    background: "Latar Belakang",
    needs: "Kebutuhan",
    problems: "Problem",
    solutions: "Solusi",
    finalOutput: "Output Akhir",
    developmentProcess: "Proses Pengembangan",
    pgeDevelopmentProcess:
      "Proses pengembangan dimulai dengan perencanaan dan pengumpulan kebutuhan. Ini melibatkan analisis kebutuhan bisnis, dokumentasi kebutuhan fungsional, dan pembuatan user stories untuk setiap modul. Fase perencanaan juga mencakup pemilihan technology stack dan penetapan struktur proyek.",
    pgeDevelopmentProcess2:
      "Dokumentasi desain sistem dibuat dengan fokus pada pengembangan Entity Relationship Diagram (ERD) untuk memetakan tabel database dan relasi di seluruh modul. Flowchart dirancang untuk memvisualisasikan proses bisnis, workflow approval, dan interaksi sistem. Diagram arsitektur sistem dibuat untuk mengilustrasikan struktur aplikasi, dan endpoint API direncanakan untuk integrasi frontend-backend.",
    pgeDevelopmentProcess3:
      "Normalisasi database dilakukan untuk memastikan integritas data, diikuti dengan implementasi schema database. Fase pengembangan kemudian dilanjutkan dengan implementasi backend dan frontend berdasarkan dokumentasi desain yang telah dibuat, memastikan semua modul berfungsi sesuai dengan workflow dan arsitektur sistem yang direncanakan.",
    pgeTechStackTitle: "Tech Stack",
    pgeTechStack: {
      backend: "Backend: Laravel 11.31, PHP 8.2+, MySQL 8.x",
      frontend:
        "Frontend: Tailwind CSS 3.4, Alpine.js 3.x, Vite 6.0, Blade Templates",
      packages:
        "Packages: Spatie Permission (RBAC), Laravel Telescope (monitoring), DomPDF (PDF generation)",
    },
    pgeBackground:
      "Perusahaan mengoperasikan proses harian secara manual di sistem yang terpisah—aktivitas kerja, cuti, perjalanan dinas, pembelian, dan pembayaran vendor. Pendekatan terfragmentasi ini menyebabkan gap monitoring, inkonsistensi data, dan ketidakefisienan. PGE System dikembangkan sebagai mini-ERP untuk memusatkan seluruh workflow operasional dalam satu platform terintegrasi. Perusahaan membutuhkan otomatisasi untuk operasi harian—aktivitas kerja, cuti, izin, perjalanan dinas, pembelian, dan pembayaran vendor. Solusi harus menyatukan workflow dalam satu platform, menghilangkan data silo, mempercepat approval dengan alur terdokumentasi, memastikan akurasi data melalui rekaman yang dapat ditelusuri, dan memberikan visibilitas real-time terhadap aktivitas karyawan dan progress project.",
    pgeProblems:
      "Proses terfragmentasi di berbagai sistem menyebabkan inkonsistensi data dan ketidakefisienan. Approval lambat dan tidak terdokumentasi—tidak ada visibilitas mengenai approver atau status pengajuan. Manajemen kurang insight real-time terhadap progress kerja dan distribusi beban karyawan. Pelaporan manual memakan waktu untuk kompilasi rekap aktivitas, laporan cuti, dan dokumentasi pembayaran. Yang paling kritis, tidak ada audit trail untuk melacak perubahan data dan aktivitas user, menghambat pengawasan dan akuntabilitas.",
    pgeSolutions:
      "PGE System mengintegrasikan sembilan modul inti: Work Management untuk rencana harian dan tracking progress; Leave Management dengan tracking sisa cuti otomatis dan approval berlapis; SPD Management untuk perjalanan dinas dengan kalkulasi biaya; Purchase & Vendor Payment dengan approval terpusat; Approval Center terpadu dengan notifikasi real-time; Project Management dengan kontrol akses granular; User & Role Management dengan permission per modul; notifikasi real-time dan audit trail lengkap; serta modul EAR untuk laporan aktivitas otomatis dalam format harian, mingguan, atau bulanan.",
    pgeOutput:
      "PGE System menyatukan seluruh operasi dalam satu platform, menghilangkan data silo. Siklus approval dipercepat dengan persistensi data otomatis dan workflow terstruktur. Manajemen memperoleh visibilitas real-time terhadap aktivitas karyawan, sisa cuti, progress project, dan pembayaran melalui dashboard intuitif. Pelaporan terotomatisasi—laporan EAR, dokumen perjalanan dinas, purchase order, dan catatan pembayaran ter-generate otomatis. Audit trail lengkap memastikan transparansi dan akuntabilitas. Visibilitas yang ditingkatkan memungkinkan monitoring menyeluruh aktivitas, project, dan approval, meningkatkan pengambilan keputusan dan efisiensi organisasi.",
    essay: "Essay",
    essayComingSoon: "Essay akan segera hadir. Kembali lagi nanti untuk membaca pemikiran dan tulisan saya.",
  },
};


