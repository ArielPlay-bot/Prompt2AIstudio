import React from 'react';
import type { Creator } from '../types';
import { useStore } from '../store';

interface CreatorCardProps {
  creator: Creator;
  gradient: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, gradient }) => {
  const { navigateTo } = useStore();

  return (
    <div className={`rounded-lg p-6 text-white text-center shadow-lg bg-gradient-to-br ${gradient} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
      <img src={creator.avatarUrl} alt={creator.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/50" />
      <h3 className="text-xl font-bold mb-2">{creator.name}</h3>
      <div className="flex justify-center space-x-6 mb-6">
        <div>
          <p className="font-bold text-lg">{ (creator.followers / 1000).toFixed(1) }k</p>
          <p className="text-sm opacity-80">Followers</p>
        </div>
        <div>
          <p className="font-bold text-lg">{creator.following}</p>
          <p className="text-sm opacity-80">Following</p>
        </div>
      </div>
      <button 
        onClick={() => navigateTo('profile', creator.id)}
        className="w-full bg-gradient-to-r from-white/20 to-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:from-white/30 hover:to-white/40 shadow-sm hover:shadow-md"
      >
        View Profile
      </button>
    </div>
  );
};

export default CreatorCard;