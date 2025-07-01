"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    className='absolute right-0 top-1/2 w-2 h-2 rounded-full bg-shamrock-400/20'
  />
);

const FloatingSVGShape = ({
  delay,
  x,
  y,
  size = 60,
  shape,
  color,
  opacity,
}: {
  delay: number;
  x: number;
  y: number;
  size?: number;
  shape: 'circle' | 'triangle' | 'semicircle' | 'square' | 'hexagon';
  color: string;
  opacity: number;
}) => {
  const renderShape = () => {
    switch (shape) {
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill={color} fillOpacity={opacity} />
          </svg>
        );
      case 'triangle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,10 90,80 10,80" fill={color} fillOpacity={opacity} />
          </svg>
        );
      case 'semicircle':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <path d="M 10 50 A 40 40 0 0 1 90 50 Z" fill={color} fillOpacity={opacity} />
          </svg>
        );
      case 'square':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" rx="8" fill={color} fillOpacity={opacity} />
          </svg>
        );
      case 'hexagon':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon points="50,5 85,25 85,75 50,95 15,75 15,25" fill={color} fillOpacity={opacity} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      className={`absolute hidden lg:block`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {renderShape()}
      </motion.div>
    </motion.div>
  );
};

// Random colors array
const colors = [
  '#FF6B6B', // Coral
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Mint
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Seafoam
  '#F7DC6F', // Light Yellow
  '#BB8FCE', // Lavender
  '#85C1E9', // Light Blue
  '#F8C471', // Peach
  '#82E0AA', // Light Green
];

const shapes: Array<'circle' | 'triangle' | 'semicircle' | 'square' | 'hexagon'> = [
  'circle', 'triangle', 'semicircle', 'square', 'hexagon'
];

// Generate random floating shapes
const generateRandomShapes = () => {
  const shapeElements = [];
  for (let i = 0; i < 12; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const randomSize = 40 + Math.random() * 60; // Size between 40-100
    const randomX = 5 + Math.random() * 90; // X position between 5-95%
    const randomY = 10 + Math.random() * 80; // Y position between 10-90%
    const randomDelay = Math.random() * 2; // Delay between 0-2 seconds
    const randomOpacity = 0.2 + Math.random() * 0.6; // Opacity between 0.2-0.8

    shapeElements.push(
      <FloatingSVGShape
        key={i}
        delay={randomDelay}
        x={randomX}
        y={randomY}
        size={randomSize}
        shape={randomShape}
        color={randomColor}
        opacity={randomOpacity}
      />
    );
  }
  return shapeElements;
};

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className='relative flex items-center justify-center px-4 py-12 overflow-hidden min-h-screen pt-24 md:pt-12 paper-texture noise-overlay'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-5'
        style={{
          backgroundImage: `
            linear-gradient(to right, #21cd99 1px, transparent 1px),
            linear-gradient(to bottom, #21cd99 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Random Floating SVG Shapes - Only render on client */}
      {isClient && generateRandomShapes()}

      {/* Content Container */}
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-20'>
        {/* Left Content */}
        <div className='w-full lg:w-1/2 text-left'>
          {/* Greeting and Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <h1 className='text-5xl md:text-7xl font-bold text-gray-900 mb-6'>
              Hi, I'm{" "}
              <span className='text-shamrock-400'>Pierre-Olivier</span>, a{" "}
              <span className='text-shamrock-600'>full-stack developer</span>
            </h1>
            <p className='text-xl md:text-2xl text-gray-700 mb-2'>
              with a passion for modern web solutions
            </p>
            <p className='text-xl md:text-2xl text-gray-700'>
              and innovative digital experiences
            </p>
          </motion.div>

          {/* Professional Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mb-8'
          >
            <p className='text-lg text-gray-600 mb-4'>
              Frontend Developer at{" "}
              <a
                href='https://4thwhale.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-shamrock-600 font-semibold hover:text-shamrock-700 transition-colors inline-flex items-center gap-1'
              >
                4th Whale Marketing
                <ExternalLink className='w-4 h-4' />
              </a>
            </p>
            <p className='text-lg text-gray-600 mb-4'>
              Previously worked with{" "}
              <span className='font-semibold text-gray-800'>Scotiabank</span>, and various startups
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mb-10'
          >
            <p className='text-lg text-gray-600'>
              Graduated from{" "}
              <a
                href='https://www.utoronto.ca'
                target='_blank'
                rel='noopener noreferrer'
                className='text-shamrock-600 font-semibold hover:text-shamrock-700 transition-colors inline-flex items-center gap-1'
              >
                University of Toronto
                <ExternalLink className='w-4 h-4' />
              </a>{" "}
              and{" "}
              <a
                href='https://www.ulaval.ca'
                target='_blank'
                rel='noopener noreferrer'
                className='text-shamrock-600 font-semibold hover:text-shamrock-700 transition-colors inline-flex items-center gap-1'
              >
                Laval University
                <ExternalLink className='w-4 h-4' />
              </a>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-4'
          >
            <button
              onClick={scrollToContact}
              className='bg-shamrock-400 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-shamrock-400/20 hover:bg-shamrock-500 transition-colors'
            >
              Book a Consultation
              <ArrowRight className='w-5 h-5' />
            </button>
            <Link
              href='/work'
              className='bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-shamrock-400 hover:bg-white transition-colors text-center'
            >
              View My Work
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='w-full lg:w-1/2 relative'
        >
          <div className='relative max-w-2xl mx-auto'>
            {/* Main Dashboard Container */}
            <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-shamrock-100'>
              {/* Browser Header */}
              <div className='flex items-center gap-2 mb-6 pb-4 border-b border-gray-200'>
                <div className='flex gap-2'>
                  <div className='w-3 h-3 bg-red-400 rounded-full' />
                  <div className='w-3 h-3 bg-yellow-400 rounded-full' />
                  <div className='w-3 h-3 bg-green-400 rounded-full' />
                </div>
                <div className='flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-500'>
                  boisvert.blockchain
                </div>
              </div>

              {/* Dashboard Content */}
              <div className='space-y-6'>
                {/* Profile Section */}
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 bg-gradient-to-br from-shamrock-400 to-shamrock-600 rounded-full flex items-center justify-center'>
                    <span className='text-white font-bold text-xl'>PO</span>
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900'>Pierre-Olivier Boisvert</h3>
                    <p className='text-gray-600'>Full-Stack Developer</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-lg mb-2 flex items-center justify-center'>
                      <span className='text-white text-sm'>📊</span>
                    </div>
                    <p className='text-sm text-gray-600'>Projects</p>
                    <p className='text-2xl font-bold text-gray-900'>50+</p>
                  </div>
                  
                  <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4'>
                    <div className='w-8 h-8 bg-green-500 rounded-lg mb-2 flex items-center justify-center'>
                      <span className='text-white text-sm'>🎯</span>
                    </div>
                    <p className='text-sm text-gray-600'>Experience</p>
                    <p className='text-2xl font-bold text-gray-900'>6+ Years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Chat Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              className='absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-2xl shadow-lg'
            >
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
                <div className='w-2 h-2 bg-white rounded-full animate-pulse' style={{ animationDelay: '0.2s' }} />
                <div className='w-2 h-2 bg-white rounded-full animate-pulse' style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}