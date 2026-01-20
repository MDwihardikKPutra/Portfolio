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
  expDesc4: string;
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
  project4Category: string;
  project4Desc: string;
  dataAnalystProjectTitle: string;
  dataAnalystProjectRole: string;
  dataAnalystProjectTools: string;
  executiveSummary: string;
  projectObjective: string;
  dataAnalystExecutiveSummary: string;
  dataAnalystObjective1: string;
  dataAnalystObjective2: string;
  dataAnalystObjective3: string;
  dataAnalystObjective4: string;
  dataAnalystDataEngineeringProcessTitle: string;
  dataAnalystDataEngineeringProcess1: string;
  dataAnalystDataEngineeringProcess2: string;
  dataAnalystDataEngineeringProcess3: string;
  dataAnalystKeyInsightsResultsTitle: string;
  dataAnalystInsightARiskTitle: string;
  dataAnalystInsightARiskFindings: string;
  dataAnalystInsightARiskAnalysis: string;
  dataAnalystInsightBMarketTitle: string;
  dataAnalystInsightBMarketFindings: string;
  dataAnalystInsightBMarketAnalysis: string;
  dataAnalystInsightCWholesaleTitle: string;
  dataAnalystInsightCWholesaleFindings: string;
  dataAnalystInsightCWholesaleAnalysis: string;
  dataAnalystInsightDFinancialTitle: string;
  dataAnalystInsightDFinancialFindings: string;
  dataAnalystInsightDFinancialAnalysis: string;
  dataAnalystBusinessRecommendationsTitle: string;
  dataAnalystRecommendation1: string;
  dataAnalystRecommendation2: string;
  dataAnalystRecommendation3: string;
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
      "I completed my studies in Informatics Engineering at the State Polytechnic of Malang, earning a D4 degree in 2024 with a GPA of 3.42. Alongside my academic journey, I cultivate a strong passion for photography, which plays a significant role in shaping my creative direction and professional interests. I also write essays, exploring various topics that complement my technical expertise and creative pursuits.",
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
    informationTechnologyEngineer: "IT Officer",
    pgeCompany: "PT Puri Ganesha Engineering",
    jun2025Present: "Jun 2025 - Present",
    d4InformationTechnology: "D4, Information Technology",
    aug2020_2024: "AUG 2020 - 2024",
    statePolytechnicMalang: "State Polytechnic of Malang",
    gpa: "GPA: 3.42",
    expDesc1:
      "Designed and deployed PGE System (v1.10.0), a comprehensive Integrated Management Platform managing critical office workflows.",
    expDesc2:
      "Network Engineering using RouterOS (MikroTik), including traffic shaping, Hotspot solutions, VLAN segmentation, and advanced routing configurations.",
    expDesc3:
      "Server Administration using Ubuntu for local web deployment, and Data Storage Server management using Synology NAS.",
    expDesc4: "Network Administration using RouterOS (MikroTik).",
    wofWoodenCompany: "Elux Space",
    wofWoodenPosition: "UI/UX Internship",
    wofWoodenDate: "Aug 2023 - Feb 2024",
    wofWoodenDesc1:
      "Contributed to the design and development of user interfaces (UI) and user experiences (UX) for various digital products.",
    wofWoodenDesc2:
      "Assisted in conducting user research, creating wireframes, prototypes, and mockups.",
    wofWoodenDesc3:
      "Collaborated with cross-functional teams to ensure a user-centered design approach and translate concepts into intuitive designs.",
    techStack: "Tech Stack",
    project1Category: "Corporate Website",
    project1Desc:
      "Full-stack corporate website for leading Indonesian engineering consultancy.",
    project2Category: "Enterprise Platform",
    project2Desc:
      "Integrated Management Platform for managing critical office workflows.",
    project3Category: "System Management",
    project3Desc:
      "Configured and maintained enterprise-scale network infrastructure using MikroTik (RouterOS), focusing on Traffic Shaping, IP Traffic Management, and Hotspot authentication. Managed wireless infrastructure and access points via the UniFi Controller (Ubiquiti) to ensure stable and secure connectivity. Executed advanced network designs including VLAN segmentation and internal routing protocols.",
    project4Category: "Data Analysis & Strategy",
    project4Desc: "E-Commerce Data Strategy: Market Insights & Payment Risk Analysis 2024-2025",
    dataAnalystProjectTitle: "E-Commerce Data Strategy",
    dataAnalystProjectRole: "Role: System Analyst & Data Engineer",
    dataAnalystProjectTools: "Tools: Python (Pandas), Google Colab, Tabulate",
    executiveSummary: "Executive Summary",
    projectObjective: "Project Objective",
    dataAnalystExecutiveSummary:
      "This project analyzes a 20,848-row e-commerce transaction dataset to identify customer shopping behavior and operational risks. The main issues addressed are the high cancellation rates for certain payment methods and market potential mapping based on geographical regions to improve marketing and logistics strategy efficiency.",
    dataAnalystObjective1:
      "Analyze the correlation between Payment Methods and Order Cancellation Rates.",
    dataAnalystObjective2:
      "Identify Provinces with the largest payment contribution for market mapping.",
    dataAnalystObjective3:
      "Find product categories most frequently purchased in Bulk (High Quantity).",
    dataAnalystObjective4:
      "Evaluate the impact of Shipping Costs on total buyer expenditure.",
    dataAnalystDataEngineeringProcessTitle: "3. Data Engineering Process (The \"How\")",
    dataAnalystDataEngineeringProcess1:
      "Before analysis, raw data was cleaned through several technical stages:",
    dataAnalystDataEngineeringProcess2:
      "Data Splitting: Breaking down the product_categories column containing multi-categories into single rows so that each category is accurately counted (Explode logic).",
    dataAnalystDataEngineeringProcess3:
      "Data Standardization: Standardizing the writing of province names and product categories. Feature Engineering: Creating new columns Cancellation Rate (%) and grouping order statuses into 'Completed' vs 'Cancelled'.",
    dataAnalystKeyInsightsResultsTitle: "4. Key Insights & Results",
    dataAnalystInsightARiskTitle: "A. Payment Risk Analysis",
    dataAnalystInsightARiskFindings:
      "Findings: Payment methods via Indomaret/i.Saku and Alfamart have the highest cancellation rates (reaching ~48%).",
    dataAnalystInsightARiskAnalysis:
      "Analysis: This indicates that Over-the-Counter methods carry a significant ghosting risk compared to digital methods.",
    dataAnalystInsightBMarketTitle: "B. Regional Market Dominance",
    dataAnalystInsightBMarketFindings:
      "Findings: [Mention Top Province Name from Your SS] province contributes the highest revenue.",
    dataAnalystInsightBMarketAnalysis:
      "Analysis: Market concentration is still very strong in this region, indicating the need for stock optimization in the nearest regional warehouse.",
    dataAnalystInsightCWholesaleTitle: "C. Favorite Wholesale Products",
    dataAnalystInsightCWholesaleFindings:
      "Findings: [Mention Top Category from Your SS] category is purchased with the highest average quantity per transaction.",
    dataAnalystInsightCWholesaleAnalysis:
      "Analysis: This product has Reseller-friendly characteristics, suitable for \"Buy More Save More\" campaigns.",
    dataAnalystInsightDFinancialTitle: "D. Financial Impact (Shipping & Discounts)",
    dataAnalystInsightDFinancialFindings:
      "Findings: The average shipping cost paid by buyers is [Fill Number from SS], which contributes [Fill %] to the total expenditure.",
    dataAnalystInsightDFinancialAnalysis:
      "Analysis: Shipping costs are still a major consideration factor for buyers.",
    dataAnalystBusinessRecommendationsTitle: "5. Business Recommendations",
    dataAnalystRecommendation1:
      "Payment Optimization: Provide incentives such as small discounts or coins for digital payment users (ShopeePay/SeaBank) to shift customers away from high-risk Indomaret/Alfamart methods.",
    dataAnalystRecommendation2:
      "Logistics Strategy: Consider a transit warehouse in the [Top Province] region to reduce shipping costs that currently burden buyers.",
    dataAnalystRecommendation3:
      "Product Campaigns: Create special bundling packages for wholesale product categories to increase average transaction value (Basket Size).",
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
      "Saya menyelesaikan pendidikan di Teknik Informatika di Politeknik Negeri Malang, meraih gelar D4 pada tahun 2024 dengan IPK 3.42. Seiring dengan perjalanan akademik saya, saya mengembangkan minat yang kuat terhadap fotografi, yang memainkan peran penting dalam membentuk arah kreatif dan minat profesional saya. Saya juga menulis essay, mengeksplorasi berbagai topik yang melengkapi keahlian teknis dan minat kreatif saya.",
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
    informationTechnologyEngineer: "IT Officer",
    pgeCompany: "PT Puri Ganesha Engineering",
    jun2025Present: "Jun 2025 - Sekarang",
    d4InformationTechnology: "D4, Teknik Informatika",
    aug2020_2024: "AGU 2020 - 2024",
    statePolytechnicMalang: "Politeknik Negeri Malang",
    gpa: "IPK: 3.42",
    expDesc1:
      "Merancang dan menerapkan Sistem PGE (v1.10.0), Platform Manajemen Terintegrasi komprehensif yang mengelola alur kerja kantor yang kritis.",
    expDesc2:
      "Network Engineering menggunakan RouterOS (MikroTik), termasuk traffic shaping, solusi Hotspot, segmentasi VLAN, dan konfigurasi routing tingkat lanjut.",
    expDesc3:
      "Administrasi Server menggunakan Ubuntu untuk deployment web lokal, serta pengelolaan Data Storage Server menggunakan Synology NAS.",
    expDesc4: "Administrasi Jaringan menggunakan RouterOS (MikroTik).",
    wofWoodenCompany: "Elux Space",
    wofWoodenPosition: "UI/UX Internship",
    wofWoodenDate: "Agu 2023 - Feb 2024",
    wofWoodenDesc1:
      "Berkontribusi pada desain dan pengembangan antarmuka pengguna (UI) dan pengalaman pengguna (UX) untuk berbagai produk digital.",
    wofWoodenDesc2:
      "Membantu dalam melakukan riset pengguna, membuat wireframe, prototipe, dan mockup.",
    wofWoodenDesc3:
      "Berkolaborasi dengan tim lintas fungsi untuk memastikan pendekatan desain yang berpusat pada pengguna dan menerjemahkan konsep menjadi desain yang intuitif.",
    techStack: "Tech Stack",
    project1Category: "Website Perusahaan",
    project1Desc:
      "Website perusahaan full-stack untuk konsultan teknik terkemuka di Indonesia.",
    project2Category: "Platform Enterprise",
    project2Desc:
      "Integrated Management Platform untuk mengelola alur kerja kantor yang kritis.",
    project3Category: "Manajemen Sistem",
    project3Desc:
      "Mengkonfigurasi dan memelihara infrastruktur jaringan skala enterprise menggunakan MikroTik (RouterOS), dengan fokus pada Traffic Shaping, Manajemen Lalu Lintas IP, dan autentikasi Hotspot. Mengelola infrastruktur nirkabel dan access point melalui UniFi Controller (Ubiquiti) untuk memastikan konektivitas yang stabil dan aman. Mengeksekusi desain jaringan canggih termasuk segmentasi VLAN dan protokol routing internal.",
    project4Category: "Analisis & Strategi Data",
    project4Desc: "Strategi Data E-Commerce: Analisis Risiko Pembayaran & Wawasan Pasar 2024-2025",
    dataAnalystProjectTitle: "E-Commerce Market Insights & Payment Risk Analysis 2024-2025",
    dataAnalystProjectRole: "Peran: System Analyst & Data Engineer",
    dataAnalystProjectTools: "Alat: Python (Pandas), Google Colab, Tabulate",
    executiveSummary: "Ringkasan Eksekutif",
    projectObjective: "Tujuan Proyek",
    dataAnalystExecutiveSummary:
      "Proyek ini menganalisis dataset transaksi e-commerce sebesar 20.848 baris untuk mengidentifikasi perilaku belanja pelanggan dan risiko operasional. Masalah utama yang dibedah adalah tingginya angka pembatalan pada metode pembayaran tertentu dan pemetaan potensi pasar berdasarkan wilayah geografis guna meningkatkan efisiensi strategi marketing dan logistik.",
    dataAnalystObjective1:
      "Menganalisis korelasi antara Metode Pembayaran dengan Tingkat Pembatalan Pesanan.",
    dataAnalystObjective2:
      "Mengidentifikasi Provinsi dengan kontribusi pembayaran terbesar untuk pemetaan pasar.",
    dataAnalystObjective3:
      "Menemukan kategori produk yang paling sering dibeli secara Grosir (High Quantity).",
    dataAnalystObjective4:
      "Mengevaluasi dampak Biaya Ongkos Kirim terhadap total pengeluaran pembeli.",
    dataAnalystDataEngineeringProcessTitle: "3. Proses Rekayasa Data (The \"How\")",
    dataAnalystDataEngineeringProcess1:
      "Sebelum analisis dilakukan, data mentah dibersihkan melalui beberapa tahap teknis:",
    dataAnalystDataEngineeringProcess2:
      "Data Splitting: Memecah kolom product_categories yang berisi multi-kategori menjadi baris tunggal agar setiap kategori terhitung secara akurat (Explode logic).",
    dataAnalystDataEngineeringProcess3:
      "Data Standardization: Menyeragamkan penulisan nama provinsi dan kategori produk. Feature Engineering: Membuat kolom baru Tingkat Pembatalan (%) dan mengelompokkan status pesanan menjadi 'Selesai' vs 'Batal'.",
    dataAnalystKeyInsightsResultsTitle: "4. Wawasan Utama & Hasil",
    dataAnalystInsightARiskTitle: "A. Analisis Risiko Pembayaran",
    dataAnalystInsightARiskFindings:
      "Temuan: Metode pembayaran melalui Indomaret/i.Saku dan Alfamart memiliki tingkat pembatalan tertinggi (mencapai ~48%).",
    dataAnalystInsightARiskAnalysis:
      "Analisis: Hal ini menunjukkan bahwa metode Over-the-Counter memiliki risiko ghosting yang besar dibandingkan metode digital.",
    dataAnalystInsightBMarketTitle: "B. Dominasi Pasar Regional",
    dataAnalystInsightBMarketFindings:
      "Temuan: Provinsi [Sebutkan Nama Provinsi Teratas dari SS Anda] memberikan kontribusi pendapatan tertinggi.",
    dataAnalystInsightBMarketAnalysis:
      "Analisis: Konsentrasi pasar masih sangat kuat di wilayah ini, menunjukkan perlunya optimasi stok di gudang regional terdekat.",
    dataAnalystInsightCWholesaleTitle: "C. Produk Favorit Grosir",
    dataAnalystInsightCWholesaleFindings:
      "Temuan: Kategori [Sebutkan Kategori Teratas dari SS Anda] dibeli dengan rata-rata kuantitas tertinggi per transaksi.",
    dataAnalystInsightCWholesaleAnalysis:
      "Analisis: Produk ini memiliki karakteristik Reseller-friendly, cocok untuk kampanye \"Beli Banyak Lebih Murah\".",
    dataAnalystInsightDFinancialTitle: "D. Dampak Finansial (Ongkir & Diskon)",
    dataAnalystInsightDFinancialFindings:
      "Temuan: Rata-rata beban ongkir yang dibayar pembeli adalah [Isi Angka dari SS], yang berkontribusi sebesar [Isi %] terhadap total belanja.",
    dataAnalystInsightDFinancialAnalysis:
      "Analisis: Biaya pengiriman masih menjadi faktor pertimbangan besar bagi pembeli.",
    dataAnalystBusinessRecommendationsTitle: "5. Rekomendasi Bisnis",
    dataAnalystRecommendation1:
      "Optimasi Pembayaran: Memberikan insentif berupa diskon kecil atau koin bagi pengguna metode digital (ShopeePay/SeaBank) untuk mengalihkan pelanggan dari metode Indomaret/Alfamart yang berisiko batal tinggi.",
    dataAnalystRecommendation2:
      "Strategi Logistik: Mempertimbangkan gudang transit di wilayah [Provinsi Teratas] untuk menekan biaya ongkir yang saat ini masih membebani pembeli.",
    dataAnalystRecommendation3:
      "Kampanye Produk: Membuat paket bundling khusus untuk kategori produk grosir guna meningkatkan nilai transaksi rata-rata (Basket Size).",
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


