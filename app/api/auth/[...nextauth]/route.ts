import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
    providers: [
        CredentialsProvider({
          credentials: {
            email: { },
            password: { },
          },
          async authorize(credentials, req) {
            const response = await sql `
            SELECT * FROM users WHERE email = ${credentials?.email}`;
            const user = response.rows[0];
            const passwordCorr = await compare(
              credentials?.password || "", 
              user.password
            );

            if(passwordCorr){
              return{
                id: user.id,
                email: user.email,
                pre_name: user.pre_name,
              };
            };
            // Return null if user data could not be retrieved
            return null
          }
        })
      ]
})

export {handler as GET, handler as POST};