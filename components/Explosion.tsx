import React from 'react';
import { motion } from 'framer-motion';

interface ExplosionProps {
  x: number;
  y: number;
  onComplete: () => void;
  particleCount?: number;
  colors?: string[];
}

const defaultColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'];

const Explosion: React.FC<ExplosionProps> = ({ x, y, onComplete, particleCount = 80, colors = defaultColors }) => {
  // Generate particles with unique properties
  const particles = React.useMemo(() => Array.from({ length: particleCount }).map(() => ({
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 4 + 2, // particle size between 2px and 6px
    duration: Math.random() * 0.6 + 0.5, // duration between 0.5s and 1.1s
    radius: Math.random() * 280 + 70, // explosion radius between 70px and 350px
  })), [particleCount, colors]);
  
  const particleVariants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    animate: (i: number) => {
      const particle = particles[i];
      const angle = (i / particleCount) * 2 * Math.PI;
      return {
        x: Math.cos(angle) * particle.radius,
        y: Math.sin(angle) * particle.radius,
        opacity: 0,
        transition: {
          duration: particle.duration,
          ease: "easeOut"
        }
      }
    }
  };

  const shockwaveVariants = {
      initial: {
          scale: 0,
          opacity: 0.8,
          borderWidth: '40px',
      },
      animate: {
          scale: 1,
          opacity: 0,
          borderWidth: '0px',
          transition: {
              duration: 0.4,
              ease: "easeOut"
          }
      }
  };

  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{ left: x, top: y, x: '-50%', y: '-50%' }}
      initial="initial"
      animate="animate"
      onAnimationComplete={onComplete}
    >
        {/* Shockwave effect */}
        <motion.div
            className="absolute top-0 left-0 w-2 h-2 rounded-full"
            style={{ 
                borderColor: colors[0],
                x: '-50%', y: '-50%' 
            }}
            variants={shockwaveVariants}
        />

        {/* Particles effect */}
        {particles.map((particle, i) => (
            <motion.div
            key={i}
            className="absolute top-0 left-0 rounded-full"
            style={{ 
                backgroundColor: particle.color, 
                boxShadow: `0 0 8px ${particle.color}`,
                width: particle.size,
                height: particle.size,
                x: '-50%', y: '-50%'
            }}
            custom={i}
            variants={particleVariants}
            />
      ))}
    </motion.div>
  );
};

export default Explosion;