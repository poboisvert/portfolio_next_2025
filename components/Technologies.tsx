"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Brain, Globe, Code2, Palette, Sparkles, Link, DivideIcon as LucideIcon } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  description: string;
}

interface Technology {
  title: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
  details: {
    [key: string]: string[];
  };
  resources?: Resource[];
  color: string;
}

const technologies: Technology[] = [
  {
    title: "Backend Development",
    icon: Database,
    description:
      "Building robust, scalable, and secure backend systems with modern technologies and best practices",
    skills: ["Python", "Flask", "RESTful APIs", "PostgreSQL", "Redis"],
    details: {
      expertise: [
        "Microservices Architecture",
        "API Design & Development",
        "Database Optimization",
        "Caching Strategies",
        "Security Implementation",
      ],
      tools: [
        "PostgreSQL for reliable data storage",
        "Redis for high-performance caching",
        "Docker for containerization",
        "AWS for cloud infrastructure",
      ],
      methodologies: [
        "Test-Driven Development",
        "Clean Architecture",
        "SOLID Principles",
        "Agile Development",
      ],
    },
    color: "#21cd99",
  },
  {
    title: "Data Science",
    icon: Brain,
    description:
      "Transforming raw data into actionable insights through advanced analytics and machine learning",
    skills: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "Data Visualization",
    ],
    details: {
      expertise: [
        "Statistical Analysis",
        "Machine Learning",
        "Data Visualization",
        "Predictive Modeling",
        "ETL Processes",
      ],
      applications: [
        "Customer Behavior Analysis",
        "Predictive Analytics",
        "Recommendation Systems",
        "Time Series Analysis",
      ],
      tools: ["Jupyter Notebooks", "Power BI", "Tableau", "Apache Spark"],
    },
    color: "#21cd99",
  },
  {
    title: "Frontend Development",
    icon: Globe,
    description:
      "Creating engaging, responsive, and performant web applications with modern frameworks and tools",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Framer Motion"],
    details: {
      expertise: [
        "Component Architecture",
        "State Management",
        "Performance Optimization",
        "Responsive Design",
        "Animation & Interactions",
      ],
      bestPractices: [
        "Atomic Design Principles",
        "Progressive Enhancement",
        "Accessibility (WCAG)",
        "SEO Optimization",
      ],
      tools: [
        "Modern Build Tools",
        "Testing Libraries",
        "Performance Monitoring",
        "Design Systems",
      ],
    },
    color: "#21cd99",
  },
  {
    title: "Full Stack Integration",
    icon: Code2,
    description:
      "Seamlessly connecting frontend and backend systems to create cohesive web applications",
    skills: [
      "API Integration",
      "Database Design",
      "System Architecture",
      "DevOps",
      "Security",
    ],
    details: {
      expertise: [
        "End-to-end Development",
        "System Design",
        "Performance Optimization",
        "Security Implementation",
        "Cloud Deployment",
      ],
      architectures: [
        "Microservices",
        "Serverless",
        "Event-Driven",
        "REST & GraphQL",
      ],
      tools: [
        "CI/CD Pipelines",
        "Monitoring Solutions",
        "Cloud Platforms",
        "Version Control",
      ],
    },
    color: "#21cd99",
  },
  {
    title: "AI & Machine Learning",
    icon: Sparkles,
    description:
      "Implementing cutting-edge AI solutions to solve complex business problems",
    skills: [
      "3D Generation",
      "Text-to-Image",
      "LLM Integration",
      "Neural Networks",
    ],
    details: {
      applications: [
        "Natural Language Processing",
        "Computer Vision",
        "Generative AI",
        "Predictive Analytics",
      ],
      frameworks: ["TensorFlow", "PyTorch", "Hugging Face", "OpenAI API"],
      specializations: [
        "Large Language Models",
        "Image Generation",
        "3D Asset Creation",
        "Voice Recognition",
      ],
    },
    resources: [
      {
        name: "Anything World",
        url: "https://app.anything.world/mesh-generation",
        description: "3D mesh generation platform",
      },
      {
        name: "Maison Meta",
        url: "https://maisonmeta.io/",
        description: "Digital fashion and metaverse solutions",
      },
    ],
    color: "#21cd99",
  },
  {
    title: "Branding & Design",
    icon: Palette,
    description:
      "Creating compelling visual identities and comprehensive design systems",
    skills: ["Brand Strategy", "Visual Design", "Pattern Design", "UI/UX"],
    details: {
      expertise: [
        "Visual Identity Design",
        "Design Systems",
        "Typography",
        "Color Theory",
        "User Experience",
      ],
      deliverables: [
        "Brand Guidelines",
        "Design Systems",
        "UI Component Libraries",
        "Pattern Libraries",
      ],
      principles: [
        "Visual Hierarchy",
        "Accessibility",
        "Consistency",
        "Scalability",
      ],
    },
    resources: [
      {
        name: "Buck",
        url: "https://buck.co/",
        description: "Creative leadership in design and animation",
      },
      {
        name: "Fockups",
        url: "https://fockups.com/",
        description: "Mockup generator for designers",
      },
      {
        name: "Halftone Generator",
        url: "https://halftone.xoihazard.com/",
        description: "Create custom halftone patterns",
      },
      {
        name: "The Dieline",
        url: "https://thedieline.com/",
        description: "Packaging design inspiration",
      },
      {
        name: "Pattern Library",
        url: "http://thepatternlibrary.com/",
        description: "Free patterns for designers",
      },
      {
        name: "Collletttivo",
        url: "https://www.collletttivo.it/",
        description: "Type design collective",
      },
    ],
    color: "#21cd99",
  },
];

