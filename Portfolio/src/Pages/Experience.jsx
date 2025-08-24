// src/components/Experience.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-50/90 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300",
    volunteering: "bg-emerald-50/90 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300",
    certification: "bg-indigo-50/90 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300",
    award: "bg-amber-50/90 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300",
  };
  
  return (
    <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

function ExperienceItem({ item, type, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = (type) => {
    // switch (type) {
    //   case 'volunteering': return '🤝';
    //   case 'certification': return '📜';
    //   case 'award': return '🏆';
    //   default: return '📋';
    // }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'volunteering': return 'volunteering';
      case 'certification': return 'certification';
      case 'award': return 'award';
      default: return 'default';
    }
  };

  return (
    <div
      className="group relative p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 hover:bg-white/80 dark:hover:bg-gray-900/60 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl mt-1 transition-transform duration-300 group-hover:scale-110">
          {getIcon(type)}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {item.role || item.title}
          </h4>
          {item.org && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {item.org}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <Badge variant={getBadgeVariant(type)}>
              {item.period || item.date}
            </Badge>
            {type === 'award' && (
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-amber-400 transition-all duration-300 ${
                      isHovered ? 'animate-pulse' : ''
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, items, type, icon, description }) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, 3);
  
  const getCardBorder = (type) => {
    switch (type) {
      case 'volunteering': return 'border-emerald-200 dark:border-emerald-800 ring-2 ring-emerald-50 dark:ring-emerald-900/50';
      case 'certification': return 'border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-50 dark:ring-indigo-900/50';
      case 'award': return 'border-amber-200 dark:border-amber-800 ring-2 ring-amber-50 dark:ring-amber-900/50';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className={`rounded-3xl border bg-white/80 dark:bg-gray-900/60 backdrop-blur p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${getCardBorder(type)}`}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {displayItems.map((item, i) => (
          <ExperienceItem key={i} item={item} type={type} index={i} />
        ))}
      </div>

      {items.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors py-2 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 rounded-lg"
        >
          {showAll ? 'Show Less' : `Show ${items.length - 3} More`}
        </button>
      )}
    </div>
  );
}

function StatCard({ number, label, icon }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 backdrop-blur hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{number}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</div>
    </div>
  );
}

export default function Experience() {
  const volunteering = [
    { role: "Company Coordination Team Member", org: "CSE40 Career Fair", period: "Jan 2025" },
    { role: "Customer Relations Team Member", org: "OgT – AIESEC", period: "Sep 2024 – Dec 2024" },
    { role: "Student Member", org: "IEEE", period: "Jan 2025 – Present" },
    { role: "Student Member", org: "IESL", period: "May 2025 – Present" },
  ];

  const certifications = [
    { title: "Full Stack Developer", org: "Simplilearn", date: "Jul 2025" },
    { title: "Introduction to MERN Stack", org: "Simplilearn", date: "Jul 2025" },
    { title: "Introduction to TypeScript", org: "Simplilearn", date: "Jul 2025" },
    { title: "SQL (Intermediate)", org: "HackerRank", date: "Dec 2024" },
  ];

  const awards = [
    { title: "Mora Spirit360 – Finalist + Popular Award", org: "IEEE", date: "Apr 2025" },
    { title: "Hackelite 1.0 – 1st Runners Up", org: "IEEE", date: "Oct 2024" },
    { title: "MoraXtreme 9.0 – Participant", org: "IEEE", date: "Oct 2024" },
  ];

  const navigate = useNavigate();

  return (
    <section
      id="experience"
      className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Header */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
          Experience & Achievements
        </h2>
        <div className="mx-auto h-1.5 w-28 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mb-6" />
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          A journey of continuous learning, professional growth, and recognition through 
          volunteering, certifications, and competitive achievements.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        <StatCard number={volunteering.length} label="Volunteer Roles"/>
        <StatCard number={certifications.length} label="Certifications" />
        <StatCard number={awards.length} label="Awards"  />
      </div>

      {/* Main Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        <Card
          title="Volunteering & Memberships"
          items={volunteering}
          type="volunteering"
          icon="🤝"
          description="Active participation in professional organizations"
        />
        <Card
          title="Certifications"
          items={certifications}
          type="certification"
          icon="📜"
          description="Continuous learning and skill development"
        />
        <Card
          title="Honors & Awards"
          items={awards}
          type="award"
          icon="🏆"
          description="Recognition for excellence and innovation"
        />
      </div>

      {/* Timeline Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Recent Timeline
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-400 to-purple-400"></div>
          
          {/* Timeline items */}
          <div className="space-y-8">
            {[
              { date: "Jan 2025", event: "Joined IEEE as Student Member", type: "membership" },
              { date: "Jul 2025", event: "Completed Full Stack Developer Certification", type: "certification" },
              { date: "Apr 2025", event: "Won Popular Award at Mora Spirit360", type: "award" },
              { date: "Oct 2024", event: "1st Runners Up at Hackelite 1.0", type: "award" },
            ].map((item, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white/80 dark:bg-gray-900/60 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                      {item.date}
                    </div>
                    <div className="text-gray-900 dark:text-gray-100 font-medium">
                      {item.event}
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-400 rounded-full border-4 border-white dark:border-gray-900"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/50 dark:border-indigo-800/50 p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Let's Connect & Collaborate
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            I'm always open to new opportunities, partnerships, and meaningful connections 
            in the tech community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/parkkavi-sivakaran-aba162258/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
            >
              Connect on LinkedIn
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              onClick={() => navigate("/#contact")}
              className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Send Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}