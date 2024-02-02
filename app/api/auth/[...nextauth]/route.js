import prisma from "@/lib/db";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { mergeCarts } from "@/lib/cart";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
    events: {
        async signIn({ user }) {
            await mergeCarts(user.id);
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
