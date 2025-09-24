import React from 'react';
import { motion } from 'framer-motion';

const colors = ["#ef4444", "#fb923c", "#facc15", "#4ade80", "#38bdf8", "#a78bfa", "#f472b6"];

const Confetti: React.FC = () => {
    const particles = Array.from({ length: 250 });
    
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {particles.map((_, i) => {
                const angle = (i / particles.length) * 360;
                const radius = Math.random() * 500 + 200;
                const duration = Math.random() * 2.5 + 1.0;
                const delay = Math.random() * 0.5;
                const size = Math.random() * 12 + 5;
                const color = colors[i % colors.length];
                
                return (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 rounded-full"
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: color,
                        }}
                        initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
                        animate={{
                            x: `calc(-50% + ${Math.cos(angle * Math.PI / 180) * radius}px)`,
                            y: `calc(-50% + ${Math.sin(angle * Math.PI / 180) * radius}px)`,
                            scale: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: duration,
                            ease: "easeOut",
                            delay: delay,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Confetti;