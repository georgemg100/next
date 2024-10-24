import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { setCookie } from 'nookies';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate a session token (this should be done by NextAuth)
    // const sessionToken = await prisma.session.create({
    //   data: {
    //     sessionToken: Math.random().toString(36).substring(2),
    //     userId: user.id,
    //     expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    //   },
    // });

    // if (sessionToken) {
    //   // Set the session token in the response cookies
    //   setCookie({ res }, 'next-auth.session-token', sessionToken.sessionToken, {
    //     maxAge: 30 * 24 * 60 * 60,
    //     path: '/',
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //   });

      res.status(201).json({ message: 'User created and logged in successfully', email });
    // } else {
    //   res.status(500).json({ error: 'Failed to create session' });
    // }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
