import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
 
async function getLogIn(username: string, password: string) {
  try {
      const response = await fetch('https://netzwelt-devtest.azurewebsites.net/Account/SignIn', {
      method: 'POST',
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    });
    const login = await response.json();
    const displayName = login.displayName;
    return displayName
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const displayName = await getLogIn(username,password);
          console.log(displayName);
          if (displayName != null) return displayName;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});