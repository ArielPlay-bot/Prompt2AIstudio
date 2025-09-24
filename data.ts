import type { User, Prompt, Creator } from './types';

export const users: User[] = [
  { id: 'u1', name: 'Cyber Architect', email: 'cyber@architect.io', password: 'password123', avatarUrl: 'https://picsum.photos/seed/u1/80/80', followers: 1250, following: 89, prompts: ['p1'], savedPrompts: ['p2'], upvotedPrompts: ['p1', 'p2'] },
  { id: 'u2', name: 'Lore Weaver', email: 'lore@weaver.com', password: 'password123', avatarUrl: 'https://picsum.photos/seed/u2/80/80', followers: 980, following: 123, prompts: ['p2'], savedPrompts: [], upvotedPrompts: ['p3'] },
  { id: 'u3', name: '8BitDreamer', email: '8bit@dreamer.dev', password: 'password123', avatarUrl: 'https://picsum.photos/seed/u3/80/80', followers: 2100, following: 245, prompts: ['p3', 'p4'], savedPrompts: ['p1'], upvotedPrompts: ['p1', 'p3', 'p4'] },
  { id: 'u4', name: 'Visionary Vortex', email: 'visionary@vortex.ai', password: 'password123', avatarUrl: 'https://picsum.photos/seed/c1/80/80', followers: 12400, following: 150, prompts: ['p5'], savedPrompts: [], upvotedPrompts: [] },
  { id: 'u5', name: 'Prompt Prodigy', email: 'prompt@prodigy.org', password: 'password123', avatarUrl: 'https://picsum.photos/seed/c2/80/80', followers: 9800, following: 204, prompts: [], savedPrompts: [], upvotedPrompts: [] },
  { id: 'u6', name: 'AI Artisan', email: 'ai@artisan.net', password: 'password123', avatarUrl: 'https://picsum.photos/seed/c3/80/80', followers: 15200, following: 88, prompts: [], savedPrompts: [], upvotedPrompts: [] },
];

export const prompts: Prompt[] = [
  {
    id: 'p1',
    title: 'Futuristic Cityscape Generator',
    description: 'Create breathtaking, high-detail futuristic cityscapes. Optimized for sprawling urban environments with flying vehicles and a cyberpunk aesthetic.',
    promptContent: 'Generate a sprawling futuristic cityscape at dusk, multiple layers of traffic, holographic advertisements, towering skyscrapers with unique architectural designs, style: cyberpunk, neon-lit, hyper-detailed, cinematic lighting, 8k.',
    tags: ['Sci-Fi', 'Art', 'Gaming', 'Cyberpunk', 'Cityscape'],
    author: { id: 'u1', name: 'Cyber Architect', avatarUrl: 'https://picsum.photos/seed/u1/40/40' },
    upvotes: 1250,
    createdAt: '2024-05-20T10:00:00Z',
    comments: [
      { id: 'c1', text: 'This is amazing! The results are stunning.', author: { id: 'u2', name: 'Lore Weaver', avatarUrl: 'https://picsum.photos/seed/u2/40/40' }, createdAt: '2024-05-20T11:30:00Z' }
    ],
  },
  {
    id: 'p2',
    title: 'Fantasy Character Portraits',
    description: 'Generate unique and expressive fantasy character portraits for your D&D or fantasy novel characters.',
    promptContent: 'Create a portrait of a female elf ranger, determined expression, leather armor with intricate elven carvings, long silver hair braided with leaves, background: misty forest at dawn, style: fantasy realism, detailed face, LOTR-inspired.',
    tags: ['Fantasy', 'Character Design', 'TTRPG'],
    author: { id: 'u2', name: 'Lore Weaver', avatarUrl: 'https://picsum.photos/seed/u2/40/40' },
    upvotes: 980,
    createdAt: '2024-05-19T14:20:00Z',
    comments: [],
  },
   {
    id: 'p3',
    title: 'Pixel Art Sprite Sheet Creator',
    description: 'A prompt for creating retro-style pixel art sprite sheets. Ideal for indie game developers.',
    promptContent: 'Generate a 16-bit pixel art sprite sheet for a knight character. Include idle (4 frames), walk cycle (6 frames), and attack (4 frames) animations. Character should have silver armor and a blue cape. Background must be transparent.',
    tags: ['Pixel Art', 'Game Dev', 'Retro'],
    author: { id: 'u3', name: '8BitDreamer', avatarUrl: 'https://picsum.photos/seed/u3/40/40' },
    upvotes: 2100,
    createdAt: '2024-05-21T09:00:00Z',
    comments: [],
  },
  {
    id: 'p4',
    title: 'Cozy Interior Design Ideas',
    description: 'Generate beautiful and cozy interior design concepts for living rooms, bedrooms, or studies.',
    promptContent: 'Interior design concept for a cozy living room, Scandinavian style. Features: fireplace, comfortable sofa with knit blankets, large window with natural light, lots of houseplants, warm wood tones, and a soft rug. Style: photorealistic, warm and inviting, Architectural Digest.',
    tags: ['Interior Design', 'Lifestyle', 'Cozy'],
    author: { id: 'u3', name: '8BitDreamer', avatarUrl: 'https://picsum.photos/seed/u3/40/40' },
    upvotes: 1800,
    createdAt: '2024-05-18T18:00:00Z',
    comments: [],
  },
  {
    id: 'p5',
    title: 'Abstract Logo Concepts',
    description: 'Create modern, minimalist, and abstract logo concepts for tech startups.',
    promptContent: 'Generate a collection of 9 abstract, minimalist logos for a tech company named "Quantum Leap". Use geometric shapes, clean lines, and a color palette of deep blue and silver. Style: vector, modern, professional, Behance-worthy.',
    tags: ['Logo Design', 'Branding', 'Minimalist'],
    author: { id: 'u4', name: 'Visionary Vortex', avatarUrl: 'https://picsum.photos/seed/c1/40/40' },
    upvotes: 3200,
    createdAt: '2024-05-22T11:00:00Z',
    comments: [],
  },
];

export const creators: Creator[] = [
  { id: 'u4', name: 'Visionary Vortex', avatarUrl: 'https://picsum.photos/seed/c1/80/80', followers: 12400, following: 150, promptsCount: 25, totalUpvotes: 85000 },
  { id: 'u6', name: 'AI Artisan', avatarUrl: 'https://picsum.photos/seed/c3/80/80', followers: 15200, following: 88, promptsCount: 40, totalUpvotes: 120000 },
  { id: 'u5', name: 'Prompt Prodigy', avatarUrl: 'https://picsum.photos/seed/c2/80/80', followers: 9800, following: 204, promptsCount: 18, totalUpvotes: 65000 },
  { id: 'u1', name: 'Cyber Architect', avatarUrl: 'https://picsum.photos/seed/u1/80/80', followers: 1250, following: 89, promptsCount: 12, totalUpvotes: 15000 },
  { id: 'u3', name: '8BitDreamer', avatarUrl: 'https://picsum.photos/seed/u3/80/80', followers: 2100, following: 245, promptsCount: 30, totalUpvotes: 45000 },
  { id: 'u2', name: 'Lore Weaver', avatarUrl: 'https://picsum.photos/seed/u2/80/80', followers: 980, following: 123, promptsCount: 8, totalUpvotes: 9000 },
];