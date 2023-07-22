
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({session}) {
      const userSession = await User.findOne({ email: session.user.email });
      session.user.id = userSession._id.toString();
      return session;
    },

    async signIn({profile}) {
      try {
        await connectToDatabase();

        // check if user exists
        const userExist = await User.findOne({ email: profile.email });

        // if not, create user
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }



        return true;
      } catch (err) {
        console.log("=> error while connecting with database: ", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST }
