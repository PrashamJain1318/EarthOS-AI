import React from 'react';
import { Typography, Container, EosInput, EosButton } from '@earthos/ui';
import { Globe, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const linkGroups = [
    {
      title: 'Platform',
      links: [
        { label: 'AI Scanner', href: '/scanner' },
        { label: 'Earth Passport', href: '/passport' },
        { label: 'Exchange Hub', href: '/marketplace' },
        { label: 'Carbon Wallet', href: '/wallet' }
      ]
    },
    {
      title: 'Auditing',
      links: [
        { label: 'EPR Logging', href: '/features' },
        { label: 'CSRD Compliance', href: '/features' },
        { label: 'Scope 3 Reports', href: '/features' },
        { label: 'Developer API', href: '/docs' }
      ]
    },
    {
      title: 'Organization',
      links: [
        { label: 'Read Story', href: '/about' },
        { label: 'Press Kit', href: '/about' },
        { label: 'Careers', href: '/about' },
        { label: 'Zero-Waste Goals', href: '/about' }
      ]
    }
  ];

  return (
    <footer className="border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 bg-white dark:bg-[#0B1220] py-16 relative overflow-hidden">
      <Container className="flex flex-col gap-12">
        
        {/* Main Columns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Logo & Newsletter Column */}
          <div className="lg:col-span-2 flex flex-col gap-6 items-start">
            <a href="/" className="flex items-center gap-2 text-xl font-bold font-display text-[#1F2937] dark:text-[#F8FAFC]">
              <Globe className="text-[#2E7D32]" size={24} />
              <span>EARTHOS AI</span>
            </a>
            
            <Typography variant="small" className="text-gray-400 max-w-sm leading-relaxed">
              The AI-powered Operating System for Earth's Resources. Join our circular database streams newsletter.
            </Typography>

            <div className="flex gap-2 w-full max-w-sm items-end">
              <EosInput placeholder="architect@company.com" className="flex-1" />
              <EosButton variant="primary" size="sm">Subscribe</EosButton>
            </div>
          </div>

          {/* Links Columns */}
          {linkGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1F2937] dark:text-[#F8FAFC] font-mono">
                {group.title}
              </span>
              <ul className="flex flex-col gap-2.5 text-sm text-gray-500 dark:text-gray-400">
                {group.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={link.href} className="hover:text-[#2E7D32] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Social Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#B0BEC5]/10 dark:border-[#263238]/10 pt-8 text-xs text-gray-400">
          <span>© 2026 EARTHOS AI Inc. All rights reserved. Zero-waste operations registered.</span>
          
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#2E7D32] transition-colors" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" className="hover:text-[#2E7D32] transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-[#2E7D32] transition-colors" aria-label="GitHub"><Github size={18} /></a>
          </div>
        </div>

      </Container>
    </footer>
  );
};
export default Footer;
