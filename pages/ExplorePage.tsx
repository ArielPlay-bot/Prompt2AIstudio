import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../store';
import SummaryCard from '../components/SummaryCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, ChevronDownIcon } from '../components/icons/IconPack';

const ExplorePage: React.FC = () => {
  const { prompts, creators, pageParam, currentPage, clearPageParam } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'upvotes' | 'comments'>('newest');
  const [filtersVisible, setFiltersVisible] = useState(true);

  useEffect(() => {
    if (currentPage === 'explore' && pageParam) {
        setSearchQuery(pageParam);
        clearPageParam(); // Consume the parameter so it's not reused
    }
  }, [pageParam, currentPage, clearPageParam]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    prompts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [prompts]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredPrompts = useMemo(() => {
    let filtered = [...prompts];

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p => selectedTags.every(t => p.tags.includes(t)));
    }
    if (selectedAuthor) {
      filtered = filtered.filter(p => p.author.id === selectedAuthor);
    }

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'upvotes') {
      filtered.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === 'comments') {
      filtered.sort((a, b) => b.comments.length - a.comments.length);
    }

    return filtered;
  }, [prompts, searchQuery, selectedTags, selectedAuthor, sortBy]);

  return (
    <div className="space-y-8">
      <div className="bg-card dark:bg-dark-card p-4 rounded-lg border border-border dark:border-dark-border">
        <div className="relative mb-4">
          <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-secondary dark:bg-dark-secondary rounded-lg border-transparent focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent transition"
          />
        </div>
        
        <button onClick={() => setFiltersVisible(!filtersVisible)} className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-4">
          Advanced Filters <ChevronDownIcon className={`ml-1 transition-transform ${filtersVisible ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {filtersVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="w-full p-2 bg-secondary dark:bg-dark-secondary rounded-lg border border-border dark:border-dark-border">
                    <option value="newest">Newest</option>
                    <option value="upvotes">Most Upvoted</option>
                    <option value="comments">Most Commented</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Author</label>
                  <select value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)} className="w-full p-2 bg-secondary dark:bg-dark-secondary rounded-lg border border-border dark:border-dark-border">
                    <option value="">All Authors</option>
                    {creators.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                        selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm'
                        : 'bg-secondary hover:bg-secondary/80 dark:bg-dark-secondary dark:hover:bg-dark-secondary/80 text-foreground'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrompts.map(prompt => (
          <SummaryCard key={prompt.id} prompt={prompt} />
        ))}
        {filteredPrompts.length === 0 && <p className="col-span-full text-center text-muted-foreground">No prompts match your criteria.</p>}
      </div>
    </div>
  );
};

export default ExplorePage;