import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';
import { ExplosionState } from '../types';
import Explosion from './Explosion';
import { SearchIcon } from './icons/IconPack';

// --- Start: Geometric Shapes Animation Components ---

const neonColors = [
    '#39ff14', '#fe019a', '#01fef4', '#fefd01', '#ff0054', '#ff9900', '#00f7ff', '#ff00ff',
    '#00ff00', '#ffff00', '#ff4500', '#7b03fc', '#00ffff', '#ff1493', '#fde910', '#00ff7f',
    '#ff69b4', '#adff2f', '#ff00bf', '#00c5cd'
];

const Shape = React.memo(({ type, color }: { type: string, color: string }) => {
    const commonProps = {
        fill: "none",
        stroke: color,
        strokeWidth: 1,
        style: { filter: `drop-shadow(0 0 8px ${color})` },
    };
    switch (type) {
        case 'circle': return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" {...commonProps} /></svg>;
        case 'square': return <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" {...commonProps} /></svg>;
        case 'triangle': return <svg viewBox="0 0 24 24"><polygon points="12 2 22 22 2 22" {...commonProps} /></svg>;
        case 'diamond': return <svg viewBox="0 0 24 24"><polygon points="12 2 22 12 12 22 2 12" {...commonProps} /></svg>;
        case 'plus': return <svg viewBox="0 0 24 24"><path d="M12 2V22M2 12H22" {...commonProps} /></svg>;
        default: return null;
    }
});

// --- End: Geometric Shapes Animation Components ---

const Hero: React.FC = () => {
  const { navigateTo, currentUser } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [explosions, setExplosions] = useState<ExplosionState[]>([]);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const shapes = useMemo(() => {
    const shapeTypes = ['circle', 'square', 'triangle', 'diamond', 'plus'];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      type: shapeTypes[i % shapeTypes.length],
      color: neonColors[i % neonColors.length],
      size: Math.random() * 30 + 15,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
  }, []);
  
  const checkCollisions = useCallback(() => {
    if (!heroContainerRef.current) return;
    const containerBounds = heroContainerRef.current.getBoundingClientRect();
    const floorY = containerBounds.bottom - 1; 

    shapeRefs.current.forEach((shapeEl, index) => {
        if (!shapeEl) return;
        const shapeBounds = shapeEl.getBoundingClientRect();

        if (shapeBounds.bottom >= floorY && shapeBounds.top < floorY + 10) {
            const explosionX = shapeBounds.left + shapeBounds.width / 2 - containerBounds.left;
            const explosionY = shapeBounds.bottom - containerBounds.top;

            if (!explosions.some(ex => Math.abs(ex.y - explosionY) < 30 && Math.abs(ex.x - explosionX) < 30)) {
                setExplosions(prev => [...prev, {
                    id: Date.now() + index,
                    x: explosionX,
                    y: explosionY,
                }]);
            }
        }
    });
  }, [explosions]);

  useEffect(() => {
      const interval = setInterval(checkCollisions, 100);
      return () => clearInterval(interval);
  }, [checkCollisions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('explore', searchQuery.trim());
    }
  };

  const removeExplosion = (id: number) => {
    setExplosions(prev => prev.filter(ex => ex.id !== id));
  };

  return (
    <div 
      ref={heroContainerRef}
      className="relative text-center bg-card dark:bg-dark-card rounded-lg p-8 md:p-16 overflow-hidden border border-border dark:border-dark-border"
    >
        <div className="absolute inset-0 z-0">
            {shapes.map((shape, i) => (
                <motion.div
                    key={shape.id}
                    ref={el => shapeRefs.current[i] = el}
                    className="absolute"
                    style={{
                        left: shape.left,
                        top: `-${shape.size}px`,
                        width: shape.size,
                        height: shape.size,
                    }}
                    animate={{ y: '100vh' }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: shape.duration,
                        delay: shape.delay,
                        ease: 'linear',
                    }}
                >
                    <Shape type={shape.type} color={shape.color} />
                </motion.div>
            ))}
        </div>

      {explosions.map(ex => (
        <Explosion key={ex.id} x={ex.x} y={ex.y} onComplete={() => removeExplosion(ex.id)} colors={neonColors} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Welcome, {currentUser?.name}!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover, create, and share the best AI prompts. Your next masterpiece starts here.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
              <SearchIcon className="text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., 'cyberpunk city' or 'fantasy character'"
              className="w-full pl-14 pr-32 py-4 text-lg bg-card/80 dark:bg-dark-card/80 rounded-full border-2 border-border dark:border-dark-border focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent transition"
            />
            <button 
              ref={exploreButtonRef}
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Explore
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Hero;