import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [process.env.BETTER_AUTH_URL],

  advanced: {
    cookies: {
      session_token: {
        attributes: {
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
        },
      },
    },
  },
});