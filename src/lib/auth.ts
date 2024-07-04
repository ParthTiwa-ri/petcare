import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { authSchema } from "./validation";

const config = {
  pages: {
    signIn: "/login",
  },
  //   session: {
  //     maxAge: 30 * 24 * 60 * 60,
  //     strategy: "jwt",
  //   } for learning purpose,
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
  callbacks: {
    authorized: ({ auth, request }) => {
      //run on every request from middleware
      const isLogged = auth?.user;
      const isPrivate = request.nextUrl.pathname.includes("/app");
      if (isPrivate && !isLogged) {
        return false;
      }

      if (isPrivate && isLogged) {
        return true;
      }

      if (isLogged && !isPrivate) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isLogged && !isPrivate) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
