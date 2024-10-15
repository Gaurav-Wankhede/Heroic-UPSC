import { authMiddleware, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ["/", "/blog(.*)", "/interview(.*)", "/prelims(.*)", "/mains(.*)", "/api/posts"],
  ignoredRoutes: ["/api/webhooks/clerk"],
  async afterAuth(auth, req) {
    if (!auth.userId && req.nextUrl.pathname.startsWith('/dashboard')) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }

    if (auth.userId) {
      const user = await clerkClient().users.getUser(auth.userId);
      // You can now use the user object as needed
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
