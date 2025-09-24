
// Fix: Commented out the YAML frontmatter at the top of the file which was causing parsing errors.
/*
---
title: Sidebar Component
description: >-
  This file contains the Sidebar component, which serves as the main
  navigation for the application. It displays links to different pages, user
  profile information, and a logout button. The component uses a custom
  `NavItem` for consistent styling and behavior of navigation links, including
  different variants for standard and call-to-action (CTA) buttons. It
  integrates with a global state management solution (`useStore`) to access the
  current user's data, the current page, and navigation functions.
---
*/
import React from 'react';
import { useStore } from '../store';
import { 
  HomeIcon, TrophyIcon, TrendingUpIcon, CompassIcon, 
  PlusCircleIcon, UserIcon, BookmarkIcon, LogOutIcon, HeartIcon
} from './icons/IconPack';
import { motion } from 'framer-motion';

type NavItemProps = {
  icon: JSX.Element;
  label: string;
  page: string;
  currentPage: string;
  navigateTo: (page: any, param?: string) => void;
  param?: string;
  variant?: 'default' | 'cta';
  gradient?: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, navigateTo, param, variant = 'default', gradient }) => {
  const isActive = currentPage === page;

  const baseClasses = "flex items-center space-x-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 font-semibold text-sm";

  const variantClasses = {
    default: `
      ${isActive 
        ? 'bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary' 
        : 'text-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary hover:text-foreground dark:hover:text-dark-foreground'}
    `,
    cta: `
      bg-gradient-to-r text-primary-foreground font-bold shadow-md hover:shadow-lg [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] ${gradient} 
      ${isActive ? 'ring-2 ring-offset-2 ring-offset-card dark:ring-offset-dark-card ring-white/70' : ''}
    `
  };

  return (
    <motion.li
      onClick={() => navigateTo(page, param)}
      whileHover={variant === 'cta' ? { scale: 1.05 } : {}}
      whileTap={variant === 'cta' ? { scale: 0.95 } : {}}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {React.cloneElement(icon, { className: "w-6 h-6" })}
      <span>{label}</span>
    </motion.li>
  );
};

const Sidebar = () => {
  const { currentPage, navigateTo, logout, currentUser } = useStore();

  const handleLogout = () => {
    logout();
  };
  
  const navItems = [
    { icon: <HomeIcon />, label: "Dashboard", page: "dashboard", gradient: "from-indigo-500 to-blue-600" },
    { icon: <TrophyIcon />, label: "Leaderboard", page: "leaderboard", gradient: "from-yellow-400 to-orange-500" },
    { icon: <TrendingUpIcon />, label: "Trending", page: "trending", gradient: "from-teal-400 to-green-500" },
    { icon: <CompassIcon />, label: "Explore", page: "explore", gradient: "from-sky-500 to-cyan-600" },
    { icon: <BookmarkIcon />, label: "Favorites", page: "favorites", gradient: "from-violet-500 to-purple-600" },
    { icon: <PlusCircleIcon />, label: "Create", page: "create", gradient: "from-rose-400 to-red-500" },
    { icon: <HeartIcon />, label: "Donate", page: "donate", gradient: "from-pink-500 to-orange-400" },
    { icon: <UserIcon />, label: "My Profile", page: "profile", param: currentUser?.id, gradient: "from-emerald-400 to-lime-500" },
  ];

  return (
    <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-card dark:bg-dark-card border-r border-border dark:border-dark-border p-6 flex flex-col">
      <div className="text-2xl font-bold text-primary dark:text-dark-primary mb-10">
        PromptMarket
      </div>
      <nav className="flex-1 flex flex-col justify-between">
        <ul className="space-y-4">
          {navItems.map((item) => (
             <NavItem 
                key={item.page}
                {...item}
                currentPage={currentPage} 
                navigateTo={navigateTo}
                variant="cta"
            />
          ))}
        </ul>
        <div>
            <div
                onClick={handleLogout}
                className="flex items-center space-x-4 px-4 py-3 rounded-lg cursor-pointer text-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary transition-colors"
            >
                <LogOutIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Logout</span>
            </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;