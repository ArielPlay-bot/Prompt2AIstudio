export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl: string;
  followers: number;
  following: number;
  prompts: string[]; // array of prompt IDs
  savedPrompts: string[]; // array of prompt IDs
  upvotedPrompts: string[]; // array of prompt IDs
}

export interface Author {
  id: string;
  name:string;
  avatarUrl: string;
}

export interface Comment {
    id: string;
    text: string;
    author: Author;
    createdAt: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  promptContent: string;
  tags: string[];
  author: Author;
  upvotes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Creator extends Author {
  followers: number;
  following: number;
  promptsCount: number;
  totalUpvotes: number;
}

// Fix: Add missing ExplosionState type. This type is used in Hero.tsx and Donate.tsx.
export interface ExplosionState {
  id: number;
  x: number;
  y: number;
}