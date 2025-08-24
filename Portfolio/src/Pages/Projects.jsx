// src/components/Projects.jsx
import React, { useState } from "react";

/* Badge/Pill */
function Pill({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-50/90 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300",
    featured: "bg-indigo-50/90 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300",
  };
  
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs sm:text-sm backdrop-blur transition-all duration-200 hover:scale-105 ${variants[variant]}`}>
      {children}
    </span>
  );
}

/* Action Button */
function Action({ href, children, variant = "solid", icon = "external" }) {
  const base = "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all duration-200 font-medium";
  const solid = "bg-indigo-500 text-white border border-indigo-500 hover:bg-indigo-600 hover:shadow-lg hover:scale-105 shadow-sm";
  const outline = "border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:shadow-md text-gray-700 dark:text-gray-300";
  
  const icons = {
    external: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
    github: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    demo: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    )
  };
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variant === "solid" ? solid : outline}`}
      aria-label={`${children} - opens in new tab`}
    >
      {children}
      {icons[icon]}
    </a>
  );
}

/* Status Badge */
function StatusBadge({ status }) {
  const statusStyles = {
    completed: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
    "in-progress": "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
    upcoming: "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800"
  };
  
  return (
    <span className={`absolute right-4 top-4 rounded-lg px-2 py-1 text-xs font-medium backdrop-blur-sm ${statusStyles[status] || statusStyles.completed}`}>
      {status?.replace("-", " ") || "Completed"}
    </span>
  );
}

