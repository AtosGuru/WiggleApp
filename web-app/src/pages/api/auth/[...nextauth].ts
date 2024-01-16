import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import { FirestoreAdapter } from '@next-auth/firebase-adapter'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
import { unAuthorizedAxios } from '@/config/axios'
import { PAGE_ROUTES } from '@/constants/pageRoutes'

// const firestore1 = (
//   firebase.initializeApp()
// ).firestore()

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }: any) {
      session.user = token.user

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }

      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { data } = await unAuthorizedAxios.post(`/auth/login`, {
          email: credentials?.email,
          password: credentials?.password
        })

        return data
      },
    })
  ],
  pages: {
    signIn: PAGE_ROUTES.login.route,
    signOut: PAGE_ROUTES.login.route
  }
}

export default NextAuth(authOptions)