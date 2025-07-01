"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Linkedin } from "lucide-react";

const workItems = [
  {
    slug: "pomme-olive",
    title: "POMME & OLIVE",
  },
  {
    slug: "pca-services",
    title: "PCA Services",
  },
  {
    slug: "proxim-pharmacie-du-village",
    title: "Pharmacie du Village",
  },
  {
    slug: "condollo",
    title: "Condollo - AI Home Valuation",
  },
  {
    slug: "bettingnews",
    title: "Betting News Platform",
  },
  {
    slug: "ladies-night",
    title: "ComediHa! Comedy Show",
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-shamrock-400/10'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex gap-6 items-center'>
          <Link
            href='/'
            className='text-gray-800 hover:text-shamrock-400 transition-colors'
          >
            Home
          </Link>
          <div className='relative'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='flex items-center gap-1 text-gray-800 hover:text-shamrock-400 transition-colors'
              onMouseEnter={() => setIsOpen(true)}
            >
              Work
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-shamrock-400/10'
                  onMouseLeave={() => setIsOpen(false)}
                >
                  {workItems.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/work/${item.slug}`}
                      className={`
                        block px-4 py-3 text-gray-700 hover:text-shamrock-400 hover:bg-shamrock-50 transition-colors
                        ${index === 0 ? "rounded-t-xl" : ""}
                        ${index === workItems.length - 1 ? "rounded-b-xl" : ""}
                      `}
                    >
                      {item.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href='/github'
            className='text-gray-800 hover:text-shamrock-400 transition-colors'
          >
            GitHub Projects
          </Link>
          <button
            onClick={scrollToContact}
            className='text-gray-800 hover:text-shamrock-400 transition-colors'
          >
            Get in Touch
          </button>
        </div>
        <motion.a
          whileHover={{ scale: 1.1 }}
          href='https://www.linkedin.com/in/pierre-olivier-boisvert-a83b5796/'
          className='text-gray-800 hover:text-shamrock-400 transition-colors'
        >
          <Linkedin size={24} />
        </motion.a>
      </div>
    </nav>
  );
}
