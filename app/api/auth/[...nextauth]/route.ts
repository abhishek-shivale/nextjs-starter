import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "register",
      id: "register",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (user) {
          console.log("User already exists");
          return null;
        }

        const hashedPassword = await hash(credentials.password, 10);

        const newUser = await prisma.user.create({
          data: {
            email: credentials.email,
            password: hashedPassword,
            loginType: "credential",
          },
        });

        return { id: String(newUser.id), email: newUser.email };
      },
    
    }),
    CredentialsProvider({
      name: "login",
      id: "login",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        if (user.loginType !== "credential") {
          console.log("Login type not credential");
          return null;
        }

        const isValid = await compare(
          credentials.password,
          user.password as string
        );
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }
        return { id: String(user.id), email: user.email };
      },
    }),
  ],
  session:{
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ account, profile }) {
      // console.log(account, profile);
      if (!account ) return false;
      if (account.provider === "google") {
        if(!profile) return false
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!user) {
          const user = await prisma.user.create({
            data: {
              email: profile.email as string,
              profile_image: profile.image,
              loginType: "google",
              isVerified: true,
            },
          });
          return Boolean(user);
        }
        if (user?.loginType !== "google") {
          return false;
        }
        return true;
      }
      if(account.provider === "register" || account.provider === "login"){ 
        return true
      }
      return true;
    },
    jwt({ token, user }) {
      //console.log(token, user)
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  }
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
