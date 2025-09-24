import React from 'react';
import { useStore } from '../store';
import SummaryCard from '../components/SummaryCard';
import { motion } from 'framer-motion';

const StatCard = ({ label, value }: { label: string, value: number | string }) => (
  <div className="bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg p-4 text-center">
    <p className="text-2xl font-bold text-primary dark:text-dark-primary">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);


const FavoritesPage: React.FC = () => {
  const { currentUser, prompts } = useStore();
  
  const savedPrompts = prompts.filter(p => currentUser?.savedPrompts.includes(p.id));
  const uniqueTags = new Set(savedPrompts.flatMap(p => p.tags));

  return (
    <div className="space-y-8">
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-3xl font-bold text-foreground mb-6">My Saved Prompts</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Total Saved" value={savedPrompts.length} />
                <StatCard label="Unique Tags" value={uniqueTags.size} />
                <StatCard label="Upvotes Given" value={currentUser?.upvotedPrompts.length ?? 0} />
            </div>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedPrompts.length > 0 ? (
                savedPrompts.map((prompt, index) => (
                    <motion.div
                        key={prompt.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <SummaryCard prompt={prompt} />
                    </motion.div>
                ))
            ) : (
                <div className="col-span-full text-center py-12 bg-card dark:bg-dark-card rounded-lg">
                    <p className="text-muted-foreground">You haven't saved any prompts yet.</p>
                    <p className="text-sm text-muted-foreground mt-2">Explore prompts and click the bookmark icon to save them here.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default FavoritesPage;