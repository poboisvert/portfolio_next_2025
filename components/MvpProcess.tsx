"use client";

import { motion } from "framer-motion";
import {
  Send,
  Lightbulb,
  Target,
  Users,
  Building2,
  GitBranch,
  CheckCircle2,
  Workflow,
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Problem Discovery",
    description: "Using the 5 Whys technique to uncover root causes",
    details: [
      "What is the core problem?",
      "Why does this problem exist?",
      "Why is solving this important?",
      "Why now?",
      "Why us?",
    ],
  },
  {
    icon: Target,
    title: "User Goals",
    description: "Understanding end-user needs and pain points",
    details: [
      "Primary user objectives",
      "Current frustrations",
      "Desired outcomes",
      "Success metrics",
    ],
  },
  {
    icon: Building2,
    title: "Business Analysis",
    description: "Evaluating market fit and business potential",
    matrix: [
      ["Feasibility", "Value"],
      ["Effort", "Impact"],
    ],
  },

  {
    icon: GitBranch,
    title: "MVP Development",
    description: "Iterative development process",
    phases: ["Prototype", "Test", "Iterate", "Launch"],
  },
  {
    icon: Workflow,
    title: "Decision Matrix",
    description: "Prioritizing features and capabilities",
    criteria: [
      {
        name: "Must Have",
        description: "Core features essential for MVP",
      },
      {
        name: "Should Have",
        description: "Important but not critical features",
      },
      {
        name: "Could Have",
        description: "Desired features for future iterations",
      },
      {
        name: "Won't Have",
        description: "Features outside MVP scope",
      },
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function MvpProcess() {
  return (
    <section className='py-20 px-4 bg-gray-50 overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <motion.h2
            {...fadeInUp}
            className='text-4xl font-bold text-gray-900 mb-4'
          >
            From Concept to MVP
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className='text-xl text-gray-600'
          >
            A systematic approach to validate and build successful products
          </motion.p>
        </motion.div>

        {/* Mobile View */}
        <div className='md:hidden space-y-6'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className='bg-white rounded-2xl p-6 shadow-lg border border-[#21cd99]/10'
              >
                <div className='flex items-center gap-4 mb-4'>
                  <div className='p-3 bg-[#21cd99]/10 rounded-xl'>
                    <Icon className='w-6 h-6 text-[#21cd99]' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {step.title}
                  </h3>
                </div>

                <p className='text-gray-600 mb-4'>{step.description}</p>

                {step.details && (
                  <ul className='space-y-2'>
                    {step.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className='flex items-center gap-2 text-gray-700'
                      >
                        <CheckCircle2 className='w-4 h-4 text-[#21cd99]' />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                {step.matrix && (
                  <div className='grid grid-cols-2 gap-2'>
                    {step.matrix.map((row, rowIdx) =>
                      row.map((cell, cellIdx) => (
                        <div
                          key={`${rowIdx}-${cellIdx}`}
                          className='p-2 bg-[#21cd99]/5 rounded-lg text-center text-gray-700'
                        >
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {step.criteria && (
                  <div className='space-y-2'>
                    {step.criteria.map((criterion, idx) => (
                      <div key={idx} className='p-2 bg-[#21cd99]/5 rounded-lg'>
                        <div className='font-medium text-gray-900'>
                          {criterion.name}
                        </div>
                        <div className='text-sm text-gray-600'>
                          {criterion.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.phases && (
                  <div className='flex flex-wrap gap-2'>
                    {step.phases.map((phase, idx) => (
                      <div
                        key={idx}
                        className='p-2 bg-[#21cd99]/5 rounded-lg text-sm text-gray-700'
                      >
                        {phase}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Desktop/Tablet View */}
        <div className='hidden md:block relative'>
          {/* Center Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-8 bg-[#21cd99] rounded-full shadow-xl'
          >
            <Send size={48} className='text-white' />
          </motion.div>

          {/* Connecting Lines */}
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute inset-0 border-2 border-dashed border-[#21cd99] rounded-full transform scale-75' />
            <div className='absolute inset-0 border-2 border-dashed border-[#21cd99] rounded-full transform scale-90' />
            <div className='absolute inset-0 border-2 border-dashed border-[#21cd99] rounded-full' />
          </div>

          {/* Process Steps */}
          <div className='relative w-full aspect-square max-w-[1200px] mx-auto'>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const angle = (index * 360) / steps.length;
              const radius = 42; // Percentage of container width

              // Calculate position using trigonometry
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className='absolute w-72'
                  style={{
                    left: `${50 + x}%`,
                    top: `${50 + y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className='bg-white rounded-2xl p-6 shadow-lg border border-[#21cd99]/10'>
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='p-3 bg-[#21cd99]/10 rounded-xl'>
                        <Icon className='w-6 h-6 text-[#21cd99]' />
                      </div>
                      <h3 className='text-xl font-semibold text-gray-900'>
                        {step.title}
                      </h3>
                    </div>

                    <p className='text-gray-600 mb-4'>{step.description}</p>

                    {step.details && (
                      <ul className='space-y-2'>
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className='flex items-center gap-2 text-gray-700'
                          >
                            <CheckCircle2 className='w-4 h-4 text-[#21cd99]' />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.matrix && (
                      <div className='grid grid-cols-2 gap-2'>
                        {step.matrix.map((row, rowIdx) =>
                          row.map((cell, cellIdx) => (
                            <div
                              key={`${rowIdx}-${cellIdx}`}
                              className='p-2 bg-[#21cd99]/5 rounded-lg text-center text-gray-700'
                            >
                              {cell}
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {step.criteria && (
                      <div className='space-y-2'>
                        {step.criteria.map((criterion, idx) => (
                          <div
                            key={idx}
                            className='p-2 bg-[#21cd99]/5 rounded-lg'
                          >
                            <div className='font-medium text-gray-900'>
                              {criterion.name}
                            </div>
                            <div className='text-sm text-gray-600'>
                              {criterion.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.phases && (
                      <div className='flex flex-wrap gap-2'>
                        {step.phases.map((phase, idx) => (
                          <div
                            key={idx}
                            className='p-2 bg-[#21cd99]/5 rounded-lg text-sm text-gray-700'
                          >
                            {phase}
                          </div>
                        ))}
                      </div>
                    )}
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
