"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";

const SmokeParticle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1, 2],
      x: [-10, -30],
      y: [0, -20],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeOut",
    }}
    className='absolute right-0 top-1/2 w-2 h-2 rounded-full bg-[#21cd99]/20'
  />
);

const FlyingPlane = ({
  initialX,
  initialY,
  delay,
}: {
  initialX: number;
  initialY: number;
  delay: number;
}) => (
  <motion.div
    initial={{ x: initialX, y: initialY, opacity: 0 }}
    animate={{
      x: [
        initialX,
        typeof window !== "undefined" ? window.innerWidth + 100 : 1000,
      ],
      y: [
        initialY,
        initialY - 100,
        initialY + 100,
        initialY - 50,
        initialY + 50,
        initialY,
      ],
      opacity: [0, 1, 1, 1, 1, 0],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    }}
    className='absolute text-[#21cd99]'
  >
    <motion.div
      animate={{
        y: [-20, 20, -20],
        rotate: [-30, -45, -30],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className='relative'
    >
      <Send size={24} className='rotate-90' />
      {[...Array(5)].map((_, i) => (
        <SmokeParticle key={i} delay={i * 0.2} />
      ))}
    </motion.div>
  </motion.div>
);

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.querySelector("section:last-child");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className='relative flex items-center justify-center px-4 py-12 overflow-hidden min-h-screen pt-24 md:pt-12'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            linear-gradient(to right, #21cd99 1px, transparent 1px),
            linear-gradient(to bottom, #21cd99 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Flying Paper Planes */}
      <FlyingPlane initialX={-100} initialY={100} delay={0} />
      <FlyingPlane initialX={-200} initialY={300} delay={5} />
      <FlyingPlane initialX={-300} initialY={200} delay={10} />

      {/* Content Container */}
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-20'>
        {/* Left Content */}
        <div className='lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start'>
          {/* Profile Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='relative inline-flex items-center justify-center mb-8'
          >
            {/* Outer glow effect */}
            <div className='absolute inset-[-8px] rounded-full bg-[#21cd99]/20 blur-md' />
            {/* Spinning border */}
            <div className='absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#21cd99] to-[#21cd99]/80 p-[6px] animate-spin-slow' />
            {/* Inner white border */}
            <div className='absolute inset-0 rounded-full border-[6px] border-white' />
            <img
              src='https://avatars.githubusercontent.com/u/34973976?v=4'
              alt='Developer Profile'
              className='w-28 h-28 rounded-full relative z-10 object-cover'
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'
          >
            Pierre-Olivier
            <br />
            Boisvert
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-xl text-gray-600 mb-10 max-w-2xl lg:max-w-none'
          >
            Seize the digital spotlight and boost your business with modern web
            solutions. Specialized in Python, Next.js, and full-stack
            development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto'
          >
            <button
              onClick={scrollToContact}
              className='bg-[#21cd99] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#21cd99]/20 w-full sm:w-auto'
            >
              Book a Consultation
              <ArrowRight className='w-5 h-5' />
            </button>
            <Link
              href='/work'
              className='bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-[#21cd99] transition-colors w-full sm:w-auto text-center'
            >
              Discover More
            </Link>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='lg:w-1/2'
        >
          <div className='relative w-full max-w-xl mx-auto'>
            <img
              src='/hero_banner_1.png'
              alt='Website wireframes and UI components'
              className='w-full h-auto rounded-2xl'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-white/80 to-transparent rounded-2xl' />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
