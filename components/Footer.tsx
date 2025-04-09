"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className='relative bg-gray-900 text-white'>
      {/* Footer Content */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-3 gap-8'>
          {/* Brand Section */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Digital Excellence</h3>
            <p className='text-gray-400'>
              Crafting exceptional digital experiences with modern web
              solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#21cd99] transition-colors'
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#21cd99] transition-colors'
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#21cd99] transition-colors'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-400 hover:text-[#21cd99] transition-colors'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Connect</h3>
            <div className='flex space-x-4'>
              <a
                href='https://github.com/poboisvert'
                className='text-gray-400 hover:text-[#21cd99] transition-colors'
                aria-label='Github'
              >
                <Github size={24} />
              </a>
              <a
                href='https://www.linkedin.com/in/pierre-olivier-boisvert-a83b5796/'
                className='text-gray-400 hover:text-[#21cd99] transition-colors'
                aria-label='LinkedIn'
              >
                <Linkedin size={24} />
              </a>
              {/*
              <a
                href='#'
                className='text-gray-400 hover:text-[#21cd99] transition-colors'
                aria-label='Email'
              >
                <Mail size={24} />
              </a>
              */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center text-gray-400 mt-12 pt-8 border-t border-gray-800'>
          <p>
            &copy; {new Date().getFullYear()} Pierre-Olivier Boisvert. Make No
            Small Plan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
