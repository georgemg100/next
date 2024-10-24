import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../lib/prisma';
import crypto from 'crypto';
import { addDays } from 'date-fns';
import bcrypt from 'bcryptjs';

function generateLicenseKey() {
  const prefix = 'LIC';
  const timestamp = Date.now().toString(36).slice(-6);
  const randomPart = crypto.randomBytes(8).toString('hex').toUpperCase();
  const raw = `${prefix}-${timestamp}-${randomPart}`;
  const checksum = generateChecksum(raw);
  return `${raw}-${checksum}`;
}

function generateChecksum(str) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 4).toUpperCase();
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      }
    }),
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: token.id },
        });

        if (!user.licenseKey) {
          const licenseKey = generateLicenseKey();
          const subscriptionExpiryDate = addDays(new Date(), 3);

          await prisma.user.update({
            where: { id: user.id },
            data: { licenseKey, subscriptionExpiryDate },
          });
          user.licenseKey = licenseKey;
          user.subscriptionExpiryDate = subscriptionExpiryDate;
        }

        session.user = {
          ...session.user,
          id: token.id,
          subscriptionId: user.subscriptionId,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionExpiryDate: user.subscriptionExpiryDate,
          licenseKey: user.licenseKey,
        };

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
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
};

export default NextAuth(authOptions);
