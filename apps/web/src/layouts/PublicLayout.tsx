import * as React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { EosNavbar, Container } from '@earthos/ui';
import { useUiStore } from '../stores/uiStore';
import { Sun, Moon } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useUiStore();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <EosNavbar
        links={links}
        activeHref={location.pathname}
        onLinkClick={(href) => navigate(href)}
        onLoginClick={() => navigate('/login')}
        onSignupClick={() => navigate('/signup')}
      />
      
      {/* Floating Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg border bg-white dark:bg-[#162033] border-[#B0BEC5]/30 dark:border-[#263238]/30 text-[#1F2937] dark:text-[#F8FAFC] hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all duration-200"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[#B0BEC5]/30 dark:border-[#263238]/30 py-8 bg-[#F8FAFC]/50 dark:bg-[#162033]/20">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#B0BEC5]">
          <span>© 2026 EARTHOS AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-[#1F2937] dark:hover:text-[#F8FAFC]">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#1F2937] dark:hover:text-[#F8FAFC]">Terms of Service</a>
          </div>
        </Container>
      </footer>
    </div>
  );
};
