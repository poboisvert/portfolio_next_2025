"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Lightbulb,
  Target,
  Users,
  Building2,
  GitBranch,
  CheckCircle2,
  Workflow,
  ArrowRight,
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Problem Discovery",
    shortDescription: "Using the 5 Whys technique to uncover root causes",
    details: [
      "What is the core problem?",
      "Why does this problem exist?",
      "Why is solving this important?",
      "Why now?",
      "Why us?",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    id: 2,
    icon: Target,
    title: "User Goals",
    shortDescription: "Understanding end-user needs and pain points",
    details: [
      "Primary user objectives",
      "Current frustrations",
      "Desired outcomes",
      "Success metrics",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    id: 3,
    icon: Building2,
    title: "Business Analysis",
    shortDescription: "Evaluating market fit and business potential",
    details: [
      "Market feasibility assessment",
      "Value proposition validation",
      "Effort vs impact analysis",
      "Competitive landscape review",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    id: 4,
    icon: Workflow,
    title: "Decision Matrix",
    shortDescription: "Prioritizing features and capabilities",
    details: [
      "Must Have: Core features essential for MVP",
      "Should Have: Important but not critical features",
      "Could Have: Desired features for future iterations",
      "Won't Have: Features outside MVP scope",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    color: "from-emerald-400 to-emerald-500",
  },
  {
    id: 5,
    icon: GitBranch,
    title: "MVP Development",
    shortDescription: "Iterative development process",
    details: [
      "Rapid prototyping",
      "User testing and feedback",
      "Iterative improvements",
      "Launch preparation",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: 6,
    icon: CheckCircle2,
    title: "Launch & Scale",
    shortDescription: "Bringing your MVP to market",
    details: [
      "Go-to-market strategy",
      "Performance monitoring",
      "User feedback collection",
      "Scaling roadmap",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    color: "from-emerald-600 to-emerald-700",
  },
];

export default function MvpProcess() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className='py-20 px-4 bg-white/50 backdrop-blur-sm paper-texture overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            From Concept to MVP
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            A systematic approach to validate and build successful products
            through proven methodologies
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredCard === step.id;
            const isLastCard = step.id === 6; // Launch & Scale card

            // Special background colors for specific indices
            const getCardBgStyle = () => {
              if (isLastCard) {
                return { backgroundColor: "#1f2937" }; // Dark gray/black
              } else if (index === 1) {
                return { backgroundColor: "rgb(162, 248, 213)" };
              } else if (index === 3) {
                return { backgroundColor: "rgb(103, 238, 193)" };
              }
              return {};
            };

            // Text colors based on background
            const getTextColors = () => {
              if (isLastCard) {
                return {
                  title: "text-white",
                  description: "text-gray-300",
                  iconBg: "bg-white/20",
                  iconText: "text-white",
                  numberBg: "bg-white/20",
                  numberText: "text-white",
                };
              } else if (index === 1 || index === 3) {
                return {
                  title: "text-gray-900",
                  description: "text-gray-800",
                  iconBg: "bg-gray-900/20",
                  iconText: "text-gray-900",
                  numberBg: "bg-gray-900/20",
                  numberText: "text-gray-900",
                };
              }
              return {
                title: "text-white",
                description: "text-white/90",
                iconBg: "bg-white/20",
                iconText: "text-white",
                numberBg: "bg-white/20",
                numberText: "text-white",
              };
            };

            const shouldUseGradient = index !== 1 && index !== 3 && !isLastCard;
            const textColors = getTextColors();

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className='group relative cursor-pointer'
                onMouseEnter={() => setHoveredCard(step.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -5 }}
              >
                {/* Card Container */}
                <div
                  className={`relative overflow-hidden rounded-3xl p-6 h-80 shadow-lg ${
                    isLastCard
                      ? "border-2 border-gray-600"
                      : shouldUseGradient
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-500"
                      : ""
                  }`}
                  style={getCardBgStyle()}
                >
                  {/* Decorative Circles - Much wider borders */}
                  <div
                    className='absolute rounded-full opacity-20'
                    style={{
                      width: "22rem",
                      height: "22rem",
                      top: "24rem",
                      right: "6rem",
                      border: `6px solid ${
                        isLastCard ? "rgb(156, 163, 175)" : "rgb(33, 205, 153)"
                      }`,
                      transform: "translate(50%, -50%)",
                    }}
                  />
                  <div
                    className='absolute rounded-full opacity-15'
                    style={{
                      width: "18rem",
                      height: "18rem",
                      top: "20rem",
                      right: "4rem",
                      border: `5px solid ${
                        isLastCard ? "rgb(156, 163, 175)" : "rgb(33, 205, 153)"
                      }`,
                      transform: "translate(50%, -50%)",
                    }}
                  />
                  <div
                    className='absolute rounded-full opacity-10'
                    style={{
                      width: "14rem",
                      height: "14rem",
                      top: "16rem",
                      right: "2rem",
                      border: `4px solid ${
                        isLastCard ? "rgb(156, 163, 175)" : "rgb(33, 205, 153)"
                      }`,
                      transform: "translate(50%, -50%)",
                    }}
                  />

                  {/* Curved Line Background Pattern */}
                  <div className='absolute inset-0 opacity-20'>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox='0 0 300 320'
                      className='absolute inset-0'
                    >
                      {/* Curved lines similar to the reference image */}
                      <path
                        d='M-50 100 Q150 50 350 100 T650 100'
                        stroke={
                          isLastCard
                            ? "rgba(156, 163, 175, 0.3)"
                            : index === 1 || index === 3
                            ? "rgba(0,0,0,0.3)"
                            : "rgba(255,255,255,0.3)"
                        }
                        strokeWidth='2'
                        fill='none'
                      />
                      <path
                        d='M-50 150 Q150 100 350 150 T650 150'
                        stroke={
                          isLastCard
                            ? "rgba(156, 163, 175, 0.2)"
                            : index === 1 || index === 3
                            ? "rgba(0,0,0,0.2)"
                            : "rgba(255,255,255,0.2)"
                        }
                        strokeWidth='1.5'
                        fill='none'
                      />
                      <path
                        d='M-50 200 Q150 150 350 200 T650 200'
                        stroke={
                          isLastCard
                            ? "rgba(156, 163, 175, 0.15)"
                            : index === 1 || index === 3
                            ? "rgba(0,0,0,0.15)"
                            : "rgba(255,255,255,0.15)"
                        }
                        strokeWidth='1'
                        fill='none'
                      />
                      <path
                        d='M-50 250 Q150 200 350 250 T650 250'
                        stroke={
                          isLastCard
                            ? "rgba(156, 163, 175, 0.1)"
                            : index === 1 || index === 3
                            ? "rgba(0,0,0,0.1)"
                            : "rgba(255,255,255,0.1)"
                        }
                        strokeWidth='1'
                        fill='none'
                      />
                    </svg>
                  </div>

                  {/* Image Container */}
                  <div
                    className={`relative mb-4 rounded-2xl overflow-hidden h-32 ${
                      isLastCard ? "bg-gray-800/50" : "bg-white/10"
                    } backdrop-blur-sm z-10`}
                  >
                    <img
                      src={step.imageSrc}
                      alt={step.title}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />

                    {/* Icon Overlay */}
                    <div
                      className={`absolute top-3 left-3 p-2 ${textColors.iconBg} backdrop-blur-sm rounded-xl`}
                    >
                      <Icon className={`w-5 h-5 ${textColors.iconText}`} />
                    </div>

                    {/* Step Number */}
                    <div
                      className={`absolute top-3 right-3 w-7 h-7 ${textColors.numberBg} backdrop-blur-sm rounded-full flex items-center justify-center`}
                    >
                      <span
                        className={`${textColors.numberText} font-bold text-sm`}
                      >
                        {step.id}
                      </span>
                    </div>
                  </div>

                  {/* Content - Hidden on hover */}
                  <motion.div
                    className='relative z-10'
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3
                      className={`text-xl font-bold ${textColors.title} mb-2`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`${textColors.description} text-sm leading-relaxed`}
                    >
                      {step.shortDescription}
                    </p>
                  </motion.div>

                  {/* Hover Overlay - Restored dark background */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className='absolute inset-0 bg-gray-900/95 backdrop-blur-sm flex flex-col justify-center p-6 z-20'
                    style={{ pointerEvents: isHovered ? "auto" : "none" }}
                  >
                    <div className='text-center'>
                      <div className='p-4 bg-emerald-400/20 rounded-xl inline-block mb-6'>
                        <Icon className='w-8 h-8 text-emerald-400' />
                      </div>

                      <div className='space-y-4'>
                        {step.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              y: isHovered ? 0 : 10,
                            }}
                            transition={{ delay: idx * 0.1 + 0.1 }}
                            className='flex items-start gap-3 text-left'
                          >
                            <div className='w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0' />
                            <span className='text-white text-sm leading-relaxed font-medium'>
                              {detail}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className='text-center mt-16'
        >
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Ready to Build Your MVP?
            </h3>
            <p className='text-gray-600 mb-6'>
              Let's transform your idea into a validated product that users love
            </p>
            <button
              onClick={() => {
                const contactSection = document.querySelector("#contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className='bg-emerald-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-500 transition-colors inline-flex items-center gap-2'
            >
              Start Your Project
              <ArrowRight className='w-5 h-5' />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
