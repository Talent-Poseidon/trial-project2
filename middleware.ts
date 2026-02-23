import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Example proxy logic
  // You can add custom logic here to handle requests
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
