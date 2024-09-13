import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import crypto from 'crypto'

// Initialize Prisma Client
const prisma = new PrismaClient();

function generateLicenseKey() {
  const prefix = 'LIC';
  const timestamp = Date.now().toString(36).slice(-6); // Last 6 chars of timestamp in base36
  const randomPart = crypto.randomBytes(8).toString('hex').toUpperCase(); // 16 characters
  const raw = `${prefix}-${timestamp}-${randomPart}`;
  const checksum = generateChecksum(raw);
  return `${raw}-${checksum}`;
}

function generateChecksum(str) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 4).toUpperCase();
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  logger: {
    error(code, ...message) {
      console.log(code, message)
    },
    warn(code, ...message) {
      console.log(code, message)
    },
    debug(code, ...message) {
      console.log(code, message)
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
    })
  ],
  
  database: process.env.DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Implement custom sign-in logic here if needed
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async session({ session, user }) {
      // Add user ID to the session
      if (!user.licenseKey) {
        const licenseKey = generateLicenseKey();
        await prisma.user.update({
          where: { id: user.id },
          data: { licenseKey },
        });
        user.licenseKey = licenseKey;
      }
      session.user.licenseKey = user.licenseKey;
      session.userId = user.id;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Custom logic after user creation (e.g., sending welcome email)
      
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});

// Error handling for database connection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error or exit the process
});

