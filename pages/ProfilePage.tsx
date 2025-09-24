import React, { useState } from 'react';
import { useStore } from '../store';
import SummaryCard from '../components/SummaryCard';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const { pageParam, currentUser, users, prompts, updateProfile } = useStore();
  const profileUser = users.find(u => u.id === pageParam) || currentUser;
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profileUser?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(profileUser?.avatarUrl || '');

  if (!profileUser) {
    return <p>User not found.</p>;
  }

  const userPrompts = prompts.filter(p => p.author.id === profileUser.id);
  const isOwnProfile = currentUser?.id === profileUser.id;

  const handleSave = () => {
    updateProfile(name, avatarUrl);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card dark:bg-dark-card p-8 rounded-lg border border-border dark:border-dark-border flex flex-col md:flex-row items-center gap-8"
      >
        <div className="relative">
          <img src={avatarUrl} alt={name} className="w-32 h-32 rounded-full ring-4 ring-primary dark:ring-dark-primary ring-offset-4 ring-offset-card dark:ring-offset-dark-card" />
        </div>
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="space-y-2">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold bg-secondary dark:bg-dark-secondary p-2 rounded w-full"/>
                <input type="text" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} className="text-sm bg-secondary dark:bg-dark-secondary p-2 rounded w-full"/>
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-foreground">{name}</h1>
          )}
          <p className="text-muted-foreground">{profileUser.email}</p>
          <div className="flex justify-center md:justify-start space-x-6 mt-4">
            <div><span className="font-bold">{profileUser.followers}</span> Followers</div>
            <div><span className="font-bold">{profileUser.following}</span> Following</div>
            <div><span className="font-bold">{userPrompts.length}</span> Prompts</div>
          </div>
        </div>
        {isOwnProfile && (
          <div className="self-start">
            {isEditing ? (
              <div className="flex space-x-2">
                <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                Edit Profile
              </button>
            )}
          </div>
        )}
      </motion.div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">{isOwnProfile ? 'My Prompts' : `${profileUser.name}'s Prompts`}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPrompts.length > 0 ? (
            userPrompts.map(prompt => <SummaryCard key={prompt.id} prompt={prompt} />)
          ) : (
            <p className="text-muted-foreground col-span-full text-center">This user hasn't created any prompts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;