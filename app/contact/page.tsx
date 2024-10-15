"use client"

import { Github, Instagram, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className='flex flex-col'>
      <div className="w-full p-4">
        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
        <ul className="space-y-4">
          <li className='py-2'>
            <span className="font-semibold">Email:</span> gauravanilwankhede2002@gmail.com
          </li>
          <li className='py-2'>
            <span className="font-semibold">Phone:</span> +91 8530341845
          </li>
          <li className='py-2'>
            <span className="font-semibold">Location:</span> Boisar, Maharashtra, India
          </li>
          <li className='py-2'>
            <span className="font-semibold">Social Media:</span>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.linkedin.com/in/gaurav-wankhede-5244101b8/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <Linkedin size={24} className="md:w-8 md:h-8" />
              </a>
              <a href="https://github.com/Gaurav-Wankhede" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <Github size={24} className="md:w-8 md:h-8" />
              </a>
              <a href="https://www.instagram.com/_gaurav_wankhede_/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <Instagram size={24} className="md:w-8 md:h-8" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}