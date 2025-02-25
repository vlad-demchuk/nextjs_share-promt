import NextAuth, { AuthOptions, Session, User as NextAuthUser } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@schema/user';
import { connectToDB } from '@lib/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }: any) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({
          email: profile.email,

        });

        // if no, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  }
}) satisfies AuthOptions;

export { handler as GET, handler as POST };
