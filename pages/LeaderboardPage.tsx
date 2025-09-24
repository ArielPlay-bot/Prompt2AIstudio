import React from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

const LeaderboardPage: React.FC = () => {
  const { creators, navigateTo } = useStore();

  // Simple scoring: followers + (total upvotes / 10) + (prompts count * 20)
  const sortedCreators = [...creators].sort((a, b) => {
    const scoreA = a.followers + (a.totalUpvotes / 10) + (a.promptsCount * 20);
    const scoreB = b.followers + (b.totalUpvotes / 10) + (b.promptsCount * 20);
    return scoreB - scoreA;
  });

  const top3 = sortedCreators.slice(0, 3);
  const rest = sortedCreators.slice(3);

  const podiumColors = [
    'border-yellow-400', // 1st
    'border-gray-400',  // 2nd
    'border-yellow-600'  // 3rd
  ];
  const podiumOrder = [1, 0, 2]; // index for 2nd, 1st, 3rd place

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">Top Creators Podium</h2>
        <div className="flex justify-center items-end gap-4 md:gap-8">
          {podiumOrder.map(index => {
            const creator = top3[index];
            if (!creator) return null;
            return (
              <div 
                key={creator.id} 
                className={`flex flex-col items-center ${index === 0 ? 'order-2' : (index === 1 ? 'order-1' : 'order-3')}`}
                onClick={() => navigateTo('profile', creator.id)}
              >
                <span className={`text-4xl font-bold ${index === 0 ? 'text-yellow-400' : (index === 1 ? 'text-gray-400' : 'text-yellow-600')}`}>{index === 0 ? '1' : (index === 1 ? '2' : '3')}</span>
                <img src={creator.avatarUrl} alt={creator.name} className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${podiumColors[index]} shadow-lg cursor-pointer`} />
                <h3 className="mt-2 font-semibold text-lg">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">{creator.followers.toLocaleString()} followers</p>
                <div className={`p-4 rounded-b-lg w-full text-center ${index === 0 ? 'h-32 bg-primary/10 dark:bg-dark-primary/20' : 'h-24 bg-secondary dark:bg-dark-secondary'}`}></div>
              </div>
            );
          })}
        </div>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-card dark:bg-dark-card rounded-lg border border-border dark:border-dark-border overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary dark:bg-dark-secondary">
                <th className="p-4">Rank</th>
                <th className="p-4">Creator</th>
                <th className="p-4 hidden md:table-cell">Followers</th>
                <th className="p-4 hidden md:table-cell">Prompts</th>
                <th className="p-4 hidden sm:table-cell">Total Upvotes</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((creator, index) => (
                <tr 
                  key={creator.id} 
                  className="border-t border-border dark:border-dark-border hover:bg-secondary/50 dark:hover:bg-dark-secondary/50 cursor-pointer"
                  onClick={() => navigateTo('profile', creator.id)}
                >
                  <td className="p-4 font-bold">{index + 4}</td>
                  <td className="p-4 flex items-center">
                    <img src={creator.avatarUrl} alt={creator.name} className="w-10 h-10 rounded-full mr-4" />
                    <span className="font-semibold">{creator.name}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell">{creator.followers.toLocaleString()}</td>
                  <td className="p-4 hidden md:table-cell">{creator.promptsCount}</td>
                  <td className="p-4 hidden sm:table-cell">{creator.totalUpvotes.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default LeaderboardPage;