import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Download,
  Calendar,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Auto slideshow for featured project images
  useEffect(() => {
    const featuredProject = projects.find(p => p.featured);
    if (featuredProject && featuredProject.images && featuredProject.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % featuredProject.images.length
        );
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const projects = [
    {
      title: "PT Puri Ganesha Engineering - Corporate Website",
      description:
        "Full-stack corporate website for leading Indonesian engineering consultancy. Features include project portfolio showcase, multi-portal system (Admin, Monitoring, Inventory), and comprehensive service presentation. Built with modern web technologies for optimal performance.",
      images: [
        "/pge-hero.png",
        "/pge-project.png",
        "/pge-aboutus.png"
      ],
      tags: ["React", "Full-Stack", "Corporate Website", "Engineering"],
      link: "https://pg-engineering.com",
      featured: true,
    },
    {
      title: "IT Infrastructure Management",
      description:
        "Implementing and managing comprehensive IT infrastructure for engineering operations, ensuring seamless system performance and reliability.",
      image:
        "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["IT Infrastructure", "System Management", "Network Admin"],
      link: "#",
      featured: false,
    },
    {
      title: "Product Photography Portfolio",
      description:
        "Professional product photography and editing for wooden furniture collections, creating stunning visual content for marketing campaigns.",
      image:
        "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Photography", "Photo Editing", "Adobe Suite"],
      link: "#",
      featured: false,
    },
    {
      title: "Digital Marketing Campaigns",
      description:
        "Strategic digital marketing initiatives and social media management, driving brand awareness and engagement across multiple platforms.",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Social Media", "Content Strategy", "SEO"],
      link: "#",
      featured: false,
    },
  ];

  const skills = [
    {
      category: "Information Technology",
      items: [
        "IT Infrastructure",
        "Computer Information Systems",
        "System Administration",
        "Network Management",
        "Technical Support",
      ],
    },
    {
      category: "Digital Marketing",
      items: [
        "Social Media Marketing",
        "Content Strategy",
        "SEO",
        "Brand Management",
        "Campaign Planning",
      ],
    },
    {
      category: "Creative",
      items: [
        "Photography",
        "Photo Editing",
        "Adobe Photoshop",
        "Adobe Lightroom",
        "Visual Design",
      ],
    },
    {
      category: "Technical Skills",
      items: [
        "Windows Server",
        "Linux",
        "Microsoft Office",
        "Google Workspace",
        "Project Management",
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-xl z-50 border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-black/80 border-white/10"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-xl font-semibold tracking-tight">
              Portfolio
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#experience"
                className={`text-sm transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Pengalaman
              </a>
              <a
                href="#work"
                className={`text-sm transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Portfolio
              </a>
              <a
                href="#skills"
                className={`text-sm transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Keahlian
              </a>
              <a
                href="#contact"
                className={`text-sm transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Kontak
              </a>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-xl border-b transition-colors duration-300 ${
              isDarkMode
                ? "bg-black/95 border-white/10"
                : "bg-white/95 border-gray-200"
            }`}
          >
            <div className="px-6 py-4 space-y-3">
              <a
                href="#experience"
                className={`block transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Pengalaman
              </a>
              <a
                href="#work"
                className={`block transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Portfolio
              </a>
              <a
                href="#skills"
                className={`block transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Keahlian
              </a>
              <a
                href="#contact"
                className={`block transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Kontak
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Profile */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative animate-slide-right">
                <div
                  className={`w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    isDarkMode ? "border-white/10" : "border-gray-200"
                  }`}
                >
                  <img
                    src="/profile.jpg"
                    alt="Mokhamad Dwihardik Kusuma Putra"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-6 animate-fade-in order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-2">
                <p className="text-blue-400 font-medium tracking-wide uppercase text-sm">
                  Information Technology Engineer
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  Mokhamad Dwihardik Kusuma Putra
                </h1>
                <p
                  className={`text-xl transition-colors ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  IT Engineer
                </p>
              </div>

              <p
                className={`text-lg leading-relaxed max-w-xl transition-colors ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Passionate IT professional with expertise in information
                technology infrastructure, system administration, and network
                management. Experienced in delivering innovative IT solutions
                and managing end-to-end IT systems.
              </p>

              {/* Quick Info */}
              <div className="space-y-2 pt-4">
                <div
                  className={`flex items-center gap-3 justify-center lg:justify-start transition-colors ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <MapPin size={18} className="text-blue-400" />
                  <span>Bandung, Indonesia</span>
                </div>
                <div
                  className={`flex items-center gap-3 justify-center lg:justify-start transition-colors ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Mail size={18} className="text-blue-400" />
                  <span>ddiko105@gmail.com</span>
                </div>
                <div
                  className={`flex items-center gap-3 justify-center lg:justify-start transition-colors ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Phone size={18} className="text-blue-400" />
                  <span>087856324656</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4 justify-center lg:justify-start animate-fade-in animate-delay-200">
                <a
                  href="#"
                  className={`p-3 border rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDarkMode
                      ? "border-white/20 hover:bg-white/5 hover:border-white/40 hover:shadow-lg"
                      : "border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-lg"
                  }`}
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 border rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDarkMode
                      ? "border-white/20 hover:bg-white/5 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20"
                      : "border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20"
                  }`}
                >
                  <Linkedin
                    size={20}
                    className="hover:text-blue-400 transition-colors"
                  />
                </a>
                <a
                  href="mailto:ddiko105@gmail.com"
                  className={`p-3 border rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isDarkMode
                      ? "border-white/20 hover:bg-white/5 hover:border-white/40 hover:shadow-lg"
                      : "border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-lg"
                  }`}
                >
                  <Mail size={20} />
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 justify-center lg:justify-start animate-fade-in animate-delay-300">
                <a
                  href="#work"
                  className={`px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200 hover:shadow-white/20"
                      : "bg-black text-white hover:bg-gray-800 hover:shadow-black/20"
                  }`}
                >
                  Lihat Portfolio
                </a>
                <a
                  href="#contact"
                  className={`px-8 py-4 border rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "border-white/20 hover:bg-white/5 hover:border-white/40"
                      : "border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  Hubungi Saya
                </a>
                <button className="px-8 py-4 border border-blue-400/50 text-blue-400 rounded-full font-medium hover:bg-blue-400/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/30 inline-flex items-center gap-2">
                  <Download size={18} />
                  Unduh CV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
          <a href="#experience" className="block">
            <ChevronDown
              size={32}
              className={`transition-all duration-300 hover:scale-125 ${
                isDarkMode
                  ? "text-gray-600 hover:text-blue-400"
                  : "text-gray-400 hover:text-blue-500"
              }`}
            />
          </a>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section
        id="experience"
        className={`py-32 px-6 transition-colors ${
          isDarkMode ? "bg-zinc-950" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Pengalaman & Pendidikan
            </h2>
            <p
              className={`text-lg transition-colors ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Perjalanan profesional dan latar belakang akademis saya
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Work Experience */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase size={24} className="text-blue-400" />
                <h3 className="text-2xl font-semibold">Pengalaman Kerja</h3>
              </div>

              <div className="space-y-8">
                <div
                  className={`relative pl-8 border-l-2 pb-8 transition-colors ${
                    isDarkMode ? "border-white/10" : "border-gray-300"
                  }`}
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-400"></div>
                  <div className="space-y-2">
                    <div
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Calendar size={16} />
                      <span>Jun 2025 - Present</span>
                    </div>
                    <h4 className="text-xl font-semibold">
                      Information Technology Engineer
                    </h4>
                    <p className="text-blue-400">
                      PT Puri Ganesha Engineering · Contract
                    </p>
                    <p
                      className={`leading-relaxed transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Managing IT infrastructure and systems, implementing
                      technology solutions, and providing technical support for
                      engineering operations. Working on-site in Bandung, West
                      Java.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        IT Infrastructure
                      </span>
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Computer Information Systems
                      </span>
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        IT
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`relative pl-8 border-l-2 pb-8 transition-colors ${
                    isDarkMode ? "border-white/10" : "border-gray-300"
                  }`}
                >
                  <div
                    className={`absolute -left-2 top-0 w-4 h-4 rounded-full transition-colors ${
                      isDarkMode ? "bg-zinc-600" : "bg-gray-400"
                    }`}
                  ></div>
                  <div className="space-y-2">
                    <div
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Calendar size={16} />
                      <span>Feb 2025 - Jun 2025</span>
                    </div>
                    <h4 className="text-xl font-semibold">
                      Photography Editor
                    </h4>
                    <p className="text-blue-400">WOF Wooden · Contract</p>
                    <p
                      className={`leading-relaxed transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Specialized in photo editing and visual content creation
                      for wooden furniture products. Managed photography
                      projects and enhanced product images for marketing
                      materials. Based in Malang, East Java.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Photography
                      </span>
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Photo Editing
                      </span>
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Visual Content
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`relative pl-8 border-l-2 transition-colors ${
                    isDarkMode ? "border-white/10" : "border-gray-300"
                  }`}
                >
                  <div
                    className={`absolute -left-2 top-0 w-4 h-4 rounded-full transition-colors ${
                      isDarkMode ? "bg-zinc-600" : "bg-gray-400"
                    }`}
                  ></div>
                  <div className="space-y-2">
                    <div
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Calendar size={16} />
                      <span>Jul 2023 - Dec 2023</span>
                    </div>
                    <h4 className="text-xl font-semibold">
                      Digital Marketing Specialist
                    </h4>
                    <p className="text-blue-400">Incbuss Creative · Contract</p>
                    <p
                      className={`leading-relaxed transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Developed and executed digital marketing strategies,
                      managed social media campaigns, and created engaging
                      content. Focused on brand growth and online presence
                      optimization in Malang, East Java.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Digital Marketing
                      </span>
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Social Media
                      </span>
                      <span
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          isDarkMode
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Photography
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={24} className="text-blue-400" />
                <h3 className="text-2xl font-semibold">Pendidikan</h3>
              </div>

              <div className="space-y-8">
                <div
                  className={`p-6 rounded-2xl border transition-colors ${
                    isDarkMode
                      ? "bg-zinc-900 border-white/10"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Calendar size={16} />
                      <span>Aug 2020 - 2024</span>
                    </div>
                    <h4 className="text-xl font-semibold">
                      D4, Information Technology
                    </h4>
                    <p className="text-blue-400">Politeknik Negeri Malang</p>
                    <p
                      className={`leading-relaxed transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Specialized in Information Technology with focus on system
                      development, infrastructure management, and software
                      engineering.
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <span
                        className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                          isDarkMode
                            ? "bg-blue-500/10 border-blue-400/30 text-blue-400"
                            : "bg-blue-50 border-blue-300 text-blue-600"
                        }`}
                      >
                        GPA: 3.42
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award size={24} className="text-blue-400" />
                    <h3 className="text-2xl font-semibold">
                      Skills & Expertise
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-xl border transition-colors ${
                        isDarkMode
                          ? "bg-zinc-900 border-white/10"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <div className="space-y-2">
                        <h4 className="font-semibold">
                          Information Technology
                        </h4>
                        <p
                          className={`text-sm transition-colors ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          IT Infrastructure, Computer Information Systems,
                          System Management
                        </p>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl border transition-colors ${
                        isDarkMode
                          ? "bg-zinc-900 border-white/10"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <div className="space-y-2">
                        <h4 className="font-semibold">Digital Marketing</h4>
                        <p
                          className={`text-sm transition-colors ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Social Media Marketing, Content Strategy, Brand
                          Management
                        </p>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl border transition-colors ${
                        isDarkMode
                          ? "bg-zinc-900 border-white/10"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <div className="space-y-2">
                        <h4 className="font-semibold">Creative Content</h4>
                        <p
                          className={`text-sm transition-colors ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Photography, Photo Editing, Visual Design
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section
        id="work"
        className={`py-32 px-6 transition-colors ${
          isDarkMode ? "bg-zinc-950" : "bg-gray-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Portfolio Pekerjaan
            </h2>
            <p
              className={`text-lg transition-colors ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Proyek-proyek terpilih yang menunjukkan keahlian saya
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-scale-in animate-delay-${
                  index * 100
                } ${
                  project.featured
                    ? isDarkMode
                      ? "md:col-span-2 bg-gradient-to-br from-blue-950/50 to-zinc-900 border-blue-400/30 hover:border-blue-400/60 hover:shadow-blue-400/20"
                      : "md:col-span-2 bg-gradient-to-br from-blue-50 to-white border-blue-400 hover:border-blue-500 hover:shadow-blue-400/30"
                    : isDarkMode
                    ? "bg-zinc-900 border-white/10 hover:border-blue-400/50 hover:shadow-blue-400/10"
                    : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-blue-400/20"
                }`}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse">
                      ⭐ Featured Work
                    </span>
                  </div>
                )}
                <div
                  className={`${project.featured ? "md:flex md:flex-row" : ""}`}
                >
                  <div
                    className={`${
                      project.featured ? "md:w-1/2" : ""
                    } aspect-video overflow-hidden relative`}
                  >
                    {project.featured && project.images ? (
                      // Featured project with slideshow
                      <>
                        {project.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${project.title} - Preview ${imgIndex + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ${
                              imgIndex === currentImageIndex 
                                ? 'opacity-100 z-10' 
                                : 'opacity-0 z-0'
                            }`}
                          />
                        ))}
                        {/* Slideshow indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                          {project.images.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={() => setCurrentImageIndex(imgIndex)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                imgIndex === currentImageIndex
                                  ? 'bg-blue-500 w-8'
                                  : 'bg-white/50 hover:bg-white/80'
                              }`}
                              aria-label={`Go to slide ${imgIndex + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      // Regular project with single image
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div
                    className={`p-6 space-y-4 ${
                      project.featured ? "md:w-1/2 md:p-8" : ""
                    }`}
                  >
                    <h3
                      className={`font-semibold ${
                        project.featured ? "text-3xl" : "text-2xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`leading-relaxed transition-colors ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                            project.featured
                              ? "bg-blue-500/10 border-blue-400/30 text-blue-400"
                              : isDarkMode
                              ? "bg-white/5 border-white/10"
                              : "bg-gray-100 border-gray-300"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target={project.link !== "#" ? "_blank" : "_self"}
                      rel={project.link !== "#" ? "noopener noreferrer" : ""}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        project.featured
                          ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-400/30"
                          : "text-blue-400 hover:text-blue-300"
                      }`}
                    >
                      {project.featured ? "Kunjungi Website" : "Lihat Detail"}{" "}
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Keahlian & Kompetensi
            </h2>
            <p
              className={`text-lg transition-colors ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Teknologi dan tools yang saya kuasai
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillSet, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-slide-up animate-delay-${
                  index * 100
                } ${
                  isDarkMode
                    ? "bg-zinc-900 border-white/10 hover:border-blue-400/50 hover:bg-zinc-800/50"
                    : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-blue-400/20"
                }`}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  {skillSet.category}
                </h3>
                <ul className="space-y-2">
                  {skillSet.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`transition-all duration-300 hover:translate-x-2 hover:text-blue-400 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-32 px-6 transition-colors ${
          isDarkMode ? "bg-zinc-950" : "bg-gray-50"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Mari Bekerja Sama
          </h2>
          <p
            className={`text-lg mb-12 leading-relaxed transition-colors ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Punya proyek atau ide menarik? Saya terbuka untuk diskusi mengenai
            peluang kolaborasi dan proyek baru. Mari kita ciptakan sesuatu yang
            luar biasa bersama-sama!
          </p>
          <a
            href="mailto:ddiko105@gmail.com"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <Mail size={20} className="animate-bounce" />
            Kirim Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-6 border-t transition-colors ${
          isDarkMode ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className={`text-sm transition-colors ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © 2025 Mokhamad Dwihardik Kusuma Putra. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className={`transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mokhamad-dwihardik-kusuma-putra-470854190/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:ddiko105@gmail.com"
                className={`transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
