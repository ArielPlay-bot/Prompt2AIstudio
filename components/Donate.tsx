import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeartIcon from './icons/HeartIcon';
import Confetti from './Confetti';
import Explosion from './Explosion';
import { ExplosionState } from '../types';
import { useStore } from '../store';

// --- Start: Gradient Lines Animation Components ---

const gradientLines = [
    'from-pink-500 to-yellow-500',
    'from-purple-500 to-indigo-500',
    'from-green-400 to-blue-500',
    'from-red-500 to-orange-500',
    'from-teal-400 to-cyan-600',
    'from-fuchsia-500 to-pink-500',
    'from-sky-400 to-blue-600',
    'from-lime-400 to-green-600',
    'from-rose-400 to-red-600',
    'from-violet-500 to-purple-600',
];

const AnimatedLinesBackground: React.FC = () => {
    const lines = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            gradient: gradientLines[i % gradientLines.length],
            width: Math.random() * 3 + 1, // Line thickness
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 10,
        }));
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
            {lines.map(line => (
                <motion.div
                    key={line.id}
                    className={`absolute h-full bg-gradient-to-b ${line.gradient}`}
                    style={{
                        left: line.left,
                        top: '-100%',
                        width: line.width,
                    }}
                    animate={{
                        y: '200vh',
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: line.duration,
                        delay: line.delay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};
// --- End: Gradient Lines Animation Components ---


const DonatePage: React.FC = () => {
  const [donated, setDonated] = useState(false);
  const [explosions, setExplosions] = useState<ExplosionState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = useStore();

  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!containerRef.current) return;

    setDonated(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const newExplosion: ExplosionState = {
      id: Date.now(),
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2,
    };
    setExplosions(prev => [...prev, newExplosion]);
  };

  const removeExplosion = (id: number) => {
    setExplosions(prev => prev.filter(ex => ex.id !== id));
  };
  
  const donationTiers = [
    { amount: '$5', title: 'Coffee Supporter', description: 'Help keep our servers running!' },
    { amount: '$15', title: 'Prompt Enthusiast', description: 'Fuel the creation of new features.' },
    { amount: '$50', title: 'Community Patron', description: 'Make a significant impact on our growth.' },
  ];

  return (
    <div 
      className="relative w-full min-h-[70vh] flex items-center justify-center p-4 overflow-hidden"
    >
      <AnimatedLinesBackground />
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl bg-card/60 dark:bg-dark-card/60 backdrop-blur-xl border border-border/20 dark:border-dark-border/20 rounded-2xl shadow-2xl p-8 md:p-12 text-center"
      >
        {donated && <Confetti />}

        {explosions.map(ex => (
          <Explosion key={ex.id} x={ex.x} y={ex.y} onComplete={() => removeExplosion(ex.id)} />
        ))}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full"
        >
          {donated ? (
            <>
              <HeartIcon className="w-24 h-24 text-pink-500 mx-auto mb-4" />
              <h1 className="text-4xl font-extrabold text-foreground mb-4">Thank You!</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Your support means the world to us. It helps us continue building and improving PromptMarket for everyone.
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button 
                  onClick={() => setDonated(false)} 
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Make Another Donation
                </button>
                <button 
                  onClick={() => navigateTo('dashboard')} 
                  className="px-6 py-2.5 bg-secondary dark:bg-dark-secondary text-foreground dark:text-dark-foreground font-semibold rounded-full hover:bg-border dark:hover:bg-dark-border transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          ) : (
            <>
              <HeartIcon className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              <h1 className="text-4xl font-extrabold text-foreground mb-4">Support PromptMarket</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                We are a community-driven platform. Your donations help us maintain the infrastructure, develop new features, and support our creators.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {donationTiers.map(tier => (
                  <motion.div 
                    key={tier.title}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    className="bg-secondary/50 dark:bg-dark-secondary/50 p-6 rounded-lg border border-border dark:border-dark-border flex flex-col"
                  >
                    <h2 className="text-2xl font-bold text-primary dark:text-dark-primary">{tier.amount}</h2>
                    <h3 className="text-lg font-semibold my-2">{tier.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">{tier.description}</p>
                    <button onClick={handleDonateClick} className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Donate Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;