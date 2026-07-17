import * as React from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { EosButton } from './EosButton';
import { Container } from './Container';
import { cn } from '../utils';

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links: NavbarLink[];
  activeHref?: string;
  onLinkClick?: (href: string) => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  logoText?: string;
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;
}

export const EosNavbar: React.FC<NavbarProps> = ({
  links,
  activeHref,
  onLinkClick,
  onLoginClick,
  onSignupClick,
  logoText = 'EARTHOS AI',
  isLoggedIn = false,
  userAvatar,
  userName
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#0B1220]/80 backdrop-blur-md border-b border-[#B0BEC5]/30 dark:border-[#263238]/30">
      <Container className="flex items-center justify-between h-16">
        {/* Logo Lockup */}
        <a 
          href="/" 
          onClick={(e) => {
            if (onLinkClick) {
              e.preventDefault();
              onLinkClick('/');
            }
          }}
          className="flex items-center gap-2 text-xl font-bold font-display text-[#1F2937] dark:text-[#F8FAFC]"
        >
          <Globe className="text-[#2E7D32]" size={24} />
          <span>{logoText}</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(link.href);
                }
              }}
              className={cn(
                'text-sm font-medium transition-colors text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC]',
                {
                  'text-[#2E7D32] dark:text-[#2E7D32] font-semibold': activeHref === link.href
                }
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth Controls */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full border border-gray-300" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm">
                  {userName?.substring(0, 1).toUpperCase() || 'U'}
                </div>
              )}
              <span className="text-sm font-medium text-[#1F2937] dark:text-[#F8FAFC]">{userName}</span>
            </div>
          ) : (
            <>
              <EosButton variant="secondary" size="sm" onClick={onLoginClick}>
                Log In
              </EosButton>
              <EosButton variant="primary" size="sm" onClick={onSignupClick}>
                Sign Up
              </EosButton>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 rounded-lg text-[#1F2937] dark:text-[#F8FAFC] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Drawer */}
      {isOpen ? (
        <div className="md:hidden border-b border-[#B0BEC5]/30 dark:border-[#263238]/30 bg-white dark:bg-[#0B1220] py-4 px-6 flex flex-col gap-4 animate-slide-in">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(link.href);
                }
              }}
              className={cn('text-base font-medium text-[#B0BEC5]', {
                'text-[#2E7D32] font-semibold': activeHref === link.href
              })}
            >
              {link.label}
            </a>
          ))}
          <hr className="border-[#B0BEC5]/30 dark:border-[#263238]/30 my-2" />
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm">
                {userName?.substring(0, 1).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-[#1F2937] dark:text-[#F8FAFC]">{userName}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <EosButton variant="secondary" size="md" onClick={() => { setIsOpen(false); onLoginClick?.(); }}>
                Log In
              </EosButton>
              <EosButton variant="primary" size="md" onClick={() => { setIsOpen(false); onSignupClick?.(); }}>
                Sign Up
              </EosButton>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
};
