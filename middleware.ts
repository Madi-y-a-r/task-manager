
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromToken } from './lib/auth';
import { logger } from './lib/logger';

export async function middleware(request: NextRequest) {
  // Protected API routes
  if (request.nextUrl.pathname.startsWith('/api/tasks')) {
    const user = await getUserFromToken(request);
    
    if (!user) {
      logger.warn(`Unauthorized access attempt: ${request.nextUrl.pathname}`);
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    logger.info(`Authenticated request: ${request.nextUrl.pathname}`, { userId: user.userId });
  }
  
  return NextResponse.next();
}

// Match all API routes except auth routes
export const config = {
  matcher: [
    '/api/tasks/:path*',
  ],
};