import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown, Cpu, Layers, Monitor, MapPin, Truck, Activity, Zap,
  Bell, BarChart3, ShieldCheck, Video, Cloud, Settings, Sliders, Briefcase,
  Wrench, GraduationCap, Flame, Droplet, Factory, Building, Gauge, Globe, Plane, Warehouse,
} from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import MegaMenu, { type MegaMenuCategory, type MegaMenuFeatured } from "@/components/MegaMenu";
import MobileMegaAccordion from "@/components/MobileMegaAccordion";
import lightlogo from "@/assets/AltrexLogoTr1.png";
import darklogo from "@/assets/AltrexLogoTr2.png";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const location = useLocation();

  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const industriesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close any open menu on Escape, from anywhere in the header.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setSolutionsOpen(false);
      setServicesOpen(false);
      setIndustriesOpen(false);
      setProjectsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Solutions", href: "#" },
    { name: "Services", href: "#" },
    { name: "Industries", href: "#" },
    { name: "Live Demo", href: "#" },
    { name: "Contact Us", href: "/contact" },
  ];

  // --- Solutions ---------------------------------------------------------
  const solutionCategories: MegaMenuCategory[] = [
    {
      title: "Core Infrastructure",
      icon: Cpu,
      viewAllHref: "/solutions#core-infrastructure",
      items: [
        { name: "Connectivity & Data Acquisition", href: "/solutions/connectivity", icon: Cpu, description: "Unify PLCs, RTUs, sensors, and SCADA into one data layer." },
        { name: "Industrial IoT Platform", href: "/solutions/iiot-platform", icon: Layers, description: "A single real-time platform connecting every industrial asset." },
        { name: "Web SCADA & Real-Time Monitoring", href: "/solutions/web-scada", icon: Monitor, description: "Monitor and control operations from any browser, live." },
        { name: "GIS & Asset Management", href: "/solutions/gis-asset-management", icon: MapPin, description: "Map, track, and manage physical assets on a live spatial layer." },
      ],
    },
    {
      title: "Operations & Efficiency",
      icon: Gauge,
      viewAllHref: "/solutions#operations-efficiency",
      items: [
        { name: "Fleet Management & VTS", href: "/solutions/fleet-management", icon: Truck, description: "Track vehicles and optimize routes with live telemetry." },
        { name: "Automatic Meter Reading (AMR)", href: "/solutions/amr", icon: Activity, description: "Remote meter reads with zero manual site visits." },
        { name: "Energy Management", href: "/solutions/energy-management", icon: Zap, description: "Monitor consumption and cut energy costs across sites." },
        { name: "Alarm & Event Management", href: "/solutions/alarm-management", icon: Bell, description: "Catch critical events before they become incidents." },
      ],
    },
    {
      title: "Intelligence & Security",
      icon: ShieldCheck,
      viewAllHref: "/solutions#intelligence-security",
      items: [
        { name: "Analytics & Reporting", href: "/solutions/analytics-reporting", icon: BarChart3, description: "Turn operational data into decisions with live dashboards." },
        { name: "Cybersecurity & Access Control", href: "/solutions/cybersecurity", icon: ShieldCheck, description: "Protect OT networks and control who accesses what." },
        { name: "CCTV & Video Surveillance Management", href: "/solutions/cctv-surveillance", icon: Video, description: "Centralize video feeds with intelligent monitoring." },
      ],
    },
  ];

  const solutionsFeatured: MegaMenuFeatured = {
    icon: Layers,
    title: "Industrial IoT Platform",
    description: "Connect PLCs, RTUs, sensors, DCS, SCADA, and enterprise applications into one unified real-time platform.",
    ctaLabel: "Explore Platform",
    ctaHref: "/solutions/iiot-platform",
    exploreAllLabel: "Explore All Solutions",
    exploreAllHref: "/solutions",
  };

  // --- Services ------------------------------------------------------------
  const serviceCategories: MegaMenuCategory[] = [
    {
      title: "Core Deployments",
      icon: Briefcase,
      viewAllHref: "/services#core-deployments",
      items: [
        { name: "SaaS Platform Services", href: "/services/saas-platform", icon: Cloud, description: "Fully managed platform access, hosted and maintained by us." },
        { name: "Turnkey Project Implementation", href: "/services/turnkey-implementation", icon: Briefcase, description: "End-to-end deployment from design to commissioning." },
        { name: "Managed Services & AMC", href: "/services/managed-services-amc", icon: Wrench, description: "Ongoing support and maintenance for continuous uptime." },
      ],
    },
    {
      title: "Integration Services",
      icon: Sliders,
      viewAllHref: "/services#integration-services",
      items: [
        { name: "System Integration Services", href: "/services/system-integration", icon: Sliders, description: "Connect existing systems into one unified architecture." },
        { name: "Industrial IoT & Edge Integration", href: "/services/industrial-iot-edge", icon: Cpu, description: "Bridge OT and IT with edge-ready IoT integration." },
        { name: "CCTV & Video Analytics Services", href: "/services/cctv-video-analytics", icon: Video, description: "Deploy and integrate intelligent video systems." },
      ],
    },
    {
      title: "Infrastructure & Advisory",
      icon: Settings,
      viewAllHref: "/services#infrastructure-advisory",
      items: [
        { name: "Cloud & Infrastructure Services", href: "/services/cloud-infrastructure", icon: Settings, description: "Scalable cloud infrastructure built for industrial data." },
        { name: "GIS & Asset Digitization", href: "/services/gis-asset-digitization", icon: MapPin, description: "Digitize field assets into a searchable spatial record." },
        { name: "Training & Consulting", href: "/services/training-consulting", icon: GraduationCap, description: "Upskill teams and plan your digital transformation roadmap." },
      ],
    },
  ];

  const servicesFeatured: MegaMenuFeatured = {
    icon: Briefcase,
    title: "Turnkey Project Implementation",
    description: "From design to commissioning — we deliver end-to-end deployments backed by our engineering team.",
    ctaLabel: "Explore Services",
    ctaHref: "/services/turnkey-implementation",
    exploreAllLabel: "Explore All Services",
    exploreAllHref: "/services",
  };

  // --- Industries ------------------------------------------------------------
  const industryCategories: MegaMenuCategory[] = [
    {
      title: "Energy & Resources",
      icon: Flame,
      viewAllHref: "/industries#energy-resources",
      items: [
        { name: "City Gas Distribution (CGD)", href: "/industries/cgd", icon: Flame, description: "Purpose-built monitoring for CGD networks end-to-end." },
        { name: "Oil & Gas", href: "/industries/oil-gas", icon: Settings, description: "Real-time visibility across upstream to downstream operations." },
        { name: "Power & Utilities", href: "/industries/power-utilities", icon: Zap, description: "Grid monitoring and control for reliable power delivery." },
      ],
    },
    {
      title: "Infrastructure & Automation",
      icon: Factory,
      viewAllHref: "/industries#infrastructure-automation",
      items: [
        { name: "Water & Wastewater", href: "/industries/water-wastewater", icon: Droplet, description: "Monitor treatment and distribution networks in real time." },
        { name: "Renewable Energy", href: "/industries/renewable-energy", icon: Activity, description: "Track generation and performance across renewable assets." },
        { name: "Manufacturing & Industrial Automation", href: "/industries/manufacturing-automation", icon: Factory, description: "Connect plant floor systems into one control layer." },
      ],
    },
    {
      title: "Smart Ecosystems",
      icon: Building,
      viewAllHref: "/industries#smart-ecosystems",
      items: [
        { name: "Logistics & Transportation", href: "/industries/logistics-transportation", icon: Truck, description: "Live fleet and cargo visibility across your network." },
        { name: "Smart Cities", href: "/industries/smart-cities", icon: Building, description: "Unify city infrastructure into one operational view." },
        { name: "Infrastructure & Utilities", href: "/industries/infrastructure-utilities", icon: Layers, description: "Manage critical infrastructure at city scale." },
      ],
    },
  ];

  const industriesFeatured: MegaMenuFeatured = {
    icon: Flame,
    title: "City Gas Distribution",
    description: "Purpose-built monitoring and automation for CGD networks, from city gate to customer meter.",
    ctaLabel: "Explore Industries",
    ctaHref: "/industries/cgd",
    exploreAllLabel: "Explore All Industries",
    exploreAllHref: "/industries",
  };

  // --- Projects (live demos) --------------------------------------------
  // hrefs below are placeholders — swap in the real hosted demo URLs.
  // MegaMenu/MobileMegaAccordion detect http(s) links automatically and
  // render them as external links (new tab) instead of in-app routes.
  const projectCategories: MegaMenuCategory[] = [
    {
      title: "Live Product Demos",
      icon: Globe,
      viewAllHref: "https://demos.altrex.io",
      items: [
        { name: "EV Station Centre", href: "https://ev-station-mu.vercel.app/", icon: Zap, description: "Monitor EV charging stations and energy delivery in real time." },
        { name: "CGD Asset Console", href: "https://cgd-network.vercel.app/", icon: Flame, description: "Track and manage assets across the CGD distribution network." },
        { name: "CNG Logistics Console", href: "https://vts-khaki.vercel.app/", icon: Truck, description: "Live tracking of CNG cascade logistics and delivery routes." },
        { name: "MHE Fleet Command Centre", href: "https://mhe-tracking.vercel.app/", icon: Warehouse, description: "Coordinate material handling equipment across facilities." },
        { name: "Production & OEE Console", href: "https://manufacturing-line.vercel.app/", icon: Factory, description: "Monitor production lines and overall equipment effectiveness." },
        { name: "Energy Command Centre", href: "https://ems-plant.vercel.app/", icon: Gauge, description: "Centralized view of plant-wide energy consumption and load." },
        { name: "Enterprise Energy Platform", href: "https://manufacturing-line.vercel.app/", icon: BarChart3, description: "Enterprise-wide energy analytics and reporting dashboard." },
        { name: "CGD AMR Console", href: "https://amr-cgd.vercel.app/", icon: Activity, description: "Automatic meter reading for CGD customer connections." },
        { name: "Water AMR Console", href: "https://amr-water.vercel.app/", icon: Droplet, description: "Automatic meter reading across water utility networks." },
        { name: "Fleet Command", href: "https://vts-logistics.vercel.app/", icon: Truck, description: "Live fleet tracking and dispatch across your network." },
      ],
    },
  ];

  const projectsFeatured: MegaMenuFeatured = {
    icon: Globe,
    title: "See Altrex in Action",
    description: "Explore live, interactive demos of real deployments across energy, logistics, manufacturing, aerospace, and public infrastructure.",
    ctaLabel: "Launch EV Station Centre",
    ctaHref: "https://ev-station-mu.vercel.app/",
    exploreAllLabel: "View All Demos",
    exploreAllHref: "https://demos.altrex.io",
  };

  const { theme } = useTheme();
  const effectiveTheme = theme;

  const handleSolutionsEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  };
  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150);
  };
  const toggleSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    setSolutionsOpen((prev) => !prev);
  };

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };
  const toggleServices = (e: React.MouseEvent) => {
    e.preventDefault();
    setServicesOpen((prev) => !prev);
  };

  const handleIndustriesEnter = () => {
    if (industriesTimeoutRef.current) clearTimeout(industriesTimeoutRef.current);
    setIndustriesOpen(true);
  };
  const handleIndustriesLeave = () => {
    industriesTimeoutRef.current = setTimeout(() => setIndustriesOpen(false), 150);
  };
  const toggleIndustries = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndustriesOpen((prev) => !prev);
  };

  const handleProjectsEnter = () => {
    if (projectsTimeoutRef.current) clearTimeout(projectsTimeoutRef.current);
    setProjectsOpen(true);
  };
  const handleProjectsLeave = () => {
    projectsTimeoutRef.current = setTimeout(() => setProjectsOpen(false), 150);
  };
  const toggleProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    setProjectsOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (industriesTimeoutRef.current) clearTimeout(industriesTimeoutRef.current);
      if (projectsTimeoutRef.current) clearTimeout(projectsTimeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b bg-card/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "bg-background"
      } text-foreground ${effectiveTheme === "dark" ? "dark" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" aria-label="Go to home" onClick={() => setMobileMenu(false)} className="flex items-center">
          <img
            src={effectiveTheme === "dark" ? darklogo : lightlogo}
            alt="Altrex Logo"
            className="h-5 w-auto object-contain transition-opacity duration-300"
          />
        </Link>

        {/* Desktop nav — visible from md (768px) up, per tablet spec */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => {
            const isActive = location.pathname.startsWith(item.href);

            if (item.name === "Solutions") {
              return (
                <div key={item.name} className="relative h-16 flex items-center" onMouseEnter={handleSolutionsEnter} onMouseLeave={handleSolutionsLeave}>
                  <Link
                    to={item.href}
                    onClick={toggleSolutions}
                    aria-haspopup="menu"
                    aria-expanded={solutionsOpen}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 relative z-50 outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 rounded-sm ${
                      isActive || solutionsOpen ? "text-orange-500" : "text-foreground hover:text-orange-500"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180 text-orange-500" : ""}`} />
                  </Link>
                  <MegaMenu
                    isOpen={solutionsOpen}
                    label="Solutions"
                    categories={solutionCategories}
                    featured={solutionsFeatured}
                    onLinkClick={() => setSolutionsOpen(false)}
                  />
                </div>
              );
            }

            if (item.name === "Services") {
              return (
                <div key={item.name} className="relative h-16 flex items-center" onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
                  <Link
                    to={item.href}
                    onClick={toggleServices}
                    aria-haspopup="menu"
                    aria-expanded={servicesOpen}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 relative z-50 outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 rounded-sm ${
                      isActive || servicesOpen ? "text-orange-500" : "text-foreground hover:text-orange-500"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-orange-500" : ""}`} />
                  </Link>
                  <MegaMenu
                    isOpen={servicesOpen}
                    label="Services"
                    categories={serviceCategories}
                    featured={servicesFeatured}
                    onLinkClick={() => setServicesOpen(false)}
                  />
                </div>
              );
            }

            if (item.name === "Industries") {
              return (
                <div key={item.name} className="relative h-16 flex items-center" onMouseEnter={handleIndustriesEnter} onMouseLeave={handleIndustriesLeave}>
                  <Link
                    to={item.href}
                    onClick={toggleIndustries}
                    aria-haspopup="menu"
                    aria-expanded={industriesOpen}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 relative z-50 outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 rounded-sm ${
                      isActive || industriesOpen ? "text-orange-500" : "text-foreground hover:text-orange-500"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${industriesOpen ? "rotate-180 text-orange-500" : ""}`} />
                  </Link>
                  <MegaMenu
                    isOpen={industriesOpen}
                    label="Industries"
                    categories={industryCategories}
                    featured={industriesFeatured}
                    onLinkClick={() => setIndustriesOpen(false)}
                  />
                </div>
              );
            }

            if (item.name === "Live Demo") {
              return (
                <div key={item.name} className="relative h-16 flex items-center" onMouseEnter={handleProjectsEnter} onMouseLeave={handleProjectsLeave}>
                  <Link
                    to={item.href}
                    onClick={toggleProjects}
                    aria-haspopup="menu"
                    aria-expanded={projectsOpen}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 relative z-50 outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 rounded-sm ${
                      isActive || projectsOpen ? "text-orange-500" : "text-foreground hover:text-orange-500"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${projectsOpen ? "rotate-180 text-orange-500" : ""}`} />
                  </Link>
                  <MegaMenu
                    isOpen={projectsOpen}
                    label="Projects"
                    categories={projectCategories}
                    featured={projectsFeatured}
                    onLinkClick={() => setProjectsOpen(false)}
                  />
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 rounded-sm ${
                  isActive ? "text-orange-500" : "text-foreground hover:text-orange-500"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
        </div>

        {/* Mobile Button — visible below md */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-expanded={mobileMenu}
          aria-controls="mobile-nav-panel"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          className="flex items-center justify-center md:hidden"
        >
          {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu — accordion, below md */}
      {mobileMenu && (
        <div id="mobile-nav-panel" className="border-t border-border bg-card md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1 px-4 py-4">
            <div className="flex items-center justify-between px-2 py-3 border-b border-border mb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Theme</p>
              <ThemeToggle />
            </div>

            {navLinks.map((item) => {
              const isActive = location.pathname.startsWith(item.href);

              if (item.name === "Solutions") {
                return (
                  <MobileMegaAccordion
                    key={item.name}
                    label="Solutions"
                    panelId="mobile-solutions-panel"
                    isOpen={mobileSolutionsOpen}
                    onToggle={() => setMobileSolutionsOpen((prev) => !prev)}
                    categories={solutionCategories}
                    featured={solutionsFeatured}
                    onLinkClick={() => { setMobileMenu(false); setMobileSolutionsOpen(false); }}
                  />
                );
              }

              if (item.name === "Services") {
                return (
                  <MobileMegaAccordion
                    key={item.name}
                    label="Services"
                    panelId="mobile-services-panel"
                    isOpen={mobileServicesOpen}
                    onToggle={() => setMobileServicesOpen((prev) => !prev)}
                    categories={serviceCategories}
                    featured={servicesFeatured}
                    onLinkClick={() => { setMobileMenu(false); setMobileServicesOpen(false); }}
                  />
                );
              }

              if (item.name === "Industries") {
                return (
                  <MobileMegaAccordion
                    key={item.name}
                    label="Industries"
                    panelId="mobile-industries-panel"
                    isOpen={mobileIndustriesOpen}
                    onToggle={() => setMobileIndustriesOpen((prev) => !prev)}
                    categories={industryCategories}
                    featured={industriesFeatured}
                    onLinkClick={() => { setMobileMenu(false); setMobileIndustriesOpen(false); }}
                  />
                );
              }

              if (item.name === "Projects") {
                return (
                  <MobileMegaAccordion
                    key={item.name}
                    label="Projects"
                    panelId="mobile-projects-panel"
                    isOpen={mobileProjectsOpen}
                    onToggle={() => setMobileProjectsOpen((prev) => !prev)}
                    categories={projectCategories}
                    featured={projectsFeatured}
                    onLinkClick={() => { setMobileMenu(false); setMobileProjectsOpen(false); }}
                  />
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-2 py-3 text-sm font-medium transition-colors rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 ${
                    isActive ? "text-orange-500" : "hover:text-orange-500 hover:bg-orange-500/5"
                  }`}
                  onClick={() => setMobileMenu(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;