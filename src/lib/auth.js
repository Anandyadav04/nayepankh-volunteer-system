import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          // If no users exist in DB, create the first admin dynamically (for demo purposes)
          const usersCount = await prisma.user.count();
          if (usersCount === 0 && credentials.email === 'admin@nayepankh.com') {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                email: 'admin@nayepankh.com',
                passwordHash: hashedPassword
              }
            });
            return { id: newUser.id, email: newUser.email };
          }
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
};
