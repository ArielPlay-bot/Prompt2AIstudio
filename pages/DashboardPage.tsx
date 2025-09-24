import React from 'react';
import { useStore } from '../store';
import SummaryCard from '../components/SummaryCard';
import CreatorCard from '../components/CreatorCard';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const creatorCardGradients = [
  'from-purple-500 to-indigo-500',
  'from-green-400 to-blue-500',
  'from-pink-500 to-orange-500',
];

const StatCard = ({ label, value }: { label: string, value: number | string }) => (
  <div className="bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg p-4 text-center">
    <p className="text-2xl font-bold text-primary dark:text-dark-primary">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const DashboardPage: React.FC = () => {
  const { currentUser, prompts, creators } = useStore();
  
  const featuredPrompts = prompts.slice(0, 3);
  const topCreators = creators.slice(0, 3);

  return (
    <div className="space-y-12">
      <Hero />

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">Your Activity Snapshot</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Prompts Created" value={currentUser?.prompts.length ?? 0} />
          <StatCard label="Upvotes Given" value={currentUser?.upvotedPrompts.length ?? 0} />
          <StatCard label="Saved Prompts" value={currentUser?.savedPrompts.length ?? 0} />
          <StatCard label="Followers" value={currentUser?.followers ?? 0} />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPrompts.map((prompt) => (
            <SummaryCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">Top Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topCreators.map((creator, index) => (
            <CreatorCard key={creator.id} creator={creator} gradient={creatorCardGradients[index % creatorCardGradients.length]} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default DashboardPage;