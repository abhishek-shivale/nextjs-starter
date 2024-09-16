import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware () {
  // console.log(req)
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