export default function Technologies() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout>();
  const progressInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % technologies.length);
        setProgress(0);
      }, 5000);

      progressInterval.current = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 50);
    }

    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isAutoPlaying, mounted]);

  const handleTechClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setProgress(0);
  };

  if (!mounted) {
    return null;
  }

  const currentTech = technologies[currentIndex];
  const Icon = currentTech.icon;

  return (
    <section className='py-20 px-4 bg-white/50 backdrop-blur-sm paper-texture'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row gap-12'>
          {/* Left side - Title and Progress */}
          <div className='md:w-1/3'>
            <h2 className='text-gray-900 text-4xl font-bold mb-4'>
              Technical Expertise
            </h2>
            <p className='text-gray-600 text-lg mb-6'>
              Specialized in modern web technologies, AI, and design
            </p>
            <div className='h-2 bg-gray-200 rounded-full overflow-hidden mb-8'>
              <motion.div
                className='h-full bg-shamrock-400'
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Technology List */}
            <div className='space-y-3'>
              {technologies.map((tech, index) => {
                const TechIcon = tech.icon;
                const isActive = index === currentIndex;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer
                      ${
                        isActive
                          ? "bg-shamrock-50 text-gray-900"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    onClick={() => handleTechClick(index)}
                  >
                    <TechIcon
                      className={`w-5 h-5 ${
                        isActive ? "text-shamrock-400" : "text-current"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive ? "text-gray-900" : "text-current"
                      }`}
                    >
                      {tech.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Detailed Content */}
          <div className='md:w-2/3'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className='bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-shamrock-100 shadow-lg'
              >
                {/* Mobile View - Icon and Title */}
                <div className='flex flex-col items-center md:items-start gap-4 md:flex-row md:gap-6 mb-6'>
                  <div className='p-4 bg-shamrock-50 rounded-xl'>
                    <Icon className='w-8 h-8 text-shamrock-400' />
                  </div>
                  <div className='text-center md:text-left flex-1'>
                    <h3 className='text-gray-900 text-2xl font-semibold mb-3'>
                      {currentTech.title}
                    </h3>
                    <p className='text-gray-600 text-lg'>
                      {currentTech.description}
                    </p>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className='flex flex-wrap gap-3 mb-8 justify-center md:justify-start'>
                  {currentTech.skills.map((skill, index) => (
                    <span
                      key={index}
                      className='px-4 py-2 bg-shamrock-50 rounded-full text-shamrock-600 border border-shamrock-200 text-sm font-medium'
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Detailed Information */}
                {currentTech.details && (
                  <div className='space-y-6'>
                    {Object.entries(currentTech.details).map(
                      ([key, values]) => (
                        <div
                          key={key}
                          className='border-t border-gray-100 pt-6'
                        >
                          <h4 className='text-lg font-semibold text-gray-900 mb-4 capitalize'>
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {values.map((value, index) => (
                              <li
                                key={index}
                                className='flex items-center gap-2 text-gray-600'
                              >
                                <div className='w-2 h-2 rounded-full bg-shamrock-400' />
                                {value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Resources Section */}
                {currentTech.resources && (
                  <div className='mt-8 border-t border-gray-100 pt-6'>
                    <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                      Recommended Resources
                    </h4>
                    <div className='grid gap-4'>
                      {currentTech.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 hover:bg-shamrock-50 transition-colors group'
                        >
                          <Link className='w-5 h-5 text-gray-400 group-hover:text-shamrock-400' />
                          <div>
                            <div className='font-medium text-gray-900 group-hover:text-shamrock-600'>
                              {resource.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {resource.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}