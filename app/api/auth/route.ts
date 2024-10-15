import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Here you can add additional logic to check if the user is an admin
  const isAdmin = true; // This is a placeholder; you should implement actual logic

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Authentication successful' });
}
