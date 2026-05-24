import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  // Email and password login
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // we'll turn this on later with Resend
  },

  // Session settings
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days — user stays logged in for a week
    updateAge: 60 * 60 * 24,      // refresh session every 24 hours
  },

  // Your app info
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  // Trust these headers from your server
  trustedOrigins: [process.env.BETTER_AUTH_URL],
});