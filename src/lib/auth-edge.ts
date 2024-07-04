import { NextAuthConfig } from "next-auth";

export const nextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  //   session: {
  //     maxAge: 30 * 24 * 60 * 60,
  //     strategy: "jwt",
  //   } for learning purpose,

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
  providers: [],
} satisfies NextAuthConfig;
