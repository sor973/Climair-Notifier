import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text ",
          placeholder: "Example000@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const client = await MongoClient.connect(
          `mongodb://cpre_ubicom:7M72J9M3RFx29s75@192.168.42.201:27017/?authSource=cpreauth&readPreference=primary&appname=MongoDB+Compass&directConnection=true&ssl=false`,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db("ubicom");
        var query = { email: credentials.email };
        try {
          var user = await db.collection("userdatabase").findOne(query);
        } catch (err) {
          return;
        }
        //Not found - send error res
        if (!user) {
          client.close();
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        client.close();
        delete user._id;
        delete user.password;
        delete user.token;
        return user;
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
});