/* Single project card */
function ProjectCard({ title, period, stack = [], highlights = [], links = [], image, featured = false, status = "completed" }) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayHighlights = isExpanded ? highlights : highlights.slice(0, 2);
  
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border bg-white/80 dark:bg-gray-900/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur ${
        featured 
          ? "border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-50 dark:ring-indigo-900/50" 
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {image && !imageError ? (
          <img
            src={image}
            alt={`${title} project screenshot`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Project Preview</p>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Period label */}
        <span className="absolute left-4 top-4 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 backdrop-blur-sm font-medium border border-gray-200/50 dark:border-gray-700/50">
          {period}
        </span>
        
        {/* Status badge */}
        <StatusBadge status={status} />
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute left-4 bottom-4 flex items-center gap-1 rounded-lg bg-indigo-500 text-white text-xs px-2.5 py-1.5 backdrop-blur-sm font-medium shadow-sm">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight leading-tight text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>

        {/* Tech stack pills */}
        {stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {stack.map((tech, index) => (
              <Pill key={tech} variant={index === 0 && featured ? "featured" : "default"}>
                {tech}
              </Pill>
            ))}
          </div>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mt-4">
            <ul className="space-y-2.5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {displayHighlights.map((highlight, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  <span className="flex-1">{highlight}</span>
                </li>
              ))}
            </ul>
            
            {/* Expand/Collapse button */}
            {highlights.length > 2 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
                aria-expanded={isExpanded}
              >
                {isExpanded ? "Show less" : `Show ${highlights.length - 2} more`}
              </button>
            )}
          </div>
        )}

        {/* Action buttons */}
        {links?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map((link, i) => (
              <Action 
                key={link.href} 
                href={link.href} 
                variant={i === 0 ? "solid" : "outline"}
                icon={link.label.toLowerCase().includes('github') ? 'github' : 
                      link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'demo' : 'external'}
              >
                {link.label}
              </Action>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/* Filter component */
function ProjectFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? "bg-indigo-500 text-white shadow-md hover:bg-indigo-600"
              : "bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/80 shadow-sm"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const projectList = [
    {
      title: "Subscription-Based Online Course Platform",
      period: "Jul 2025 – Present",
      stack: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
      highlights: [
        "Scalable e‑learning platform with subscription-based access and automated certificate generation",
        "Implemented secure authentication system with role‑based access control for students, instructors, and admins",
        "Built automated email notification system for course enrollment, completion, and payment confirmations",
        "Developed comprehensive course management system with video streaming capabilities",
        "Created responsive instructor and student dashboards with analytics and progress tracking",
        "Integrated payment processing for subscription management and course purchases"
      ],
      links: [
        { label: "GitHub", href: "https://github.com/SubscriptionBasedOnlineLearningPlatfrom/Online-Course-Platform" },
      ],
      image: "/images/projects/lms.png",
      featured: true,
      status: "in-progress",
      category: "Full-Stack"
    },
    {
      title: "SportsHive",
      period: "Mar 2025 – Apr 2025",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      highlights: [
        "Comprehensive sports management platform for booking coaches, grounds, and academy applications",
        "Integrated Stripe payment gateway for secure transactions and booking confirmations",
        "Implemented Google Maps API for location-based ground and academy discovery",
        "Built user authentication system with password reset functionality and email verification",
        "Created club management dashboard with member tracking and event scheduling"
      ],
      links: [
        { label: "GitHub", href: "https://github.com/RahaviSiri/SpiritX_Syntax404_02" }
      ],
      image: "/images/projects/sportshive.png",
      category: "Full-Stack"
    },
    {
      title: "Hotel Booking System",
      period: "Jul 2025 – Aug 2025",
      stack: ["React.js", "Spring Boot", "PostgreSQL"],
      highlights: [
        "Full-featured hotel management system with real‑time room availability and booking functionality",
        "Implemented Spring Security for role-based access control supporting guests, staff, and administrators",
        "Built responsive admin dashboard for managing reservations, room inventory, and customer data",
        "Created advanced search and filtering system with date range and amenity-based queries",
        "Developed automated email confirmation and reminder system for bookings"
      ],
      links: [
        { label: "Frontend", href: "https://github.com/ParkkaviSivakaran72/Hotel_Booking_System-System_Frontend" },
        { label: "Backend", href: "#" }
      ],
      image: "/images/projects/hotel.png",
      category: "Full-Stack"
    },
    {
      title: "Single Vendor E‑commerce Platform",
      period: "Aug 2024 – Oct 2024",
      stack: ["React.js", "Node.js", "Express.js", "MySQL"],
      highlights: [
        "Complete e-commerce solution with shopping cart, order management, and secure checkout process",
        "Designed and implemented normalized MySQL database schema for products, orders, and user management",
        "Built RESTful API with Express.js and integrated seamlessly with React frontend",
        "Implemented inventory management system with stock tracking and low-stock alerts",
        "Created admin panel for product management, order processing, and sales analytics"
      ],
      links: [
        { label: "GitHub", href: "https://github.com/trinith01/ecommerce" }
      ],
      image: "/images/projects/ecommerce.jpg",
      category: "Full-Stack"
    },
    {
      title: "Habit Tracker App",
      period: "Jun 2025 – Jul 2025",
      stack: ["React Native", "Appwrite"],
      highlights: [
        "Cross-platform mobile application for tracking daily, weekly, and monthly habits with streak counting",
        "Implemented Appwrite backend for user authentication, data storage, and real-time synchronization",
        "Built intuitive UI with smooth animations and responsive interactions for optimal user experience",
        "Created comprehensive analytics dashboard showing habit completion rates and progress trends",
        "Developed notification system for habit reminders and milestone celebrations"
      ],
      links: [
        { label: "GitHub", href: "https://github.com/ParkkaviSivakaran72/Habit-Tracker-App" }
      ],
      image: "/images/projects/habits.jpg",
      category: "Mobile"
    },
  ];

  const categories = ["All", "Full-Stack", "Mobile"];
  
  const filteredProjects = activeCategory === "All" 
    ? projectList 
    : projectList.filter(project => project.category === activeCategory);

  return (
    <section
      id="projects"
      className=" w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Section header */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
          Featured Projects
        </h2>
        <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mb-6" />
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          A curated selection of full-stack applications and mobile solutions, 
          showcasing modern development practices and user-centered design.
        </p>
      </div>

      {/* Project filter */}
      <div className="flex justify-center mb-12">
        <ProjectFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Projects grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {/* View more projects link */}
      <div className="mt-16 text-center">
        <a
          href="https://github.com/parkkavisivakaran72"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors text-lg"
        >
          View all projects on GitHub
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}