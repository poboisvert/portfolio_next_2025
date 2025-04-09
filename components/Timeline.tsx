"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Briefcase,
  MapPin,
  Code,
  Server,
} from "lucide-react";

const timelineItems = [
  {
    date: "October 2021",
    title: "Joined 4th Whale Marketing",
    description:
      "I was offered and accepted a position as a Business Intelligence, and later moved up to Frontend Developer. Technologies: Airflow (Celery Worker), AWS QuickSight, Python 3+, Next.js, and MySQL",
    icon: Server,
    tags: ["Airflow", "AWS", "Python", "Next.js", "MySQL"],
  },
  {
    date: "April 2021",
    title: "Freelance Full Stack Developer",
    description:
      "Completed a WordPress project for ComediHa!, developed a landing page for realtors, and created ETL processes in PowerBI to streamline data analysis and reporting.",
    icon: Code,
    tags: ["WordPress", "PowerBI", "ETL"],
  },
  {
    date: "November 2019",
    title: "Joined BrainFinance",
    description:
      "A prominent fintech company providing responsible credit solutions across Canadian provinces, as Director of Underwriting, overseeing daily originations of $50,000 to $250,000 and analyzing charge-off and write-off metrics.",
    icon: Building2,
    tags: ["Fintech", "Credit Analysis", "Risk Management"],
  },
  {
    date: "July 2018",
    title: "Commercial Banking at Scotiabank",
    description:
      "Started my career at Scotiabank as a Lending Analyst, later promoted to Commercial Solutions Analyst, where I was working on a portfolio composed of Growth (<$5MM) and Core ($5MM-$25MM) middle-market clients.",
    icon: Briefcase,
    tags: ["Commercial Banking", "Portfolio Management"],
  },
  {
    date: "June 2018",
    title: "Moved to Montreal, QC",
    description:
      "Moved to Montreal, QC in August 2018. Montreal is a vibrant city known for its strong technology and banking sectors in Canada.",
    icon: MapPin,
    tags: ["Relocation", "Career Move"],
  },
  {
    date: "April 2018",
    title: "Finished my MBA",
    description:
      "Finished my MBA in Strategy and Technologies, which equipped me with advanced management skills and a deep understanding of the intersection of business and technology.",
    icon: GraduationCap,
    tags: ["MBA", "Strategy", "Technology"],
  },
];

export default function Timeline() {
  return (
    <section className='py-20 px-4 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Professional Journey
          </h2>
          <p className='text-xl text-gray-600'>
            A timeline of my career milestones and achievements
          </p>
        </motion.div>

        <div className='relative'>
          {/* Timeline Line - Hidden on mobile, shown on md and up */}
          <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#21cd99]/0 via-[#21cd99] to-[#21cd99]/0' />

          {/* Timeline Items */}
          {timelineItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:justify-end" : ""
                } mb-12 md:mb-24`}
              >
                {/* Content */}
                <div
                  className={`
                    w-full md:w-5/12 
                    ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} 
                    ${index % 2 === 0 ? "md:text-right" : "md:text-left"}
                    flex flex-col items-start md:items-end
                  `}
                >
                  <div className='bg-white rounded-2xl p-6 shadow-lg border border-[#21cd99]/10 w-full'>
                    {/* Mobile Icon - Shown only on mobile */}
                    <div className='flex md:hidden items-center gap-3 mb-4'>
                      <div className='p-2 bg-[#21cd99] rounded-full'>
                        <Icon className='w-5 h-5 text-white' />
                      </div>
                      <span className='text-[#21cd99] text-sm font-medium'>
                        {item.date}
                      </span>
                    </div>

                    {/* Desktop Date - Hidden on mobile */}
                    <span className='hidden md:inline-block px-3 py-1 bg-[#21cd99]/10 text-[#21cd99] rounded-full text-sm font-medium mb-3'>
                      {item.date}
                    </span>

                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-gray-600 mb-4'>{item.description}</p>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : "justify-start"
                      }`}
                    >
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className='px-3 py-1 bg-[#21cd99]/5 text-[#21cd99] rounded-full text-sm'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop Icon - Hidden on mobile */}
                <div className='hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#21cd99] rounded-full items-center justify-center shadow-lg'>
                  <Icon className='w-6 h-6 text-white' />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
