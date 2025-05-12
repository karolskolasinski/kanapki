import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import { getUserByCredentials } from "./users";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await getUserByCredentials(credentials.email, credentials.password);

        return !user ? null : user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 365,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
