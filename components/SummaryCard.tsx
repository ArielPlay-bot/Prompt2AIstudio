import React from 'react';
import type { Prompt } from '../types';
import { useStore } from '../store';
import { BookmarkIcon, UpvoteIcon, CommentIcon } from './icons/IconPack';

interface SummaryCardProps {
  prompt: Prompt;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ prompt }) => {
  const { currentUser, navigateTo, toggleSavePrompt, toggleUpvotePrompt } = useStore();

  const isSaved = currentUser?.savedPrompts.includes(prompt.id) ?? false;
  const isVoted = currentUser?.upvotedPrompts.includes(prompt.id) ?? false;

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleSavePrompt(prompt.id);
  };
  
  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleUpvotePrompt(prompt.id);
  };

  const truncatedDescription = prompt.description.length > 120
    ? prompt.description.substring(0, 120) + '...'
    : prompt.description;

  return (
    <div
      onClick={() => navigateTo('promptDetail', prompt.id)}
      className="group bg-card border border-border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:border-dark-primary/50"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary dark:group-hover:text-dark-primary">
          {prompt.title}
        </h3>
        <button onClick={handleSaveClick} className="text-muted-foreground hover:text-primary dark:hover:text-dark-primary transition-colors">
          <BookmarkIcon filled={isSaved} />
        </button>
      </div>

      <p className="text-muted-foreground mb-4 h-20 overflow-hidden text-sm">{truncatedDescription}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {prompt.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-1 bg-secondary dark:bg-dark-secondary text-foreground text-xs font-medium rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div 
          onClick={(e) => {
            e.stopPropagation();
            navigateTo('profile', prompt.author.id);
          }}
          className="flex items-center cursor-pointer"
        >
          <img src={prompt.author.avatarUrl} alt={prompt.author.name} className="w-8 h-8 rounded-full mr-3" />
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary dark:group-hover:text-dark-primary">
            {prompt.author.name}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center space-x-1">
             <button onClick={handleVoteClick} className={`flex items-center space-x-1 transition-colors ${isVoted ? 'text-primary dark:text-dark-primary' : 'hover:text-primary dark:hover:text-dark-primary'}`}>
                <UpvoteIcon filled={isVoted}/>
                <span className="text-sm">{prompt.upvotes}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <CommentIcon />
            <span className="text-sm">{prompt.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;