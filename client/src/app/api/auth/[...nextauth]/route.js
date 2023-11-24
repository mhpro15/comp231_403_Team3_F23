import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null;
          }

          if (password != user.password) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    user: {
      name: "name",
      username: "username",
      email: "email",
      image: "image",
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, user, token }) {
      // // session.user.username = userN;
      // console.log("Session: ", user);
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("Token: ", token);
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
