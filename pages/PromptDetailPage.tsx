import React, { useState } from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';
import { CopyIcon, ShareIcon, CheckIcon, UpvoteIcon, BookmarkIcon } from '../components/icons/IconPack';

const PromptDetailPage: React.FC = () => {
  const { pageParam, prompts, currentUser, toggleSavePrompt, toggleUpvotePrompt, addComment, navigateTo } = useStore();
  const prompt = prompts.find(p => p.id === pageParam);

  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!prompt) {
    return <p>Prompt not found.</p>;
  }

  const isSaved = currentUser?.savedPrompts.includes(prompt.id) ?? false;
  const isVoted = currentUser?.upvotedPrompts.includes(prompt.id) ?? false;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(prompt.id, commentText);
      setCommentText('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} className="bg-card dark:bg-dark-card p-8 rounded-lg border border-border dark:border-dark-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">{prompt.title}</h1>
          <p className="text-muted-foreground mb-6">{prompt.description}</p>
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-secondary dark:bg-dark-secondary text-foreground text-sm font-medium rounded-full">{tag}</span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ delay: 0.1 }} className="bg-card dark:bg-dark-card p-8 rounded-lg border border-border dark:border-dark-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Prompt</h2>
          <div className="bg-secondary dark:bg-dark-secondary p-4 rounded-lg relative">
            <pre className="text-foreground whitespace-pre-wrap font-mono text-sm leading-relaxed">{prompt.promptContent}</pre>
            <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-card dark:bg-dark-card rounded-md hover:bg-border dark:hover:bg-dark-border transition">
              {copied ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ delay: 0.2 }} className="bg-card dark:bg-dark-card p-8 rounded-lg border border-border dark:border-dark-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Comments ({prompt.comments.length})</h2>
          <div className="space-y-6">
            <form onSubmit={handleCommentSubmit} className="flex items-start space-x-3">
              <img src={currentUser?.avatarUrl} alt="You" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  rows={2}
                  className="w-full p-2 bg-secondary dark:bg-dark-secondary rounded-md border-border dark:border-dark-border focus:ring-primary dark:focus:ring-dark-primary"
                ></textarea>
                <button type="submit" className="mt-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">Post</button>
              </div>
            </form>
            {prompt.comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1 bg-secondary dark:bg-dark-secondary p-3 rounded-lg">
                  <p className="font-semibold text-foreground text-sm">{comment.author.name}</p>
                  <p className="text-foreground text-sm">{comment.text}</p>
                </div>
              </div>
            )).reverse()}
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} transition={{ delay: 0.3 }} className="bg-card dark:bg-dark-card p-6 rounded-lg border border-border dark:border-dark-border sticky top-24">
          <h3 className="font-semibold mb-4">Actions</h3>
          <div className="flex justify-around mb-6">
            <button onClick={() => toggleUpvotePrompt(prompt.id)} className={`flex flex-col items-center space-y-1 ${isVoted ? 'text-primary dark:text-dark-primary' : 'text-muted-foreground hover:text-primary dark:hover:text-dark-primary'}`}>
              <UpvoteIcon filled={isVoted} className="w-7 h-7" />
              <span className="text-sm font-semibold">{prompt.upvotes}</span>
            </button>
            <button onClick={() => toggleSavePrompt(prompt.id)} className={`flex flex-col items-center space-y-1 ${isSaved ? 'text-primary dark:text-dark-primary' : 'text-muted-foreground hover:text-primary dark:hover:text-dark-primary'}`}>
              <BookmarkIcon filled={isSaved} className="w-7 h-7" />
              <span className="text-sm font-semibold">Save</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-primary dark:hover:text-dark-primary">
              <ShareIcon className="w-7 h-7" />
              <span className="text-sm font-semibold">Share</span>
            </button>
          </div>
          <hr className="border-border dark:border-dark-border my-6"/>
          <h3 className="font-semibold mb-4">Author</h3>
          <div 
            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-secondary cursor-pointer"
            onClick={() => navigateTo('profile', prompt.author.id)}
          >
            <img src={prompt.author.avatarUrl} alt={prompt.author.name} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-bold text-foreground">{prompt.author.name}</p>
              <p className="text-sm text-muted-foreground">View Profile</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PromptDetailPage;