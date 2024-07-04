import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { authSchema } from "./validation";
import { nextAuthConfig } from "./auth-edge";

const config = {
  ...nextAuthConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        //validate credentials
        const validatedCredentials = authSchema.safeParse(credentials);
        if (!validatedCredentials.success) {
          return null;
        }

        //runs on login
        const { email, password } = validatedCredentials.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          console.log("No user found");
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
