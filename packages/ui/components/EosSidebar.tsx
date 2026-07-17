import * as React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '../utils';

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeHref?: string;
  onItemClick?: (href: string) => void;
  onLogoutClick?: () => void;
  orgName?: string;
  logoIcon?: React.ReactNode;
}

export const EosSidebar: React.FC<SidebarProps> = ({
  items,
  activeHref,
  onItemClick,
  onLogoutClick,
  orgName = 'EARTHOS AI',
  logoIcon
}) => {
  return (
    <aside className="w-64 h-screen border-r border-[#B0BEC5]/30 dark:border-[#263238]/30 bg-white dark:bg-[#162033]/40 backdrop-blur-md flex flex-col justify-between p-6 shrink-0">
      <div className="flex flex-col gap-8">
        {/* Header Branding */}
        <div className="flex items-center gap-3 px-2">
          {logoIcon ? (
            <div className="text-[#2E7D32]">{logoIcon}</div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-[#2E7D32] flex items-center justify-center font-bold text-white">E</div>
          )}
          <span className="font-display font-bold text-lg text-[#1F2937] dark:text-[#F8FAFC]">
            {orgName}
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1.5">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (onItemClick) {
                    e.preventDefault();
                    onItemClick(item.href);
                  }
                }}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-[#B0BEC5] hover:text-[#1F2937] dark:hover:text-[#F8FAFC] hover:bg-black/5 dark:hover:bg-white/5',
                  {
                    'text-[#2E7D32] dark:text-[#2E7D32] bg-green-50/50 dark:bg-green-950/10 border-l-4 border-[#2E7D32] font-semibold rounded-l-none': isActive
                  }
                )}
              >
                <span className={cn('transition-colors', { 'text-[#2E7D32]': isActive })}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      {onLogoutClick ? (
        <button
          onClick={onLogoutClick}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors w-full text-left"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      ) : null}
    </aside>
  );
};
