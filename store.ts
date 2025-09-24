import create from 'zustand';
import { users as initialUsers, prompts as initialPrompts, creators as initialCreators } from './data';
import type { User, Prompt, Creator, Comment, Author } from './types';

type Page = 'dashboard' | 'leaderboard' | 'trending' | 'explore' | 'create' | 'profile' | 'favorites' | 'promptDetail' | 'donate';

interface StoreState {
  users: User[];
  prompts: Prompt[];
  creators: Creator[];
  currentUser: User | null;
  currentPage: Page;
  pageParam: string | null;
  
  navigateTo: (page: Page, param?: string) => void;
  clearPageParam: () => void;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  updateProfile: (name: string, avatarUrl: string) => void;
  
  toggleSavePrompt: (promptId: string) => void;
  toggleUpvotePrompt: (promptId:string) => void;

  createPrompt: (data: { title: string; description: string; promptContent: string; tags: string[] }) => void;
  addComment: (promptId: string, text: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
    users: initialUsers,
    prompts: initialPrompts,
    creators: initialCreators,
    currentUser: null,
    currentPage: 'dashboard',
    pageParam: null,

    navigateTo: (page, param) => set({ currentPage: page, pageParam: param || undefined }),
    
    clearPageParam: () => set({ pageParam: null }),

    login: (email, password) => {
      const user = get().users.find(u => u.email === email && (u.password === password));
      if (user) {
        set({ currentUser: user, currentPage: 'dashboard' });
        return true;
      }
      return false;
    },
    
    register: (name, email) => {
      if (get().users.some(u => u.email === email)) {
          return false;
      }
      const newUser: User = {
          id: `u${get().users.length + 1}`,
          name,
          email,
          password: 'password123', // dummy password
          avatarUrl: `https://picsum.photos/seed/u${get().users.length + 1}/80/80`,
          followers: 0,
          following: 0,
          prompts: [],
          savedPrompts: [],
          upvotedPrompts: [],
      };
      set(state => ({ users: [...state.users, newUser], currentUser: newUser, currentPage: 'dashboard' }));
      return true;
    },

    logout: () => set({ currentUser: null }),
    
    updateProfile: (name, avatarUrl) => {
        set(state => {
            if (!state.currentUser) return state;
            const updatedUser = { ...state.currentUser, name, avatarUrl };
            return {
                currentUser: updatedUser,
                users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u),
            };
        });
    },

    toggleSavePrompt: (promptId) => {
      set(state => {
        if (!state.currentUser) return state;
        const savedPrompts = state.currentUser.savedPrompts.includes(promptId)
          ? state.currentUser.savedPrompts.filter(id => id !== promptId)
          : [...state.currentUser.savedPrompts, promptId];
        const updatedUser = { ...state.currentUser, savedPrompts };
        return {
          currentUser: updatedUser,
          users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u),
        };
      });
    },

    toggleUpvotePrompt: (promptId) => {
        set(state => {
            if(!state.currentUser) return state;

            const isVoted = state.currentUser.upvotedPrompts.includes(promptId);
            const upvotedPrompts = isVoted
              ? state.currentUser.upvotedPrompts.filter(id => id !== promptId)
              : [...state.currentUser.upvotedPrompts, promptId];
            
            const updatedUser = { ...state.currentUser, upvotedPrompts };

            const updatedPrompts = state.prompts.map(p => {
                if (p.id === promptId) {
                    return { ...p, upvotes: isVoted ? p.upvotes - 1 : p.upvotes + 1 };
                }
                return p;
            });

            return {
                currentUser: updatedUser,
                users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u),
                prompts: updatedPrompts,
            };
        });
    },

    createPrompt: ({ title, description, promptContent, tags }) => {
        set(state => {
            if (!state.currentUser) return state;
            const author: Author = {
                id: state.currentUser.id,
                name: state.currentUser.name,
                avatarUrl: state.currentUser.avatarUrl,
            };
            const newPrompt: Prompt = {
                id: `p${state.prompts.length + 1}`,
                title,
                description,
                promptContent,
                tags,
                author,
                upvotes: 0,
                comments: [],
                createdAt: new Date().toISOString(),
            };
            const updatedUser = { ...state.currentUser, prompts: [...state.currentUser.prompts, newPrompt.id] };
            return {
                prompts: [...state.prompts, newPrompt],
                currentUser: updatedUser,
                users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u),
            };
        });
    },

    addComment: (promptId, text) => {
        set(state => {
            if(!state.currentUser) return state;

            const author: Author = {
                id: state.currentUser.id,
                name: state.currentUser.name,
                avatarUrl: state.currentUser.avatarUrl,
            };
            const newComment: Comment = {
                id: `c${Date.now()}`,
                text,
                author,
                createdAt: new Date().toISOString(),
            };

            const updatedPrompts = state.prompts.map(p => {
                if (p.id === promptId) {
                    return { ...p, comments: [...p.comments, newComment] };
                }
                return p;
            });
            
            return { prompts: updatedPrompts };
        });
    },
}));