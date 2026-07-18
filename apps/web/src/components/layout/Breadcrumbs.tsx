import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // We are in /app/* mode, so we want to root our breadcrumb to the specific app portal
  // e.g. /app/user/objects -> User Portal > Objects
  
  if (pathnames.length <= 1) return null;

  return (
    <nav className="flex items-center text-xs text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isRootPortal = index === 1; // e.g. 'user' in /app/user
          const isAppBase = index === 0;

          if (isAppBase) return null; // We don't render "app"

          const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

          return (
            <li key={to} className="flex items-center">
              {index > 1 && <ChevronRight size={14} className="mx-2 text-gray-400" />}
              
              {isRootPortal && index === 1 ? (
                <div className="flex items-center text-[#2E7D32] font-semibold bg-[#2E7D32]/10 px-2 py-1 rounded">
                  <Home size={12} className="mr-1.5" />
                  {formattedValue} Portal
                </div>
              ) : isLast ? (
                <span className="font-semibold text-gray-800 dark:text-gray-200" aria-current="page">
                  {formattedValue}
                </span>
              ) : (
                <Link to={to} className="hover:text-[#2E7D32] transition-colors">
                  {formattedValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
