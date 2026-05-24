import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

// Export individual hooks for easy use in components
export const { 
  signIn, 
  signOut, 
  signUp,
  useSession,
} = authClient;