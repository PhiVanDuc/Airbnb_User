import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GihubProvider from "next-auth/providers/github";

import { login } from "@/actions/login";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env?.GOOGLE_CLIENT_ID,
            clientSecret: process.env?.GOOGLE_CLIENT_SECRET
        }),
        GihubProvider({
            clientId: process.env?.GITHUB_CLIENT_ID,
            clientSecret: process.env?.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const loginStatus = await login(
                {
                    image: user?.image,
                    name: user?.name,
                    email: user?.email,
                    provider: account?.provider
                },
                "/auth/oauth"
            );

            if (!loginStatus?.success) return false;
            return true;
        }
    },
    pages: {
        error: "/"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };