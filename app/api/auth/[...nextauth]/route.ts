import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import type { User } from '@/app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          try {
            const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
            if (!user[0]) return null;
            
            const passwordsMatch = await bcrypt.compare(password, user[0].password);
            if (passwordsMatch) return user[0] as User;
          } catch (error) {
            console.error('Failed to fetch user:', error);
            return null;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };