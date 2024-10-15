import { Github } from 'lucide-react';
import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About UPSC Prep</h3>
            <p className="text-sm">
              UPSC Prep is your comprehensive resource for UPSC exam preparation,
              offering high-quality content for Prelims, Mains, and Interview stages.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link href="/prelims" className="hover:text-primary">Prelims</Link></li>
              <li><Link href="/mains" className="hover:text-primary">Mains</Link></li>
              <li><Link href="/interview" className="hover:text-primary">Interview</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: pgywww@gmail.com</li>
              <li>Phone: +91 8530341845</li>
              <li>Address: Boisar, Palghar, Maharashtra, India</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
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
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 <Link href="/" className="text-primary hover:underline">Heroic UPSC</Link>. Developed by <Link href="https://gaurav-wankhede.vercel.app/" target="_blank" className="text-primary hover:underline">Gaurav Wankhede</Link>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;