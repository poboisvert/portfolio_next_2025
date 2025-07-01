"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Building2, GraduationCap } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    date: "2024 - Present",
    title: "Frontend Developer",
    company: "4th Whale Marketing",
    location: "Remote",
    description: "Leading frontend development initiatives, creating modern web applications with React, Next.js, and TypeScript.",
    icon: Building2,
    color: "from-shamrock-400 to-shamrock-600",
  },
  {
    id: 2,
    date: "2020 - 2024",
    title: "Full Stack Developer",
    company: "Scotiabank",
    location: "Toronto, ON",
    description: "Developed and maintained banking applications, worked with large-scale systems and implemented security best practices.",
    icon: Building2,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    date: "2018 - 2020",
    title: "Software Developer",
    company: "Various Startups",
    location: "Montreal, QC",
    description: "Worked with multiple startups building MVPs, implementing new features, and scaling applications.",
    icon: Building2,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    date: "2016 - 2018",
    title: "Computer Science",
    company: "University of Toronto",
    location: "Toronto, ON",
    description: "Focused on software engineering, algorithms, and data structures. Participated in various coding competitions.",
    icon: GraduationCap,
    color: "from-orange-400 to-orange-600",
  },
  {
    id: 5,
    date: "2014 - 2016",
    title: "Software Engineering",
    company: "Laval University",
    location: "Quebec City, QC",
    description: "Foundation in software development principles, mathematics, and computer science fundamentals.",
    icon: GraduationCap,
    color: "from-green-400 to-green-600",
  },
];

export default function Timeline() {
  return (
    <section className="hidden py-20 px-4 bg-white/30 backdrop-blur-sm paper-texture">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-600">
            My career path and educational background
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-shamrock-400 via-blue-400 to-green-400"></div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${event.color} shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-shamrock-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {event.title}
                        </h3>
                        <p className="text-shamrock-600 font-semibold">
                          {event.company}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 mt-2 md:mt-0">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}