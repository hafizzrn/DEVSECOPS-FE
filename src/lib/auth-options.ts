import { login } from "@/features/auth/services/login-service";
import { NEXTAUTH_SECRET } from "@/lib/env";
import { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleApiError } from "./error";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "cashflow@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          return await login(credentials);
        } catch (error) {
            throw new Error(handleApiError(error) || "Gagal masuk!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        access_token: token.access_token as string,
        ...session.user,
      };
      return session;
    },
  },
  secret: NEXTAUTH_SECRET,
};
