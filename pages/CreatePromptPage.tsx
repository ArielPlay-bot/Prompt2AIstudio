import React, { useState } from 'react';
import { useStore } from '../store';
import SummaryCard from '../components/SummaryCard';
import { motion } from 'framer-motion';

const CreatePromptPage: React.FC = () => {
  const { createPrompt, navigateTo, currentUser } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [promptContent, setPromptContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ' ' || e.key === ',') && currentTag.trim()) {
      e.preventDefault();
      const newTag = currentTag.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && promptContent && tags.length > 0) {
      createPrompt({ title, description, promptContent, tags });
      navigateTo('dashboard');
    } else {
      alert("Please fill all fields and add at least one tag.");
    }
  };

  const mockPromptForPreview = {
    id: 'preview',
    title: title || 'Your Prompt Title',
    description: description || 'A short, catchy description of what your prompt does.',
    promptContent: '',
    tags: tags.length > 0 ? tags : ['tag1', 'tag2'],
    author: {
        id: currentUser!.id,
        name: currentUser!.name,
        avatarUrl: currentUser!.avatarUrl
    },
    upvotes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">Create a New Prompt</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-card dark:bg-dark-card p-8 rounded-lg border border-border dark:border-dark-border">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground">Title</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full p-2 bg-secondary dark:bg-dark-secondary rounded-md border-border dark:border-dark-border" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground">Short Description</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="mt-1 block w-full p-2 bg-secondary dark:bg-dark-secondary rounded-md border-border dark:border-dark-border"></textarea>
          </div>
          <div>
            <label htmlFor="promptContent" className="block text-sm font-medium text-foreground">Full Prompt</label>
            <textarea id="promptContent" value={promptContent} onChange={e => setPromptContent(e.target.value)} required rows={6} className="mt-1 block w-full p-2 bg-secondary dark:bg-dark-secondary rounded-md border-border dark:border-dark-border font-mono text-sm"></textarea>
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-foreground">Tags (space or comma separated)</label>
            <div className="mt-1 flex flex-wrap gap-2 items-center p-2 bg-secondary dark:bg-dark-secondary rounded-md border-border dark:border-dark-border">
              {tags.map(tag => (
                <span key={tag} className="flex items-center bg-primary/20 text-primary dark:text-dark-primary px-2 py-1 rounded text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-primary dark:text-dark-primary font-bold">x</button>
                </span>
              ))}
              <input 
                type="text"
                id="tags"
                value={currentTag}
                onChange={e => setCurrentTag(e.target.value)}
                onKeyDown={handleTagInput}
                className="flex-1 bg-transparent focus:outline-none"
                placeholder={tags.length === 0 ? "Add tags..." : ""}
              />
            </div>
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">Publish Prompt</button>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">Live Preview</h2>
        <div className="sticky top-24">
            <SummaryCard prompt={mockPromptForPreview} />
        </div>
      </motion.div>
    </div>
  );
};

export default CreatePromptPage;