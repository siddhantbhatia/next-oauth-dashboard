import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define authentication options using NextAuthOptions interface
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login", // Redirect users to "/login" when signing in
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
