import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma"; // Asegúrate de que prisma es una instancia de PrismaClient
import { signInEmailPassword } from "./auth/actions/auth-actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    github,
    google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          console.log("ERRORRR");
          return null;
        }

        const user = await signInEmailPassword(
          credentials.email,
          credentials.password
        );

        if (user) {
          console.log("TODO OK EN RETORNO DE USUARIO");
          return user;
        }

        return null;
      },
    }),
  ],
});
