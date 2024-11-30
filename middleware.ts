import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { getSession } from "next-auth/react"
import { NextResponse } from "next/server"

const url = [
  '/login',
  '/register',
]
export default withAuth(

 async function middleware (req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
   console.log(token)
   if(url.includes(req.nextUrl.pathname )&& token){
    return NextResponse.redirect(new URL('/', req.url))}
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
       // console.log(token)
        if (
          req.nextUrl.pathname.startsWith('/protected') &&
          token === null
        ) {
          return false
        }
        return true
      }
    }
  }
)