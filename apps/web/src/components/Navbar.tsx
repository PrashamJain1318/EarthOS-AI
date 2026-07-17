import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useUiStore } from '../stores/uiStore';
import { EosButton } from '@earthos/ui';

interface NavLink {
  label: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useUiStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const links: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' }
  ];

  // Track page scroll to toggle backdrop blur/intensity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation: Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close mobile drawer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle navigation links click
  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    navigate(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/70 dark:bg-[#0B1220]/75 backdrop-blur-lg border-[#B0BEC5]/30 dark:border-[#263238]/30 shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="flex items-center gap-2 group text-xl font-bold font-display text-[#1F2937] dark:text-[#F8FAFC] select-none"
          aria-label="EARTHOS AI Home"
        >
          <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-[#2E7D32]/10 dark:bg-[#2E7D32]/20 border border-[#2E7D32]/30 transition-transform group-hover:scale-105 duration-200">
            <Globe className="text-[#2E7D32] h-5 w-5" />
          </div>
          <span className="tracking-tight">
            EARTHOS <span className="text-[#2E7D32]">AI</span>
          </span>
        </a>

        {/* Desktop Links (With slide indicators on hover) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Desktop Navigation">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`relative py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] rounded-md ${
                  isActive
                    ? 'text-[#2E7D32] font-semibold'
                    : 'text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E7D32] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Controls (Theme + CTA buttons) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border bg-white/40 dark:bg-[#162033]/40 border-[#B0BEC5]/30 dark:border-[#263238]/30 text-[#1F2937] dark:text-[#F8FAFC] hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] transition-all"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <EosButton variant="secondary" size="sm" onClick={() => navigate('/login')}>
            Log In
          </EosButton>
          <EosButton variant="primary" size="sm" onClick={() => navigate('/signup')}>
            Get Started
          </EosButton>
        </div>

        {/* Mobile controls & Toggle */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border bg-white/40 dark:bg-[#162033]/40 border-[#B0BEC5]/30 dark:border-[#263238]/30 text-[#1F2937] dark:text-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-[#1F2937] dark:text-[#F8FAFC] hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Framer Motion Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden w-full border-t border-[#B0BEC5]/20 dark:border-[#263238]/20 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-lg overflow-hidden"
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            <div className="py-6 px-6 flex flex-col gap-4">
              {links.map((link, idx) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`text-base font-medium py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4] rounded-md ${
                      isActive ? 'text-[#2E7D32] font-semibold' : 'text-[#B0BEC5]'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}

              <hr className="border-[#B0BEC5]/30 dark:border-[#263238]/30 my-2" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: links.length * 0.05 }}
                className="flex flex-col gap-2"
              >
                <EosButton
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/login');
                  }}
                >
                  Log In
                </EosButton>
                <EosButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/signup');
                  }}
                >
                  Get Started
                </EosButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
