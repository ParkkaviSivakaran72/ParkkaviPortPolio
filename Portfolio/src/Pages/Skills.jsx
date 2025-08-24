// src/pages/Skills.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const skills = {

    
  technical: {
    Languages: ["Java", "JavaScript", "TypeScript", "Python", "C++"],
    Frontend: ["React", "HTML", "CSS", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "Spring Boot", "REST APIs"],
    "Mobile Apps": ["React Native", "Expo"],
    Databases: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
    Tools: ["GitHub", "VS Code", "Postman", "IntelliJ"],
    Concepts: ["OOP", "Data Structures & Algorithms"],
  },
  soft: [
    "Project Management",
    "Leadership",
    "Communication",
    "Critical Thinking",
    "Problem Solving",
    "Adaptability",
    "Quick Learner",
    "Team Collaboration",
  ],
};

function Pill({ children, variant = "default", interactive = false }) {
  const variants = {
    default: "bg-gray-50/90 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300",
    featured: "bg-indigo-50/90 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300",
    soft: "bg-purple-50/90 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300",
  };
  
  return (
    <span 
      className={`inline-block rounded-full border px-3 py-1.5 text-xs sm:text-sm backdrop-blur transition-all duration-200 font-medium ${
        interactive ? 'hover:scale-105 cursor-pointer' : ''
      } ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

function Card({ title, children, icon, featured = false }) {
  return (
    <div 
      className={`rounded-3xl border bg-white/80 dark:bg-gray-900/60 backdrop-blur p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        featured 
          ? "border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-50 dark:ring-indigo-900/50" 
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ProficiencyBar({ level, color = "indigo" }) {
  const colors = {
    indigo: "from-indigo-400 to-indigo-600",
    purple: "from-purple-400 to-purple-600",
    emerald: "from-emerald-400 to-emerald-600",
  };
  
  return (
    <div className="mt-4 h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${colors[color]} transition-all duration-1000 ease-out`}
        style={{ width: `${level}%` }}
      />
    </div>
  );
}

function SkillCategory({ category, skills: skillList, icon, featured = false }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <Card title={category} icon={icon} featured={featured}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-3 text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Collapse' : 'Expand'} ({skillList.length} skills)
      </button>
      
      {isExpanded && (
        <div className="flex flex-wrap gap-2 transition-all duration-300">
          {skillList.map((item, index) => (
            <Pill 
              key={item} 
              variant={featured ? "featured" : "default"} 
              interactive={true}
            >
              {item}
            </Pill>
          ))}
        </div>
      )}
    </Card>
  );
}

export default function Skills() {
  const [activeView, setActiveView] = useState("technical");
  const navigate = useNavigate();
  
  const categoryIcons = {
    Languages: "💻",
    Frontend: "🎨",
    Backend: "⚙️",
    "Mobile Apps": "📱",
    Databases: "🗄️",
    Tools: "🛠️",
    Concepts: "🧠",
  };

  const focusAreas = [
    {
      label: "Full‑Stack Web Development",
      desc: "End‑to‑end feature development with React, Node.js, Express, and modern databases. Experienced in REST APIs, state management, and authentication systems.",
      level: 90,
      color: "indigo",
      icon: "🌐"
    },
    {
      label: "Backend & Database Design",
      desc: "API architecture, data modeling, and database optimization with PostgreSQL, MySQL, and MongoDB. Focus on scalable and maintainable solutions.",
      level: 85,
      color: "purple",
      icon: "🔧"
    },
    {
      label: "Mobile & Cross-Platform",
      desc: "React Native development with modern tooling. Experience in building responsive, performant mobile applications with great user experience.",
      level: 50,
      color: "emerald",
      icon: "📲"
    },
  ];

  return (
    <main className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-100">
          Skills & Expertise
        </h1>
        <div className="mx-auto h-1.5 w-28 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mb-6" />
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          A comprehensive overview of the technologies, tools, and methodologies I use to create 
          modern, scalable, and user-focused software solutions.
        </p>
      </header>

      {/* View Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-sm">
          {["technical", "focus", "soft"].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                activeView === view
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {view === "focus" ? "Focus Areas" : `${view} Skills`}
            </button>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      {activeView === "technical" && (
        <section className="space-y-6 animate-fadeIn">
          <h2 className="sr-only">Technical Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills.technical).map(([group, list], index) => (
              <SkillCategory
                key={group}
                category={group}
                skills={list}
                icon={categoryIcons[group]}
                featured={index < 2} // First two categories are featured
              />
            ))}
          </div>
        </section>
      )}

      {/* Focus Areas */}
      {activeView === "focus" && (
        <section className="animate-fadeIn">
          <div className="grid gap-8 lg:grid-cols-3">
            {focusAreas.map(({ label, desc, level, color, icon }) => (
              <div
                key={label}
                className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-6 backdrop-blur shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    {label}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {desc}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Proficiency
                  </span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {level}%
                  </span>
                </div>
                <ProficiencyBar level={level} color={color} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Soft Skills */}
      {activeView === "soft" && (
        <section className="animate-fadeIn">
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 backdrop-blur p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
                Professional Skills
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Essential soft skills that complement technical expertise and drive successful project outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.soft.map((skill) => (
                <Pill key={skill} variant="soft" interactive={true}>
                  {skill}
                </Pill>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/50 dark:border-indigo-800/50 p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ready to collaborate?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            I'm always excited to work on challenging projects and learn new technologies. 
            Let's build something amazing together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              onClick={() => navigate("/#contact")}
              className="inline-flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
            >
              Get in Touch
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}