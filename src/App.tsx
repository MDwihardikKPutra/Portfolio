import { Github, Linkedin, Mail, ArrowRight, Menu, X, User, Briefcase, FolderKanban, Code, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState({ x: 24, y: 80 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Update sidebar position to follow button and stay within viewport
  useEffect(() => {
    const sidebarWidth = 200;
    const sidebarHeight = 250; // approximate height
    const buttonHeight = 48;
    
    let sidebarX = buttonPosition.x;
    let sidebarY = buttonPosition.y + buttonHeight + 8;
    
    // Adjust horizontal position if sidebar would go off screen
    if (sidebarX + sidebarWidth > window.innerWidth) {
      sidebarX = window.innerWidth - sidebarWidth - 8;
    }
    if (sidebarX < 8) {
      sidebarX = 8;
    }
    
    // Adjust vertical position if sidebar would go off screen
    if (sidebarY + sidebarHeight > window.innerHeight) {
      sidebarY = buttonPosition.y - sidebarHeight - 8;
    }
    if (sidebarY < 8) {
      sidebarY = 8;
    }
    
    setSidebarPosition({ x: sidebarX, y: sidebarY });
  }, [buttonPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setHasMoved(true);

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Get viewport dimensions
      const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 48);
      const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 48);

      // Constrain to viewport bounds
      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setButtonPosition({ x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Reset hasMoved after a short delay to allow click event
      setTimeout(() => setHasMoved(false), 0);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setHasMoved(false);
      setIsDragging(true);
      // Close dropdown when starting to drag
      setIsSidebarOpen(false);
    }
  };

  const projects = [
    {
      title: "PT Puri Ganesha Engineering",
      category: "Corporate Website",
      description:
        "Full-stack corporate website for leading Indonesian engineering consultancy.",
      images: ["/pge-hero.png", "/pge-project.png", "/pge-aboutus.png"],
      tags: ["React", "Full-Stack"],
      link: "https://pg-engineering.com",
      featured: true,
    },
    {
      title: "PGE System",
      category: "Enterprise Platform",
      description:
        "Integrated Management Platform for managing critical office workflows.",
      image:
        "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Laravel 11", "Enterprise"],
      link: "#",
      featured: true,
    },
    {
      title: "Network Infrastructure",
      category: "System Management",
      description:
        "Setup and maintenance of complete IT infrastructure including server deployment.",
      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Linux", "Network"],
      link: "#",
      featured: true,
    },
  ];

  const skills = [
    {
      category: "Backend Development",
      items: ["Laravel 11", "PHP", "RESTful API"],
    },
    {
      category: "Frontend Development",
      items: ["React", "Alpine.js", "Tailwind CSS", "Vite", "TypeScript"],
    },
    {
      category: "Database Management",
      items: ["MySQL", "PostgreSQL"],
    },
    {
      category: "System Administration",
      items: [
        "Ubuntu Server",
        "Linux Administration",
        "TrueNAS Scale",
        "Server Deployment",
        "System Maintenance",
      ],
    },
    {
      category: "Network Management",
      items: [
        "MikroTik RouterOS",
        "Network Administration",
        "VLAN Configuration",
        "Traffic Shaping",
        "Routing & Firewall",
      ],
    },
    {
      category: "Cloud & Security",
      items: [
        "Nextcloud",
        "Cloudflare Tunnel",
        "Zero Trust Security",
        "cPanel",
        "VPS Management",
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-white text-[#1a1a1a]"
      }`}
    >
      {/* Floating Sidebar Button */}
      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          // Prevent click if we just finished dragging
          if (!hasMoved) {
            setIsSidebarOpen(!isSidebarOpen);
          }
        }}
        style={{
          position: "fixed",
          left: `${buttonPosition.x}px`,
          top: `${buttonPosition.y}px`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className={`p-3 rounded-full transition-all duration-300 ${
          isDragging ? "scale-110 z-[60]" : "z-50"
        } ${
          isDarkMode
            ? "bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#2a2a2a]"
            : "bg-white text-[#1a1a1a] hover:bg-[#f5f5f5] shadow-lg"
        }`}
        aria-label="Toggle navigation"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Navigation */}
      <aside
        style={{
          position: "fixed",
          left: `${sidebarPosition.x}px`,
          top: `${sidebarPosition.y}px`,
          transform: isSidebarOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-10px)",
        }}
        className={`z-40 transition-all duration-300 ease-out ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } rounded-xl shadow-2xl overflow-hidden min-w-[220px]`}
      >
        <nav className="flex flex-col py-2">
          <a
            href="#about"
            onClick={() => setIsSidebarOpen(false)}
            className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isDarkMode
                ? "text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-[#f5f5f5]"
                : "text-[#666666] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
            }`}
          >
            <User
              size={18}
              className={`transition-transform duration-200 ${
                isDarkMode
                  ? "text-[#666666] group-hover:text-[#f5f5f5]"
                  : "text-[#999999] group-hover:text-[#1a1a1a]"
              } group-hover:scale-110`}
            />
            <span>About</span>
          </a>
          <a
            href="#experience"
            onClick={() => setIsSidebarOpen(false)}
            className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isDarkMode
                ? "text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-[#f5f5f5]"
                : "text-[#666666] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
            }`}
          >
            <Briefcase
              size={18}
              className={`transition-transform duration-200 ${
                isDarkMode
                  ? "text-[#666666] group-hover:text-[#f5f5f5]"
                  : "text-[#999999] group-hover:text-[#1a1a1a]"
              } group-hover:scale-110`}
            />
            <span>Experience</span>
          </a>
          <a
            href="#work"
            onClick={() => setIsSidebarOpen(false)}
            className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isDarkMode
                ? "text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-[#f5f5f5]"
                : "text-[#666666] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
            }`}
          >
            <FolderKanban
              size={18}
              className={`transition-transform duration-200 ${
                isDarkMode
                  ? "text-[#666666] group-hover:text-[#f5f5f5]"
                  : "text-[#999999] group-hover:text-[#1a1a1a]"
              } group-hover:scale-110`}
            />
            <span>Work</span>
          </a>
          <a
            href="#skills"
            onClick={() => setIsSidebarOpen(false)}
            className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isDarkMode
                ? "text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-[#f5f5f5]"
                : "text-[#666666] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
            }`}
          >
            <Code
              size={18}
              className={`transition-transform duration-200 ${
                isDarkMode
                  ? "text-[#666666] group-hover:text-[#f5f5f5]"
                  : "text-[#999999] group-hover:text-[#1a1a1a]"
              } group-hover:scale-110`}
            />
            <span>Skills</span>
          </a>
          <a
            href="#contact"
            onClick={() => setIsSidebarOpen(false)}
            className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isDarkMode
                ? "text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-[#f5f5f5]"
                : "text-[#666666] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
            }`}
          >
            <MessageSquare
              size={18}
              className={`transition-transform duration-200 ${
                isDarkMode
                  ? "text-[#666666] group-hover:text-[#f5f5f5]"
                  : "text-[#999999] group-hover:text-[#1a1a1a]"
              } group-hover:scale-110`}
            />
            <span>Contact</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Card - All in One */}
      <div className="pt-20 pb-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Single White Card Container */}
          <div
            className={`rounded-2xl transition-all duration-300 ${
              isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
            }`}
          >
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
                      Bachelor's Degree in Informatics Engineering
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.03em] mb-4">
                    Hello, I am
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
                    An <span className="font-medium">IT Engineer</span>.
                  </p>
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                      isDarkMode
                        ? "text-[#a0a0a0] hover:text-[#f5f5f5]"
                        : "text-[#666666] hover:text-[#1a1a1a]"
                    }`}
                  >
                    Contact me
                    <ArrowRight size={16} className="rotate-[-45deg]" />
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
                    Who am I?
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <div
                    className={`space-y-4 transition-colors ${
                      isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                    }`}
                  >
                    <p className="text-base leading-relaxed">
                      I earned my{" "}
                      <span className="font-medium">Bachelor's degree</span> in{" "}
                      <span className="italic">Informatics Engineering</span>{" "}
                      from Politeknik Negeri Malang in 2024 with a GPA of{" "}
                      <span className="font-medium">3.42</span>.
                    </p>
                    <p className="text-base leading-relaxed">
                      As an <span className="font-medium">IT Engineer</span>, I
                      focus on delivering{" "}
                      <span className="italic">scalable</span> and{" "}
                      <span className="italic">maintainable</span> technology
                      solutions rooted in strategic thinking. I design and build{" "}
                      <span className="font-medium">
                        enterprise applications
                      </span>{" "}
                      and{" "}
                      <span className="font-medium">
                        infrastructure systems
                      </span>{" "}
                      aligned with organizational goals.
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
                    Experience
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
                          Jun 2025 - Present
                        </div>
                        <h3 className="text-2xl font-light tracking-[-0.02em]">
                          <span className="font-medium">Information</span>{" "}
                          Technology
                          <br />
                          <span className="italic">Engineer</span>
                        </h3>
                        <p
                          className={`text-sm mt-1 transition-colors ${
                            isDarkMode ? "text-[#666666]" : "text-[#999999]"
                          }`}
                        >
                          PT Puri Ganesha Engineering
                        </p>
                      </div>
                    </div>
                    <div
                      className={`space-y-4 pl-4 transition-colors ${
                        isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                      }`}
                    >
                      <p className="text-base leading-relaxed text-justify">
                        Designed and deployed{" "}
                        <span className="font-medium">PGE System</span>{" "}
                        <span className="italic">(v1.10.0)</span>, a
                        comprehensive{" "}
                        <span className="font-medium">
                          Integrated Management Platform
                        </span>{" "}
                        managing critical office workflows. Mastered{" "}
                        <span className="font-medium">Database Management</span>{" "}
                        on relational databases{" "}
                        <span className="italic">MySQL</span> and{" "}
                        <span className="italic">PostgreSQL</span>.
                      </p>
                      <p className="text-base leading-relaxed text-justify">
                        Responsible for installation, configuration, and
                        maintenance of{" "}
                        <span className="font-medium">Ubuntu Server</span>{" "}
                        production environments. Designed and implemented{" "}
                        <span className="italic">
                          distributed storage systems
                        </span>{" "}
                        with <span className="font-medium">TrueNAS Scale</span>.
                      </p>
                      <p className="text-base leading-relaxed text-justify">
                        <span className="font-medium">
                          Network Administration
                        </span>{" "}
                        using{" "}
                        <span className="italic">RouterOS (MikroTik)</span>,
                        including{" "}
                        <span className="italic">traffic shaping</span>,{" "}
                        <span className="italic">Hotspot solutions</span>,{" "}
                        <span className="font-medium">VLAN segmentation</span>,
                        and advanced routing configurations.
                      </p>
                    </div>
                    <div className="pt-6 pl-4">
                      <p
                        className={`text-xs font-medium tracking-wider uppercase mb-4 transition-colors ${
                          isDarkMode ? "text-[#666666]" : "text-[#999999]"
                        }`}
                      >
                        Tech Stack
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

                  {/* Education */}
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
                          AUG 2020 - 2024
                        </div>
                        <h3 className="text-2xl font-light tracking-[-0.02em]">
                          <span className="font-medium">D4</span>, Information
                          <br />
                          <span className="italic">Technology</span>
                        </h3>
                        <p
                          className={`text-sm mt-1 transition-colors ${
                            isDarkMode ? "text-[#666666]" : "text-[#999999]"
                          }`}
                        >
                          Politeknik Negeri Malang
                        </p>
                      </div>
                    </div>
                    <div
                      className={`space-y-4 pl-4 transition-colors ${
                        isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                      }`}
                    >
                      <p className="text-base leading-relaxed text-justify">
                        Specialized in{" "}
                        <span className="font-medium">IT Staff</span> with focus
                        on <span className="italic">system development</span>,{" "}
                        <span className="font-medium">
                          infrastructure management
                        </span>
                        , and{" "}
                        <span className="italic">software engineering</span>.
                      </p>
                    </div>
                    <div className="pt-2 pl-4">
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                        }`}
                      >
                        GPA: 3.42
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
                    Selected Work
                  </h2>
                  <span
                    className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                      isDarkMode ? "text-[#666666]" : "text-[#999999]"
                    }`}
                  >
                    03 Projects
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <a
                      key={index}
                      href={project.link}
                      target={project.link !== "#" ? "_blank" : "_self"}
                      rel={project.link !== "#" ? "noopener noreferrer" : ""}
                      className="group block"
                    >
                      <div className="space-y-4">
                        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#1a1a1a] dark:bg-[#0a0a0a]">
                          <img
                            src={project.images?.[0] || project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                                isDarkMode ? "text-[#666666]" : "text-[#999999]"
                              }`}
                            >
                              {project.category}
                            </span>
                            <ArrowRight
                              size={16}
                              className={`transition-all group-hover:translate-x-1 ${
                                isDarkMode ? "text-[#666666]" : "text-[#999999]"
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
                            {project.description.includes("Full-stack") ? (
                              <>
                                <span className="font-medium">
                                  Full-stack corporate website
                                </span>{" "}
                                for <span className="italic">leading</span>{" "}
                                Indonesian{" "}
                                <span className="font-medium">
                                  engineering consultancy
                                </span>
                                .
                              </>
                            ) : project.description.includes("Integrated") ? (
                              <>
                                <span className="font-medium">
                                  Integrated Management Platform
                                </span>{" "}
                                for managing{" "}
                                <span className="italic">
                                  critical office workflows
                                </span>
                                .
                              </>
                            ) : (
                              <>
                                <span className="font-medium">Setup</span> and{" "}
                                <span className="italic">maintenance</span> of{" "}
                                <span className="italic">
                                  complete IT infrastructure
                                </span>{" "}
                                including{" "}
                                <span className="font-medium">
                                  server deployment
                                </span>
                                .
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </a>
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
                  Expertise
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {skills.map((skillSet, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-lg font-light tracking-[-0.01em]">
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
                            className={`text-sm leading-relaxed transition-colors ${
                              isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
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
                  Let's build something <span className="italic">powerful</span>
                </h2>
                <p
                  className={`text-base mb-6 leading-relaxed transition-colors max-w-2xl mx-auto ${
                    isDarkMode ? "text-[#a0a0a0]" : "text-[#666666]"
                  }`}
                >
                  Have a project in mind? I'm open to discussing new
                  opportunities and technical collaborations.
                </p>
                <a
                  href="mailto:ddiko105@gmail.com"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all ${
                    isDarkMode
                      ? "bg-[#f5f5f5] text-[#0a0a0a] hover:bg-[#e5e5e5]"
                      : "bg-[#1a1a1a] text-[#fafafa] hover:bg-[#2a2a2a]"
                  }`}
                >
                  <Mail size={16} />
                  Get in Touch
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
                      className={`transition-colors ${
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
                      className={`transition-colors ${
                        isDarkMode
                          ? "text-[#666666] hover:text-[#f5f5f5]"
                          : "text-[#999999] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="mailto:ddiko105@gmail.com"
                      className={`transition-colors ${
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
                    © 2025 Mokhamad Dwihardik Kusuma Putra. All rights reserved.
                  </p>
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
