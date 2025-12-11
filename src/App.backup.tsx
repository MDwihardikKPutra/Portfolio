import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Sun,
  Moon,
  Globe,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "id">("en");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  const translations = {
    en: {
      about: "About",
      experience: "Experience",
      work: "Work",
      skills: "Skills",
      contact: "Contact",
      education: "Education",
      whoAmI: "Who am I?",
      aboutText1:
        "I earned my Bachelor's degree in Informatics Engineering from State Polytechnic of Malang in 2024 with a GPA of 3.42.",
      aboutText2:
        "As an IT Engineer, I focus on delivering scalable and maintainable technology solutions rooted in strategic thinking. I design and build enterprise applications and infrastructure systems aligned with organizational goals.",
      contactMe: "Contact me",
      letsBuild: "Let's build something powerful",
      contactDesc:
        "Have a project in mind? I'm open to discussing new opportunities and technical collaborations.",
      getInTouch: "Get in Touch",
      selectedWork: "Project Experience",
      projects: "03 Projects",
      expertise: "Expertise",
      bachelorDegree: "Bachelor's Degree in Informatics Engineering",
      hello: "Hello, I am",
      anITEngineer: "An IT Engineer.",
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
    },
    id: {
      about: "Tentang",
      experience: "Pengalaman",
      work: "Proyek",
      skills: "Keahlian",
      contact: "Kontak",
      education: "Pendidikan",
      whoAmI: "Siapa saya?",
      aboutText1:
        "Saya meraih gelar Sarjana Terapan Teknik Informatika dari Politeknik Negeri Malang pada tahun 2024 dengan IPK 3.42.",
      aboutText2:
        "Sebagai IT Engineer, saya fokus pada penyediaan solusi teknologi yang scalable dan maintainable yang berakar pada pemikiran strategis. Saya merancang dan membangun aplikasi enterprise serta sistem infrastruktur yang selaras dengan tujuan organisasi.",
      contactMe: "Hubungi saya",
      letsBuild: "Mari kita bangun sesuatu yang powerful",
      contactDesc:
        "Ada proyek dalam pikiran? Saya terbuka untuk membahas peluang baru dan kolaborasi teknis.",
      getInTouch: "Hubungi Saya",
      selectedWork: "Pengalaman Proyek",
      projects: "03 Proyek",
      expertise: "Keahlian",
      bachelorDegree: "Sarjana Terapan Teknik Informatika",
      hello: "Halo, saya",
      anITEngineer: "Seorang IT Engineer.",
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
    },
  };

  const t = translations[language];

  const getProjects = () => [
    {
      title: "PT Puri Ganesha Engineering",
      category: language === "en" ? "Corporate Website" : "Website Perusahaan",
      description:
        language === "en"
          ? "Full-stack corporate website for leading Indonesian engineering consultancy."
          : "Website perusahaan full-stack untuk konsultan teknik terkemuka di Indonesia.",
      images: ["/pge-hero.png", "/pge-project.png", "/pge-aboutus.png"],
      tags: ["React", "Full-Stack"],
      link: "https://pg-engineering.com",
      featured: true,
    },
    {
      title: "PGE System",
      category:
        language === "en" ? "Enterprise Platform" : "Platform Enterprise",
      description:
        language === "en"
          ? "Integrated Management Platform for managing critical office workflows."
          : "Integrated Management Platform untuk mengelola alur kerja kantor yang kritis.",
      images: [
        "/Web-PGE-System.png",
        "/Web-PGE-System1.png",
        "/Web-PGE-System2.png",
        "/Web-PGE-System3.png",
        "/Web-PGE-System4.png",
      ],
      tags: ["Laravel 11", "Enterprise"],
      link: "#",
      featured: true,
    },
    {
      title: "Network Infrastructure",
      category: language === "en" ? "System Management" : "Manajemen Sistem",
      description:
        language === "en"
          ? "Setup and maintenance of complete IT infrastructure including server deployment."
          : "Setup dan pemeliharaan infrastruktur IT lengkap termasuk deployment server.",
      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Linux", "Network"],
      link: "#",
      featured: true,
    },
  ];

  const getSkills = () => [
    {
      category:
        language === "en" ? "Backend Development" : "Pengembangan Backend",
      items: ["Laravel 11", "PHP", "RESTful API"],
    },
    {
      category:
        language === "en" ? "Frontend Development" : "Pengembangan Frontend",
      items: ["React", "Alpine.js", "Tailwind CSS", "Vite", "TypeScript"],
    },
    {
      category:
        language === "en" ? "Database Management" : "Manajemen Database",
      items: ["MySQL", "PostgreSQL"],
    },
    {
      category:
        language === "en" ? "System Administration" : "Administrasi Sistem",
      items: [
        "Ubuntu Server",
        "Linux Administration",
        "TrueNAS Scale",
        "Server Deployment",
        "System Maintenance",
      ],
    },
    {
      category: language === "en" ? "Network Management" : "Manajemen Jaringan",
      items: [
        "MikroTik RouterOS",
        "Network Administration",
        "VLAN Configuration",
        "Traffic Shaping",
        "Routing & Firewall",
      ],
    },
    {
      category: language === "en" ? "Cloud & Security" : "Cloud & Keamanan",
      items: [
        "Nextcloud",
        "Cloudflare Tunnel",
        "Zero Trust Security",
        "cPanel",
        "VPS Management",
      ],
    },
  ];

  // Get selected project
  const selectedProjectData =
    selectedProject !== null ? getProjects()[selectedProject] : null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-white text-[#1a1a1a]"
      }`}
    >
      {/* Project Detail Page */}
      {selectedProjectData && (
        <div className="pt-20 pb-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div
              className={`rounded-2xl transition-all duration-300 relative ${
                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
              }`}
            >
              {/* Language Toggle Button */}
              <button
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                className={`absolute top-6 right-20 sm:right-24 z-10 p-2.5 sm:p-3 rounded-full transition-all duration-300 hover-scale ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-[#f5f5f5] hover:bg-[#3a3a3a] active:bg-[#3a3a3a]"
                    : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5] active:bg-[#e5e5e5]"
                }`}
                aria-label="Toggle language"
              >
                <Globe size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>

              {/* Dark/Light Mode Toggle Button */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`absolute top-6 right-6 z-10 p-2.5 sm:p-3 rounded-full transition-all duration-300 hover-scale hover:rotate-180 ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-[#f5f5f5] hover:bg-[#3a3a3a] active:bg-[#3a3a3a]"
                    : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5] active:bg-[#e5e5e5]"
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                ) : (
                  <Moon size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                )}
              </button>

              <div className="p-8 md:p-12 lg:p-16">
                {/* Back Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-all duration-300 hover-underline hover:gap-3 ${
                    isDarkMode
                      ? "text-[#a0a0a0] hover:text-[#f5f5f5]"
                      : "text-[#666666] hover:text-[#1a1a1a]"
                  }`}
                >
                  <ArrowLeft
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  {t.backToProjects}
                </button>

                {/* Project Detail Content */}
                <div className="space-y-12">
                  {/* Header Section */}
                  <div>
                    <span
                      className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                        isDarkMode ? "text-[#666666]" : "text-[#999999]"
                      }`}
                    >
                      {selectedProjectData.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.03em] mt-4 mb-6">
                      {selectedProjectData.title
                        .split(" ")
                        .map((word, i, arr) => {
                          if (i === 0) {
                            return (
                              <span key={i} className="font-medium">
                                {word}
                              </span>
                            );
                          } else if (i === arr.length - 1) {
                            return (
                              <span key={i}>
                                {" "}
                                <span className="italic">{word}</span>
                              </span>
                            );
                          }
                          return <span key={i}> {word}</span>;
                        })}
                    </h1>
                    <p
                      className={`text-lg leading-relaxed transition-colors ${
                        isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                      }`}
                    >
                      {selectedProjectData.description}
                    </p>
                  </div>

                  {/* Project Tags */}
                  {selectedProjectData.tags &&
                    selectedProjectData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {selectedProjectData.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              isDarkMode
                                ? "bg-[#2a2a2a] text-[#f5f5f5]"
                                : "bg-[#f5f5f5] text-[#1a1a1a]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* PGE System Detail Content */}
                  {selectedProject === 1 && (
                    <article className="max-w-4xl mx-auto">
                      {/* Background */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.background}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeBackground}
                        </p>
                      </section>

                      {/* Problems */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.problems}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeProblems}
                        </p>
                      </section>

                      {/* Solutions */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-right">
                          {t.solutions}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeSolutions}
                        </p>
                      </section>

                      {/* Development Process */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.developmentProcess}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-4 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeDevelopmentProcess}
                        </p>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-4 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeDevelopmentProcess2}
                        </p>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-6 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeDevelopmentProcess3}
                        </p>

                        {/* Flowchart Visualization - Integrated System Workflow */}
                        <div
                          className={`mt-8 p-6 rounded-lg transition-colors ${
                            isDarkMode ? "bg-[#0a0a0a]" : "bg-[#f9f9f9]"
                          }`}
                        >
                          <h3
                            className={`text-lg font-medium mb-6 transition-colors ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            PGE System Workflow
                          </h3>
                          <div className="flowchart-container overflow-x-auto">
                            <div className="flex flex-col items-center gap-3 min-w-max mx-auto">
                              {/* Start */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                                  isDarkMode
                                    ? "bg-blue-900/30 text-blue-300 border border-blue-700"
                                    : "bg-blue-50 text-blue-700 border border-blue-300"
                                }`}
                              >
                                User Mengakses Sistem
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              {/* Decision: Select Module */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors transform rotate-45 w-24 h-24 flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                }`}
                              >
                                <span className="transform -rotate-45 text-xs">
                                  Pilih Modul
                                </span>
                              </div>

                              {/* Module Options */}
                              <div className="flex gap-4 mt-2 flex-wrap justify-center">
                                <div className="flex flex-col items-center gap-2">
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Leave Module
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Payment Module<br/>(SPD/Purchase/Vendor)
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Work Module<br/>(Plan/Realization)
                                  </div>
                                </div>
                              </div>
                              
                              {/* Converge to Common Flow */}
                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>
                              
                              {/* Decision: Check Access */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors transform rotate-45 w-20 h-20 flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                }`}
                              >
                                <span className="transform -rotate-45 text-xs">
                                  Check<br/>Access
                                </span>
                              </div>
                              
                              <div className="flex gap-8 mt-2">
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-red-400"
                                        : "text-red-600"
                                    }`}
                                  >
                                    No Access
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-red-900/30 text-red-300 border border-red-700"
                                        : "bg-red-50 text-red-700 border border-red-300"
                                    }`}
                                  >
                                    403: Access Denied
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-green-400"
                                        : "text-green-600"
                                    }`}
                                  >
                                    Has Access
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Fill Form & Submit
                                  </div>
                                </div>
                              </div>

                              {/* Common Process Flow */}
                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              {/* Decision: Validate */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors transform rotate-45 w-20 h-20 flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                }`}
                              >
                                <span className="transform -rotate-45 text-xs">
                                  Validasi<br/>Data
                                </span>
                              </div>

                              <div className="flex gap-8 mt-2">
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-red-400"
                                        : "text-red-600"
                                    }`}
                                  >
                                    Invalid
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-red-900/30 text-red-300 border border-red-700"
                                        : "bg-red-50 text-red-700 border border-red-300"
                                    }`}
                                  >
                                    Show Error
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-green-400"
                                        : "text-green-600"
                                    }`}
                                  >
                                    Valid
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Submit Request<br/>Status: PENDING
                                  </div>
                                </div>
                              </div>

                              {/* Submit Process */}
                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Create Leave Request
                                <br />
                                Status: PENDING
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Send Notification
                                <br />
                                to Approver
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Log Activity
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              {/* Decision: Approver Review */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors transform rotate-45 w-20 h-20 flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                }`}
                              >
                                <span className="transform -rotate-45 text-xs">
                                  Approver
                                  <br />
                                  Review
                                </span>
                              </div>

                              <div className="flex gap-8 mt-2">
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-green-400"
                                        : "text-green-600"
                                    }`}
                                  >
                                    Approve
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Update Status: APPROVED
                                    <br />
                                    Set approved_by & approved_at
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Update User Leave Balance
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Generate PDF Certificate
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-green-900/30 text-green-300 border border-green-700"
                                        : "bg-green-50 text-green-700 border border-green-300"
                                    }`}
                                  >
                                    Notify User: Approved
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-red-400"
                                        : "text-red-600"
                                    }`}
                                  >
                                    Reject
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Update Status: REJECTED
                                    <br />
                                    Set rejection_reason
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-red-900/30 text-red-300 border border-red-700"
                                        : "bg-red-50 text-red-700 border border-red-300"
                                    }`}
                                  >
                                    Notify User: Rejected
                                  </div>
                                </div>
                              </div>

                              {/* Final Steps */}
                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Log Activity
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                                  isDarkMode
                                    ? "bg-green-900/30 text-green-300 border border-green-700"
                                    : "bg-green-50 text-green-700 border border-green-300"
                                }`}
                              >
                                Process Complete
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Final Output */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.finalOutput}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-6 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeOutput}
                        </p>
                        {selectedProjectData.images &&
                        selectedProjectData.images.length > 0 ? (
                          <div className="relative w-full mt-6">
                            <div className="relative rounded-lg overflow-hidden">
                              <img
                                src={
                                  selectedProjectData.images[currentImageIndex]
                                }
                                alt={`${
                                  selectedProjectData.title
                                } - Final Output ${currentImageIndex + 1}`}
                                className="w-full h-auto object-cover"
                              />
                              {selectedProjectData.images.length > 1 && (
                                <>
                                  <button
                                    onClick={() =>
                                      setCurrentImageIndex(
                                        (prev) =>
                                          (prev -
                                            1 +
                                            selectedProjectData.images.length) %
                                          selectedProjectData.images.length
                                      )
                                    }
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                                      isDarkMode
                                        ? "bg-black/50 hover:bg-black/70 text-white"
                                        : "bg-white/50 hover:bg-white/70 text-black"
                                    }`}
                                    aria-label="Previous image"
                                  >
                                    <ChevronLeft className="w-6 h-6" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      setCurrentImageIndex(
                                        (prev) =>
                                          (prev + 1) %
                                          selectedProjectData.images.length
                                      )
                                    }
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                                      isDarkMode
                                        ? "bg-black/50 hover:bg-black/70 text-white"
                                        : "bg-white/50 hover:bg-white/70 text-black"
                                    }`}
                                    aria-label="Next image"
                                  >
                                    <ChevronRight className="w-6 h-6" />
                                  </button>
                                </>
                              )}
                            </div>
                            {selectedProjectData.images.length > 1 && (
                              <div className="flex justify-center gap-2 mt-4">
                                {selectedProjectData.images.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                      currentImageIndex === index
                                        ? isDarkMode
                                          ? "bg-white"
                                          : "bg-black"
                                        : isDarkMode
                                        ? "bg-white/30"
                                        : "bg-black/30"
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ) : null}
                      </section>
                    </article>
                  ) : (
                    <div
                      className={`transition-colors ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {/* Main Content */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16 gap-6">
                        <div className="flex-1">
                          <h1
                            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {t.hello}{" "}
                            <span
                              className={`inline-block transition-colors ${
                                isDarkMode ? "text-white" : "text-black"
                              }`}
                            >
                              {t.anITEngineer.split(" ").map((word, i) => (
                                <span
                                  key={i}
                                  className="inline-block hover-lift"
                                >
                                  {word}{" "}
                                </span>
                              ))}
                            </span>
                          </h1>
                          <p
                            className={`text-lg md:text-xl leading-relaxed transition-colors ${
                              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                            }`}
                          >
                            {t.aboutText1}
                          </p>
                          <p
                            className={`text-lg md:text-xl leading-relaxed mt-4 transition-colors ${
                              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                            }`}
                          >
                            {t.aboutText2}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              setLanguage(language === "en" ? "id" : "en")
                            }
                            className={`p-3 rounded-full transition-colors hover-lift ${
                              isDarkMode
                                ? "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                                : "bg-white text-black hover:bg-gray-100"
                            }`}
                            aria-label="Toggle language"
                          >
                            <Globe className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-3 rounded-full transition-colors hover-lift ${
                              isDarkMode
                                ? "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                                : "bg-white text-black hover:bg-gray-100"
                            }`}
                            aria-label="Toggle dark mode"
                          >
                            {isDarkMode ? (
                              <Sun className="w-5 h-5" />
                            ) : (
                              <Moon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* About Section */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.about}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.aboutText1}
                        </p>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors mt-4 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.aboutText2}
                        </p>
                      </section>

                      {/* Education Section */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.education}
                        </h2>
                        <div
                          className={`text-base md:text-lg leading-loose transition-colors ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          <p className="mb-2">
                            {t.aug2020_2024} {t.d4InformationTechnology}{" "}
                            {t.statePolytechnicMalang}
                          </p>
                          <p>{t.gpa}</p>
                        </div>
                      </section>

                      {/* Experience Section */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.experience}
                        </h2>
                        <div
                          className={`text-base md:text-lg leading-loose transition-colors mb-4 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          <p className="font-medium mb-2">
                            {t.informationTechnologyEngineer} - {t.pgeCompany}
                          </p>
                          <p className="mb-4">{t.jun2025Present}</p>
                          <p className="text-justify">{t.expDesc1}</p>
                        </div>
                      </section>

                      {/* Project Experience Section */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-6 text-left">
                          {t.selectedWork}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {getProjects(language).map((project, index) => (
                            <div
                              key={index}
                              onClick={() => setSelectedProject(index)}
                              className={`p-6 rounded-lg cursor-pointer transition-all hover-lift ${
                                isDarkMode
                                  ? "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                            >
                              <h3
                                className={`text-xl font-medium mb-2 transition-colors ${
                                  isDarkMode ? "text-white" : "text-black"
                                }`}
                              >
                                {project.title}
                              </h3>
                              <p
                                className={`text-sm transition-colors ${
                                  isDarkMode
                                    ? "text-[#a0a0a0]"
                                    : "text-[#666666]"
                                }`}
                              >
                                {project.description
                                  .split(" ")
                                  .map((word, i, arr) =>
                                    i === arr.length - 1 ? (
                                      <span key={i}>{word}</span>
                                    ) : (
                                      <span key={i}>{word} </span>
                                    )
                                  )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Skills Section */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-6 text-left">
                          {t.expertise}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {getSkills(language).map((skillSet, index) => (
                            <div
                              key={index}
                              className={`p-6 rounded-lg transition-all hover-lift ${
                                isDarkMode
                                  ? "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                            >
                              <h3
                                className={`text-lg font-medium mb-4 transition-colors ${
                                  isDarkMode ? "text-white" : "text-black"
                                }`}
                              >
                                {skillSet.category}
                              </h3>
                              <ul className="space-y-2">
                                {skillSet.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className={`text-sm transition-colors ${
                                      isDarkMode
                                        ? "text-[#a0a0a0]"
                                        : "text-[#666666]"
                                    }`}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Contact Section */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.contact}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-6 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.contactDesc}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <a
                            href="mailto:your.email@example.com"
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover-lift ${
                              isDarkMode
                                ? "bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
                                : "bg-white hover:bg-gray-50 text-black"
                            }`}
                          >
                            <Mail className="w-5 h-5" />
                            <span>{t.getInTouch}</span>
                          </a>
                          <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover-lift ${
                              isDarkMode
                                ? "bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
                                : "bg-white hover:bg-gray-50 text-black"
                            }`}
                          >
                            <Github className="w-5 h-5" />
                            <span>GitHub</span>
                          </a>
                          <a
                            href="https://linkedin.com/in/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover-lift ${
                              isDarkMode
                                ? "bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
                                : "bg-white hover:bg-gray-50 text-black"
                            }`}
                          >
                            <Linkedin className="w-5 h-5" />
                            <span>LinkedIn</span>
                          </a>
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors max-w-[140px] text-center ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Project, Destination,
                                    <br />
                                    Dates, Costs
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Purchase Form
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors max-w-[140px] text-center ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Project, Item Details,
                                    <br />
                                    Quantity & Price
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Vendor Payment Form
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors max-w-[140px] text-center ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Vendor, Project,
                                    <br />
                                    Invoice & Amount
                                  </div>
                                </div>
                              </div>

                              {/* Converge to Validate */}
                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors transform rotate-45 w-20 h-20 flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                }`}
                              >
                                <span className="transform -rotate-45 text-xs">
                                  Validasi
                                  <br />
                                  Data
                                </span>
                              </div>

                              <div className="flex gap-8 mt-2">
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-red-400"
                                        : "text-red-600"
                                    }`}
                                  >
                                    Invalid
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-red-900/30 text-red-300 border border-red-700"
                                        : "bg-red-50 text-red-700 border border-red-300"
                                    }`}
                                  >
                                    Show Validation Error
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-green-400"
                                        : "text-green-600"
                                    }`}
                                  >
                                    Valid
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Calculate Total
                                  </div>
                                </div>
                              </div>

                              {/* Submit Process */}
                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Submit Payment Request
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Create Record
                                <br />
                                Status: PENDING
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Send Notification
                                <br />
                                to Approver
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Log Activity
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              {/* Decision: Approver Review */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors transform rotate-45 w-20 h-20 flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                }`}
                              >
                                <span className="transform -rotate-45 text-xs">
                                  Approver
                                  <br />
                                  Review
                                </span>
                              </div>

                              <div className="flex gap-8 mt-2">
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-green-400"
                                        : "text-green-600"
                                    }`}
                                  >
                                    Approve
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Update Status: APPROVED
                                    <br />
                                    Set approved_by & approved_at
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Generate PDF Document
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-green-900/30 text-green-300 border border-green-700"
                                        : "bg-green-50 text-green-700 border border-green-300"
                                    }`}
                                  >
                                    Notify User: Approved
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-red-400"
                                        : "text-red-600"
                                    }`}
                                  >
                                    Reject
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Update Status: REJECTED
                                    <br />
                                    Set rejection_reason
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-red-900/30 text-red-300 border border-red-700"
                                        : "bg-red-50 text-red-700 border border-red-300"
                                    }`}
                                  >
                                    Notify User: Rejected
                                  </div>
                                </div>
                              </div>

                              {/* Final Steps */}
                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-xs transition-colors ${
                                  isDarkMode
                                    ? "bg-[#2a2a2a] text-white"
                                    : "bg-white text-black border-2 border-gray-300"
                                }`}
                              >
                                Log Activity
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                                  isDarkMode
                                    ? "bg-green-900/30 text-green-300 border border-green-700"
                                    : "bg-green-50 text-green-700 border border-green-300"
                                }`}
                              >
                                Process Complete
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Flowchart Visualization - Work Management Workflow */}
                        <div
                          className={`mt-6 p-6 rounded-lg transition-colors ${
                            isDarkMode ? "bg-[#0a0a0a]" : "bg-[#f9f9f9]"
                          }`}
                        >
                          <h3
                            className={`text-lg font-medium mb-6 transition-colors ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            3. Work Management Workflow
                          </h3>
                          <div className="flowchart-container overflow-x-auto">
                            <div className="flex flex-col items-center gap-3 min-w-max mx-auto">
                              {/* Start */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                                  isDarkMode
                                    ? "bg-blue-900/30 text-blue-300 border border-blue-700"
                                    : "bg-blue-50 text-blue-700 border border-blue-300"
                                }`}
                              >
                                User Membuka Work Module
                              </div>

                              <div
                                className={`w-0.5 h-6 transition-colors ${
                                  isDarkMode ? "bg-[#555555]" : "bg-gray-300"
                                }`}
                              ></div>

                              {/* Decision: Time of Day */}
                              <div
                                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors transform rotate-45 w-24 h-24 flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                    : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                }`}
                              >
                                <span className="transform -rotate-45 text-xs">
                                  Time of
                                  <br />
                                  Day
                                </span>
                              </div>

                              <div className="flex gap-8 mt-2">
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-blue-400"
                                        : "text-blue-600"
                                    }`}
                                  >
                                    Morning
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Create Work Plan
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors max-w-[180px] text-center ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Isi: Project, Title, Description,
                                    Objectives, Expected Output, Work Location,
                                    Planned Duration
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors transform rotate-45 w-16 h-16 flex items-center justify-center ${
                                      isDarkMode
                                        ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                        : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                    }`}
                                  >
                                    <span className="transform -rotate-45 text-xs">
                                      Validasi
                                    </span>
                                  </div>
                                  <div className="flex gap-8 mt-2">
                                    <div className="flex flex-col items-center gap-2">
                                      <span
                                        className={`text-xs font-medium transition-colors ${
                                          isDarkMode
                                            ? "text-red-400"
                                            : "text-red-600"
                                        }`}
                                      >
                                        Invalid
                                      </span>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-red-900/30 text-red-300 border border-red-700"
                                            : "bg-red-50 text-red-700 border border-red-300"
                                        }`}
                                      >
                                        Show Error
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                      <span
                                        className={`text-xs font-medium transition-colors ${
                                          isDarkMode
                                            ? "text-green-400"
                                            : "text-green-600"
                                        }`}
                                      >
                                        Valid
                                      </span>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Save Work Plan
                                      </div>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Log Activity
                                      </div>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Notify Project Manager
                                      </div>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                          isDarkMode
                                            ? "bg-green-900/30 text-green-300 border border-green-700"
                                            : "bg-green-50 text-green-700 border border-green-300"
                                        }`}
                                      >
                                        Work Plan Created
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                  <span
                                    className={`text-xs font-medium transition-colors ${
                                      isDarkMode
                                        ? "text-purple-400"
                                        : "text-purple-600"
                                    }`}
                                  >
                                    Evening
                                  </span>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Create Work Realization
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors transform rotate-45 w-20 h-20 flex items-center justify-center ${
                                      isDarkMode
                                        ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                        : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                    }`}
                                  >
                                    <span className="transform -rotate-45 text-xs">
                                      Select Related
                                      <br />
                                      Work Plan?
                                    </span>
                                  </div>
                                  <div className="flex gap-8 mt-2">
                                    <div className="flex flex-col items-center gap-2">
                                      <span
                                        className={`text-xs font-medium transition-colors ${
                                          isDarkMode
                                            ? "text-green-400"
                                            : "text-green-600"
                                        }`}
                                      >
                                        Yes
                                      </span>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Link to Work Plan
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                      <span
                                        className={`text-xs font-medium transition-colors ${
                                          isDarkMode
                                            ? "text-orange-400"
                                            : "text-orange-600"
                                        }`}
                                      >
                                        No
                                      </span>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Standalone Realization
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors max-w-[180px] text-center ${
                                      isDarkMode
                                        ? "bg-[#2a2a2a] text-white"
                                        : "bg-white text-black border-2 border-gray-300"
                                    }`}
                                  >
                                    Isi: Project, Title, Description,
                                    Achievements, Output Files, Actual Duration,
                                    Progress %
                                  </div>
                                  <div
                                    className={`w-0.5 h-6 transition-colors ${
                                      isDarkMode
                                        ? "bg-[#555555]"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <div
                                    className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors transform rotate-45 w-16 h-16 flex items-center justify-center ${
                                      isDarkMode
                                        ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700"
                                        : "bg-yellow-50 text-yellow-700 border border-yellow-300"
                                    }`}
                                  >
                                    <span className="transform -rotate-45 text-xs">
                                      Validasi
                                    </span>
                                  </div>
                                  <div className="flex gap-8 mt-2">
                                    <div className="flex flex-col items-center gap-2">
                                      <span
                                        className={`text-xs font-medium transition-colors ${
                                          isDarkMode
                                            ? "text-red-400"
                                            : "text-red-600"
                                        }`}
                                      >
                                        Invalid
                                      </span>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-red-900/30 text-red-300 border border-red-700"
                                            : "bg-red-50 text-red-700 border border-red-300"
                                        }`}
                                      >
                                        Show Error
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                      <span
                                        className={`text-xs font-medium transition-colors ${
                                          isDarkMode
                                            ? "text-green-400"
                                            : "text-green-600"
                                        }`}
                                      >
                                        Valid
                                      </span>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Save Work Realization
                                      </div>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Log Activity
                                      </div>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                                          isDarkMode
                                            ? "bg-[#2a2a2a] text-white"
                                            : "bg-white text-black border-2 border-gray-300"
                                        }`}
                                      >
                                        Notify Project Manager
                                      </div>
                                      <div
                                        className={`w-0.5 h-6 transition-colors ${
                                          isDarkMode
                                            ? "bg-[#555555]"
                                            : "bg-gray-300"
                                        }`}
                                      ></div>
                                      <div
                                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                          isDarkMode
                                            ? "bg-green-900/30 text-green-300 border border-green-700"
                                            : "bg-green-50 text-green-700 border border-green-300"
                                        }`}
                                      >
                                        Work Realization Created
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Final Output */}
                      <section className="mb-10 md:mb-14">
                        <h2 className="text-2xl md:text-3xl font-medium mb-3 text-left">
                          {t.finalOutput}
                        </h2>
                        <p
                          className={`text-base md:text-lg leading-loose text-justify transition-colors mb-6 ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.pgeOutput}
                        </p>
                        {selectedProjectData.images &&
                        selectedProjectData.images.length > 0 ? (
                          <div className="relative w-full mt-6">
                            <div className="relative rounded-lg overflow-hidden">
                              <img
                                src={
                                  selectedProjectData.images[currentImageIndex]
                                }
                                alt={`${
                                  selectedProjectData.title
                                } - Final Output ${currentImageIndex + 1}`}
                                className="w-full h-auto object-cover"
                              />
                              {selectedProjectData.images.length > 1 && (
                                <>
                                  <button
                                    onClick={() =>
                                      setCurrentImageIndex(
                                        (prev) =>
                                          (prev -
                                            1 +
                                            selectedProjectData.images.length) %
                                          selectedProjectData.images.length
                                      )
                                    }
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                                      isDarkMode
                                        ? "bg-black/50 hover:bg-black/70 text-white"
                                        : "bg-white/50 hover:bg-white/70 text-black"
                                    }`}
                                    aria-label="Previous image"
                                  >
                                    <ChevronLeft className="w-6 h-6" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      setCurrentImageIndex(
                                        (prev) =>
                                          (prev + 1) %
                                          selectedProjectData.images.length
                                      )
                                    }
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                                      isDarkMode
                                        ? "bg-black/50 hover:bg-black/70 text-white"
                                        : "bg-white/50 hover:bg-white/70 text-black"
                                    }`}
                                    aria-label="Next image"
                                  >
                                    <ChevronRight className="w-6 h-6" />
                                  </button>
                                </>
                              )}
                            </div>
                            {selectedProjectData.images.length > 1 && (
                              <div className="flex justify-center gap-2 mt-4">
                                {selectedProjectData.images.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-2 rounded-full transition-all ${
                                      currentImageIndex === index
                                        ? isDarkMode
                                          ? "bg-white w-8"
                                          : "bg-black w-8"
                                        : isDarkMode
                                        ? "bg-[#2a2a2a] w-2"
                                        : "bg-[#e5e5e5] w-2"
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            className={`w-full h-64 flex items-center justify-center rounded-lg border-2 border-dashed transition-colors mt-6 ${
                              isDarkMode
                                ? "border-[#2a2a2a] bg-[#0a0a0a]"
                                : "border-[#e5e5e5] bg-[#f9f9f9]"
                            }`}
                          >
                            <span
                              className={`text-sm transition-colors ${
                                isDarkMode ? "text-[#555555]" : "text-[#999999]"
                              }`}
                            >
                              Website screenshot placeholder
                            </span>
                          </div>
                        )}
                      </section>

                      {/* Tech Stack */}
                      <section className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6 text-right">
                          {t.pgeTechStackTitle}
                        </h2>
                        <div className="space-y-4">
                          <p
                            className={`text-sm md:text-base leading-relaxed text-justify transition-colors ${
                              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                            }`}
                          >
                            {t.pgeTechStack.backend}
                          </p>
                          <p
                            className={`text-sm md:text-base leading-relaxed text-justify transition-colors ${
                              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                            }`}
                          >
                            {t.pgeTechStack.frontend}
                          </p>
                          <p
                            className={`text-sm md:text-base leading-relaxed text-justify transition-colors ${
                              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                            }`}
                          >
                            {t.pgeTechStack.packages}
                          </p>
                        </div>
                      </section>
                    </article>
                  )}

                  {/* Placeholder for other projects */}
                  {selectedProject !== 1 && (
                    <div
                      className={`pt-8 border-t transition-colors ${
                        isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                      }`}
                    >
                      <p
                        className={`text-base leading-relaxed transition-colors ${
                          isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                        }`}
                      >
                        {/* Content will be added here */}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Card - All in One */}
      {!selectedProjectData && (
        <div className="pt-20 pb-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Single White Card Container */}
            <div
              className={`rounded-2xl transition-all duration-300 relative ${
                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
              }`}
            >
              {/* Language Toggle Button */}
              <button
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                className={`absolute top-6 right-20 sm:right-24 z-10 p-2.5 sm:p-3 rounded-full transition-all duration-300 hover-scale ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-[#f5f5f5] hover:bg-[#3a3a3a] active:bg-[#3a3a3a]"
                    : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5] active:bg-[#e5e5e5]"
                }`}
                aria-label="Toggle language"
              >
                <Globe size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>

              {/* Dark/Light Mode Toggle Button */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`absolute top-6 right-6 z-10 p-2.5 sm:p-3 rounded-full transition-all duration-300 hover-scale hover:rotate-180 ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-[#f5f5f5] hover:bg-[#3a3a3a] active:bg-[#3a3a3a]"
                    : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e5e5e5] active:bg-[#e5e5e5]"
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                ) : (
                  <Moon size={18} className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                )}
              </button>
              <div className="p-8 md:p-12 lg:p-16">
                {/* Hero Section */}
                <div
                  id="about"
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 pb-16 border-b mb-16 transition-colors ${
                    isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                  }`}
                >
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    <img
                      src="/profile.jpg"
                      alt="Mokhamad Dwihardik Kusuma Putra"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/160";
                      }}
                    />
                  </div>
                  {/* Hero Text */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span
                        className={`text-sm font-medium tracking-wider uppercase transition-colors ${
                          isDarkMode ? "text-[#666666]" : "text-[#999999]"
                        }`}
                      >
                        {t.bachelorDegree}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.03em] mb-4">
                      {t.hello}
                      <br />
                      <span className="font-medium">Mokhamad Dwihardik</span>
                      <br />
                      <span className="italic">Kusuma Putra</span>.
                    </h1>
                    <p
                      className={`text-lg mb-6 transition-colors ${
                        isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                      }`}
                    >
                      {t.anITEngineer.split(" ").map((word, i) =>
                        word === "IT" || word === "Engineer." ? (
                          <span key={i} className="font-medium">
                            {word}{" "}
                          </span>
                        ) : (
                          <span key={i}>{word} </span>
                        )
                      )}
                    </p>
                    <a
                      href="#contact"
                      className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover-underline hover:gap-3 ${
                        isDarkMode
                          ? "text-[#a0a0a0] hover:text-[#f5f5f5]"
                          : "text-[#666666] hover:text-[#1a1a1a]"
                      }`}
                    >
                      {t.contactMe}
                      <ArrowRight
                        size={16}
                        className="rotate-[-45deg] transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>

                {/* About Section */}
                <div
                  className={`grid md:grid-cols-12 gap-12 items-start pb-16 border-b mb-16 transition-colors ${
                    isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                  }`}
                >
                  <div className="md:col-span-4">
                    <h2 className="text-2xl md:text-3xl font-medium mb-0">
                      {t.whoAmI}
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <div
                      className={`space-y-4 transition-colors ${
                        isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                      }`}
                    >
                      <p className="text-base leading-relaxed">
                        {t.aboutText1}
                      </p>
                      <p className="text-base leading-relaxed">
                        {t.aboutText2}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience Section */}
                <div
                  id="experience"
                  className={`grid md:grid-cols-12 gap-12 items-start pb-16 border-b mb-16 transition-colors ${
                    isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                  }`}
                >
                  <div className="md:col-span-4">
                    <h2 className="text-2xl md:text-3xl font-medium mb-0">
                      {t.experience}
                    </h2>
                  </div>
                  <div className="md:col-span-8 space-y-12">
                    {/* Work Experience */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-1 h-12 transition-colors ${
                            isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]"
                          }`}
                        />
                        <div>
                          <div
                            className={`text-xs font-medium tracking-wider uppercase mb-1 transition-colors ${
                              isDarkMode ? "text-[#666666]" : "text-[#999999]"
                            }`}
                          >
                            {t.jun2025Present}
                          </div>
                          <h3 className="text-2xl font-light tracking-[-0.02em]">
                            <span className="font-medium">
                              Information Technology Engineer
                            </span>
                          </h3>
                          <p
                            className={`text-sm mt-1 transition-colors ${
                              isDarkMode ? "text-[#666666]" : "text-[#999999]"
                            }`}
                          >
                            {t.pgeCompany}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`space-y-4 pl-4 transition-colors ${
                          isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                        }`}
                      >
                        <p className="text-base leading-relaxed text-justify">
                          {t.expDesc1}
                        </p>
                        <p className="text-base leading-relaxed text-justify">
                          {t.expDesc2}
                        </p>
                        <p className="text-base leading-relaxed text-justify">
                          {t.expDesc3}
                        </p>
                      </div>
                      <div className="pt-6 pl-4">
                        <p
                          className={`text-xs font-medium tracking-wider uppercase mb-4 transition-colors ${
                            isDarkMode ? "text-[#666666]" : "text-[#999999]"
                          }`}
                        >
                          {t.techStack}
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                          {[
                            "Laravel 11",
                            "MySQL/PostgreSQL",
                            "Ubuntu Server",
                            "TrueNAS",
                            "MikroTik RouterOS",
                            "Nextcloud",
                            "Cloudflare Tunnel",
                            "cPanel",
                          ].map((tech) => (
                            <span
                              key={tech}
                              className={`text-sm font-medium transition-colors ${
                                isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div
                  id="education"
                  className={`grid md:grid-cols-12 gap-12 items-start pb-16 border-b mb-16 transition-colors ${
                    isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                  }`}
                >
                  <div className="md:col-span-4">
                    <h2 className="text-2xl md:text-3xl font-medium mb-0">
                      {t.education}
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-1 h-12 transition-colors ${
                            isDarkMode ? "bg-[#f5f5f5]" : "bg-[#1a1a1a]"
                          }`}
                        />
                        <div>
                          <div
                            className={`text-xs font-medium tracking-wider uppercase mb-1 transition-colors ${
                              isDarkMode ? "text-[#666666]" : "text-[#999999]"
                            }`}
                          >
                            {t.aug2020_2024}
                          </div>
                          <h3 className="text-2xl font-light tracking-[-0.02em]">
                            <span className="font-medium">D4</span>, Information
                            Technology
                          </h3>
                          <p
                            className={`text-sm mt-1 transition-colors ${
                              isDarkMode ? "text-[#666666]" : "text-[#999999]"
                            }`}
                          >
                            {t.statePolytechnicMalang}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 pl-4">
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                          }`}
                        >
                          {t.gpa}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured Work Section */}
                <div
                  id="work"
                  className={`pb-16 border-b mb-16 transition-colors ${
                    isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium">
                      {t.selectedWork}
                    </h2>
                    <span
                      className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                        isDarkMode ? "text-[#666666]" : "text-[#999999]"
                      }`}
                    >
                      {t.projects}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {getProjects().map((project, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedProject(index)}
                        className="group block hover-lift w-full text-left"
                      >
                        <div className="space-y-4">
                          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#1a1a1a] dark:bg-[#0a0a0a]">
                            <img
                              src={project.images?.[0] || project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                                  isDarkMode
                                    ? "text-[#666666]"
                                    : "text-[#999999]"
                                }`}
                              >
                                {project.category}
                              </span>
                              <ArrowRight
                                size={16}
                                className={`transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110 ${
                                  isDarkMode
                                    ? "text-[#666666] group-hover:text-[#f5f5f5]"
                                    : "text-[#999999] group-hover:text-[#1a1a1a]"
                                }`}
                              />
                            </div>
                            <h3 className="text-lg font-light tracking-[-0.02em]">
                              {project.title.split(" ").map((word, i, arr) => {
                                if (i === 0) {
                                  return (
                                    <span key={i} className="font-medium">
                                      {word}
                                    </span>
                                  );
                                } else if (i === arr.length - 1) {
                                  return (
                                    <span key={i}>
                                      {" "}
                                      <span className="italic">{word}</span>
                                    </span>
                                  );
                                }
                                return <span key={i}> {word}</span>;
                              })}
                            </h3>
                            <p
                              className={`text-sm leading-relaxed transition-colors ${
                                isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                              }`}
                            >
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Section */}
                <div
                  id="skills"
                  className={`pb-16 border-b mb-16 transition-colors ${
                    isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                  }`}
                >
                  <h2 className="text-2xl md:text-3xl font-medium mb-8">
                    {t.expertise}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {getSkills().map((skillSet, index) => (
                      <div
                        key={index}
                        className="space-y-4 hover-lift p-4 rounded-lg transition-all duration-300"
                      >
                        <h3 className="text-lg font-light tracking-[-0.01em] transition-colors duration-300">
                          {skillSet.category.split(" ").map((word, i) => {
                            if (i === 0) {
                              return (
                                <span key={i} className="font-medium">
                                  {word}
                                </span>
                              );
                            }
                            return <span key={i}> {word}</span>;
                          })}
                        </h3>
                        <ul className="space-y-2">
                          {skillSet.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className={`text-sm leading-relaxed transition-all duration-300 hover:translate-x-2 hover:scale-105 cursor-default ${
                                isDarkMode
                                  ? "text-[#a0a0a0] hover:text-[#f5f5f5]"
                                  : "text-[#666666] hover:text-[#1a1a1a]"
                              }`}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div
                  id="contact"
                  className={`text-center pb-16 border-b mb-16 transition-colors ${
                    isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                  }`}
                >
                  <h2 className="text-2xl md:text-3xl font-medium mb-4">
                    {t.letsBuild.split(" ").map((word, i) =>
                      word === "powerful" ? (
                        <span key={i} className="italic">
                          {word}{" "}
                        </span>
                      ) : (
                        <span key={i}>{word} </span>
                      )
                    )}
                  </h2>
                  <p
                    className={`text-base mb-6 leading-relaxed transition-colors max-w-2xl mx-auto ${
                      isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                    }`}
                  >
                    {t.contactDesc}
                  </p>
                  <a
                    href="mailto:ddiko105@gmail.com"
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover-lift hover:gap-4 ${
                      isDarkMode
                        ? "bg-[#f5f5f5] text-[#0a0a0a] hover:bg-[#e5e5e5]"
                        : "bg-[#1a1a1a] text-[#fafafa] hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <Mail
                      size={16}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    {t.getInTouch}
                  </a>
                </div>

                {/* Footer */}
                <div className="pt-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      <div className="text-3xl md:text-4xl font-medium">
                        <span>Mokhamad</span>
                      </div>
                      <div className="text-3xl md:text-4xl font-medium">
                        <span>Dwihardik</span>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <a
                        href="#"
                        className={`transition-all duration-300 hover-scale hover:rotate-12 ${
                          isDarkMode
                            ? "text-[#666666] hover:text-[#f5f5f5]"
                            : "text-[#999999] hover:text-[#1a1a1a]"
                        }`}
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-all duration-300 hover-scale hover:rotate-12 ${
                          isDarkMode
                            ? "text-[#666666] hover:text-[#f5f5f5]"
                            : "text-[#999999] hover:text-[#1a1a1a]"
                        }`}
                      >
                        <Linkedin size={18} />
                      </a>
                      <a
                        href="mailto:ddiko105@gmail.com"
                        className={`transition-all duration-300 hover-scale hover:rotate-12 ${
                          isDarkMode
                            ? "text-[#666666] hover:text-[#f5f5f5]"
                            : "text-[#999999] hover:text-[#1a1a1a]"
                        }`}
                      >
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                  <div
                    className={`pt-6 border-t transition-colors ${
                      isDarkMode ? "border-[#2a2a2a]" : "border-[#e5e5e5]"
                    }`}
                  >
                    <p
                      className={`text-xs text-center transition-colors ${
                        isDarkMode ? "text-[#666666]" : "text-[#999999]"
                      }`}
                    >
                      {t.copyright}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
