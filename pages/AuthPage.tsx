import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
// Fix: Import `CompassIcon` which was missing.
import { HomeIcon, TrophyIcon, PlusCircleIcon, CompassIcon } from '../components/icons/IconPack';

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
    const svgContent = () => {
        switch (type) {
            case 'circle': return <circle cx="12" cy="12" r="10" {...commonProps} />;
            case 'square': return <rect x="2" y="2" width="20" height="20" rx="2" {...commonProps} />;
            case 'triangle': return <polygon points="12 2 22 22 2 22" {...commonProps} />;
            case 'diamond': return <polygon points="12 2 22 12 12 22 2 12" {...commonProps} />;
            case 'plus': return <path d="M12 2V22M2 12H22" {...commonProps} />;
            default: return null;
        }
    };
    return <svg viewBox="0 0 24 24" width="100%" height="100%">{svgContent()}</svg>
});

const AnimatedShapesBackground: React.FC = () => {
    const shapes = useMemo(() => {
        const shapeTypes = ['circle', 'square', 'triangle', 'diamond', 'plus'];
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            type: shapeTypes[i % shapeTypes.length],
            color: neonColors[i % neonColors.length],
            size: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
        }));
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {shapes.map(shape => (
                <motion.div
                    key={shape.id}
                    className="absolute"
                    style={{
                        left: shape.left,
                        top: `-${shape.size}px`,
                        width: shape.size,
                        height: shape.size,
                    }}
                    animate={{
                        y: '100vh',
                    }}
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
    );
};

// --- End: Geometric Shapes Animation Components ---

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, users } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let success = false;
    if (isLogin) {
      if (!email || !password) {
        setError('Please enter email and password.');
        return;
      }
      success = login(email, password);
      if (!success) {
        setError('Invalid email or password.');
      }
    } else {
      if (!name || !email) {
        setError('Please enter your name and email.');
        return;
      }
      success = register(name, email);
      if (!success) {
        setError('An account with this email already exists.');
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };
  
  const handleDemoAccess = () => {
      if (users.length > 0) {
          setEmail(users[0].email);
          setPassword(users[0].password || 'password123');
      }
  };

  return (
    <div className="min-h-screen bg-secondary dark:bg-dark-background flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedShapesBackground />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl bg-card/60 dark:bg-dark-card/60 backdrop-blur-xl border border-border/20 dark:border-dark-border/20 rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 text-foreground hidden md:block">
                <h1 className="text-3xl font-extrabold mb-4 text-primary dark:text-dark-primary">PromptMarket</h1>
                <p className="mb-8 text-lg">Unlock the full potential of AI with our community-driven marketplace.</p>
                <ul className="space-y-6">
                    <li className="flex items-start">
                        <div className="p-2 bg-primary/10 dark:bg-dark-primary/20 rounded-full mr-4"><CompassIcon /></div>
                        <div>
                            <h3 className="font-semibold">Explore Thousands of Prompts</h3>
                            <p className="text-sm text-muted-foreground">Find the perfect prompt for any task, from art generation to complex problem-solving.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="p-2 bg-primary/10 dark:bg-dark-primary/20 rounded-full mr-4"><TrophyIcon /></div>
                        <div>
                            <h3 className="font-semibold">Join Top Creators</h3>
                            <p className="text-sm text-muted-foreground">Learn from the best and climb the leaderboards by creating high-quality prompts.</p>
                        </div>
                    </li>
                     <li className="flex items-start">
                        <div className="p-2 bg-primary/10 dark:bg-dark-primary/20 rounded-full mr-4"><PlusCircleIcon /></div>
                        <div>
                            <h3 className="font-semibold">Share Your Creations</h3>
                            <p className="text-sm text-muted-foreground">Monetize your skills by sharing your own unique prompts with our growing community.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="p-8 md:p-12 bg-card/80 dark:bg-dark-card/80">
                <h2 className="text-3xl font-extrabold text-center text-foreground mb-2">
                {isLogin ? 'Welcome Back!' : 'Join PromptMarket'}
                </h2>
                <p className="text-center text-muted-foreground mb-8">
                {isLogin ? 'Sign in to continue your journey.' : 'Create an account to start exploring.'}
                </p>
                
                {isLogin && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={handleDemoAccess}
                        className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg text-center cursor-pointer hover:bg-primary/20 transition"
                    >
                        <p className="text-sm text-primary dark:text-dark-primary font-semibold">Click here for Demo Access</p>
                        <p className="text-xs text-muted-foreground">Fills fields with a test user.</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? 'login' : 'register'}
                        initial={{ opacity: 0, x: isLogin ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLogin ? -20 : 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                    {!isLogin && (
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full p-3 bg-secondary dark:bg-dark-secondary rounded-md border border-border dark:border-dark-border" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full p-3 bg-secondary dark:bg-dark-secondary rounded-md border border-border dark:border-dark-border" />
                    </div>
                    {isLogin && (
                        <div>
                        <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full p-3 bg-secondary dark:bg-dark-secondary rounded-md border border-border dark:border-dark-border" />
                        </div>
                    )}
                    </motion.div>
                </AnimatePresence>

                {error && <p className="text-sm text-red-500 text-center mt-4">{error}</p>}

                <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {isLogin ? 'Login' : 'Create Account'}
                </button>
                </form>
                
                <p className="text-center text-sm text-muted-foreground mt-8">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={toggleForm} className="font-semibold text-primary dark:text-dark-primary hover:underline ml-1">
                    {isLogin ? 'Sign up' : 'Sign in'}
                </button>
                </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;