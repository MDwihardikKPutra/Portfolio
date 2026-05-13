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
  findings: string;
  analysis: string;
  contactDesc: string;
  getInTouch: string;
  thankYouMessage: string;
  selectedWork: string;
  sectionTitleProject: string;
  sectionTitlePersonalProject: string;
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
  expDesc4: string;
  expDesc5: string;
  expDesc6: string;
  eluxSpaceCompany: string;
  eluxSpacePosition: string;
  eluxSpaceDate: string;
  eluxSpaceDesc1: string;
  eluxSpaceDesc2: string;
  eluxSpaceDesc3: string;
  techStack: string;
  project1Category: string;
  project1Desc: string;
  project2Category: string;
  project2Desc: string;


  archiStudioCategory: string;
  archiStudioDesc: string;

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

  smartFinanceCategory: string;
  smartFinanceDesc: string;
  oceanusCategory: string;
  oceanusDesc: string;
  hrisCategory: string;
  hrisDesc: string;
  scaleupCategory: string;
  scaleupDesc: string;
  brewhouseCategory: string;
  brewhouseDesc: string;
  infrastructureCategory: string;
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
      "IT Infrastructure Engineer and Web Developer based in Bandung, Indonesia. My work focuses on building digital products, configuring server environments, and managing enterprise networks. I develop software architectures and IT infrastructures to support operational workflows, data accessibility, and system integrations.",
    contactMe: "Contact me",
    letsBuild: "Trying to do better",
    findings: "Findings",
    analysis: "Analysis",
    thankYouMessage: "Thanks for coming, for sure",
    contactDesc:
      "Have a project in mind? I'm open to discussing new opportunities and technical collaborations.",
    getInTouch: "Get in Touch",
    selectedWork: "Project Experience",
    sectionTitleProject: "Project",
    sectionTitlePersonalProject: "Personal Project",
    projects: "Project Experience",
    expertise: "Expertise",
    bachelorDegree: "Bachelor's Degree in Informatics Engineering",
    hello: "Hello, I am",
    anITEngineer: "An IT Engineer.",
    firstName: "Mokhamad Dwihardik Kusuma Putra / Diko Putra",
    lastName: "Kusuma Putra",
    lightMode: "Light",
    darkMode: "Dark",
    informationTechnologyEngineer: "IT Staff",
    pgeCompany: "PT Puri Ganesha Engineering",
    jun2025Present: "Jun 2025 - Present",
    d4InformationTechnology: "D4, Information Technology",
    aug2020_2024: "AUG 2020 - 2024",
    statePolytechnicMalang: "State Polytechnic of Malang",
    gpa: "GPA: 3.42",
    expDesc1: "Developed and deployed internal web-based business applications, including a project monitoring dashboard and a human resources (HR) management system.",
    expDesc2: "Designed and implemented a centralized office server environment utilizing TrueNAS and Nextcloud on Linux-based systems to ensure secure data storage and streamlined file collaboration.",
    expDesc3: "Managed enterprise network infrastructure using MikroTik routers, implementing VLANs, Hotspots, and Firewall configurations to maintain network security.",
    expDesc4: "Document Control for the PLTG Payo Selincah Unit #1 relocation project to PT CNI Kolaka: managing technical supervision records, version tracking, and secure archiving.",
    expDesc5: "Document Control for the Tungkal Gas Development Project: managed documentation for gas transportation services involving stakeholders like SKK Migas and MontD’Or Oil Tungkal Limited.",
    expDesc6: "Performed technical troubleshooting for hardware and software systems to maintain operational continuity and minimize downtime.",
    eluxSpaceCompany: "Elux Space",
    eluxSpacePosition: "UI/UX Internship",
    eluxSpaceDate: "Aug 2023 - Feb 2024",
    eluxSpaceDesc1:
      "Contributed to the design and development of user interfaces (UI) and user experiences (UX) for various digital products.",
    eluxSpaceDesc2:
      "Assisted in conducting user research, creating wireframes, prototypes, and mockups.",
    eluxSpaceDesc3:
      "Collaborated with cross-functional teams to ensure a user-centered design approach and translate concepts into intuitive designs.",
    techStack: "Tech Stack",
    project1Category: "Corporate Website",
    project1Desc:
      "Full-stack corporate website for leading Indonesian engineering consultancy.",
    project2Category: "Enterprise Platform",
    project2Desc:
      "Integrated Management Platform for managing critical office workflows.",


    archiStudioCategory: "Architectural Studio",
    archiStudioDesc: "High-end architectural landing page with Japanese minimalist aesthetics and editorial layouts.",

    backendDev: "Backend Development",
    frontendDev: "Frontend Development",
    databaseMgmt: "Database Management",
    systemAdmin: "System Administration",
    networkMgmt: "Network Management",
    cloudSecurity: "Cloud & Security",
    copyright: "© 2025 Mokhamad Dwihardik Kusuma Putra / Diko Putra. All rights reserved.",
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

    smartFinanceCategory: "Finance Management",
    smartFinanceDesc: "AI-powered financial management system for tracking transactions and wealth growth.",
    oceanusCategory: "Corporate Website",
    oceanusDesc: "High-impact corporate company profile with a focus on sustainable energy sector services.",
    hrisCategory: "HR Management",
    hrisDesc: "Compact Human Resource Integration System with streamlined attendance and payroll.",
    scaleupCategory: "Web Development Agency",
    scaleupDesc: "Boutique web development agency landing page showcasing modern tech solutions for businesses.",
    brewhouseCategory: "Landing Page",
    brewhouseDesc: "Modern coffee shop landing page with sophisticated design aesthetics and interactive elements.",
    infrastructureCategory: "Infrastructure & Operations",


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
      "IT Infrastructure Engineer dan Web Developer yang berbasis di Bandung, Indonesia. Pekerjaan saya berfokus pada pembangunan produk digital, konfigurasi lingkungan server, dan pengelolaan jaringan perusahaan. Saya mengembangkan arsitektur perangkat lunak dan infrastruktur IT untuk mendukung alur kerja operasional, aksesibilitas data, dan integrasi sistem.",
    contactMe: "Hubungi saya",
    letsBuild: "Mencoba untuk menjadi lebih baik",
    findings: "Temuan",
    analysis: "Analisis",
    thankYouMessage: "Terima kasih sudah datang",
    contactDesc:
      "Ada proyek dalam pikiran? Saya terbuka untuk membahas peluang baru dan kolaborasi teknis.",
    getInTouch: "Hubungi Saya",
    selectedWork: "Pengalaman Proyek",
    sectionTitleProject: "Proyek",
    sectionTitlePersonalProject: "Proyek Personal",
    projects: "Project Experience",
    expertise: "Keahlian",
    bachelorDegree: "Sarjana Terapan Teknik Informatika",
    hello: "Halo, saya",
    anITEngineer: "Seorang IT Engineer.",
    firstName: "Mokhamad Dwihardik Kusuma Putra / Diko Putra",
    lastName: "Kusuma Putra",
    lightMode: "Terang",
    darkMode: "Gelap",
    informationTechnologyEngineer: "IT Staff",
    pgeCompany: "PT Puri Ganesha Engineering",
    jun2025Present: "Jun 2025 - Sekarang",
    d4InformationTechnology: "D4, Teknik Informatika",
    aug2020_2024: "AGU 2020 - 2024",
    statePolytechnicMalang: "Politeknik Negeri Malang",
    gpa: "IPK: 3.42",
    expDesc1: "Mengembangkan dan menerapkan aplikasi bisnis berbasis web internal, termasuk dashboard monitoring proyek dan sistem manajemen sumber daya manusia (SDM).",
    expDesc2: "Merancang dan menerapkan lingkungan server kantor terpusat menggunakan TrueNAS dan Nextcloud pada sistem berbasis Linux untuk memastikan penyimpanan data yang aman dan kolaborasi file.",
    expDesc3: "Mengelola infrastruktur jaringan perusahaan menggunakan router MikroTik, menerapkan VLAN, Hotspot, dan konfigurasi Firewall untuk menjaga keamanan jaringan.",
    expDesc4: "Document Control untuk proyek relokasi PLTG Payo Selincah Unit #1 ke PT CNI Kolaka: mengelola catatan supervisi teknis, pelacakan versi, dan pengarsipan yang aman.",
    expDesc5: "Document Control untuk Proyek Pengembangan Gas Tungkal: mengelola dokumentasi layanan transportasi gas yang melibatkan pemangku kepentingan seperti SKK Migas dan MontD’Or Oil Tungkal Limited.",
    expDesc6: "Melakukan troubleshooting teknis untuk sistem perangkat keras dan lunak untuk menjaga kelangsungan operasional dan meminimalkan downtime.",
    eluxSpaceCompany: "Elux Space",
    eluxSpacePosition: "UI/UX Magang",
    eluxSpaceDate: "Agu 2023 - Feb 2024",
    eluxSpaceDesc1:
      "Berkontribusi pada desain dan pengembangan antarmuka pengguna (UI) dan pengalaman pengguna (UX) untuk berbagai produk digital.",
    eluxSpaceDesc2:
      "Membantu dalam melakukan riset pengguna, membuat wireframe, prototipe, dan mockup.",
    eluxSpaceDesc3:
      "Berkolaborasi dengan tim lintas fungsi untuk memastikan pendekatan desain yang berpusat pada pengguna dan menerjemahkan konsep menjadi desain yang intuitif.",
    techStack: "Tech Stack",
    project1Category: "Website Perusahaan",
    project1Desc:
      "Website perusahaan full-stack untuk konsultan teknik terkemuka di Indonesia.",
    project2Category: "Platform Enterprise",
    project2Desc:
      "Integrated Management Platform untuk mengelola alur kerja kantor yang kritis.",


    archiStudioCategory: "Studio Arsitektur",
    archiStudioDesc: "Landing page arsitektur kelas atas dengan estetika minimalis Jepang dan tata letak editorial.",

    backendDev: "Pengembangan Backend",
    frontendDev: "Pengembangan Frontend",
    databaseMgmt: "Manajemen Database",
    systemAdmin: "Administrasi Sistem",
    networkMgmt: "Manajemen Jaringan",
    cloudSecurity: "Cloud & Keamanan",
    copyright:
      "© 2025 Mokhamad Dwihardik Kusuma Putra / Diko Putra. Hak cipta dilindungi.",
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

    smartFinanceCategory: "Manajemen Keuangan",
    smartFinanceDesc: "Sistem manajemen keuangan berbasis AI untuk melacak transaksi dan pertumbuhan kekayaan.",
    oceanusCategory: "Website Perusahaan",
    oceanusDesc: "Company profile perusahaan dengan fokus pada layanan sektor energi terbarukan.",
    hrisCategory: "Manajemen HR",
    hrisDesc: "Sistem Integrasi SDM ringkas dengan absensi dan penggajian yang efisien.",
    scaleupCategory: "Jasa Pembuatan Web",
    scaleupDesc: "Landing page agensi pembuatan website yang menawarkan solusi teknologi modern bagi bisnis.",
    brewhouseCategory: "Landing Page",
    brewhouseDesc: "Landing page coffee shop modern dengan estetika desain yang canggih dan elemen interaktif.",
    infrastructureCategory: "Infrastruktur & Operasi",


  },
};
