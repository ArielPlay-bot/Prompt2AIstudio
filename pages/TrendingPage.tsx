import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import SummaryCard from '../components/SummaryCard';
import { motion } from 'framer-motion';

const TrendingPage: React.FC = () => {
  const { prompts } = useStore();
  const [timeFilter, setTimeFilter] = useState<'day' | 'week' | 'month'>('week');

  const trendingPrompts = useMemo(() => {
    const now = new Date();
    const filterDate = new Date();
    if (timeFilter === 'day') filterDate.setDate(now.getDate() - 1);
    else if (timeFilter === 'week') filterDate.setDate(now.getDate() - 7);
    else if (timeFilter === 'month') filterDate.setMonth(now.getMonth() - 1);

    return [...prompts]
      .filter(p => new Date(p.createdAt) > filterDate)
      .sort((a, b) => {
        // Simple trending algorithm: upvotes + (comments * 5)
        const scoreA = a.upvotes + a.comments.length * 5;
        const scoreB = b.upvotes + b.comments.length * 5;
        return scoreB - scoreA;
      })
      .slice(0, 20);
  }, [prompts, timeFilter]);

  return (
    <div className="space-y-8">
      <div className="flex justify-center bg-card dark:bg-dark-card p-2 rounded-lg border border-border dark:border-dark-border max-w-sm mx-auto">
        {(['day', 'week', 'month'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-all duration-300 ${
              timeFilter === filter 
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm' 
              : 'text-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary'
            }`}
          >
            {filter === 'day' ? '24 Hours' : filter === 'week' ? '7 Days' : '30 Days'}
          </button>
        ))}
      </div>
      
      <motion.div 
        key={timeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {trendingPrompts.length > 0 ? (
          trendingPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              <SummaryCard prompt={prompt} />
              <div className="absolute -top-3 -left-3 bg-primary dark:bg-dark-primary text-primary-foreground dark:text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                #{index + 1}
              </div>
            </motion.div>
          ))
        ) : (
            <div className="col-span-full text-center py-12 bg-card dark:bg-dark-card rounded-lg">
                <p className="text-muted-foreground">No trending prompts found for this period.</p>
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default TrendingPage;