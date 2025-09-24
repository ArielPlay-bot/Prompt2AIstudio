import React from 'react';
import { useStore } from '../store';
import ThemeToggle from './ThemeToggle';
import { SearchIcon, BellIcon } from './icons/IconPack';

const Header: React.FC = () => {
  const { currentUser, navigateTo } = useStore();

  return (
    <header className="sticky top-0 z-30 bg-card/80 dark:bg-dark-card/80 backdrop-blur-sm border-b border-border dark:border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:p-8 flex items-center justify-between h-20">
        <div className="flex-1 flex items-center">
            {/* Mobile menu button could go here */}
            <div className="relative w-full max-w-sm md:max-w-md xl:max-w-lg">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <SearchIcon className="text-muted-foreground" />
                </div>
                <input 
                    type="text" 
                    placeholder="Search for prompts, creators, or tags..."
                    className="w-full pl-12 pr-4 py-3 bg-secondary dark:bg-dark-secondary rounded-lg border-2 border-transparent focus:bg-card dark:focus:bg-dark-card focus:border-primary dark:focus:border-dark-primary focus:outline-none transition-all duration-300"
                />
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary dark:bg-dark-secondary text-muted-foreground hover:text-foreground dark:hover:text-dark-foreground transition-colors">
                <BellIcon />
            </button>
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('profile', currentUser?.id)}>
                <img 
                    src={currentUser?.avatarUrl} 
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full"
                />
                <div className="hidden md:block">
                    <p className="font-semibold text-sm text-foreground">{currentUser?.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;