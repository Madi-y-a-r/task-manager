// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || undefined;
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';

    // Build query
    const where = {
      ...(status ? { status } : {}),
      ...(user.role !== 'ADMIN' ? { authorId: user.userId } : {}),
    };

    // Get tasks
    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    logger.info(`Tasks fetched by user: ${user.userId}`);

    return NextResponse.json(tasks);
  } catch (error) {
    logger.error('Error fetching tasks:', error);
    return NextResponse.json(
      { message: 'Error fetching tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, status } = await request.json();

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        author: {
          connect: { id: user.userId },
        },
      },
    });

    logger.info(`Task created: ${task.id} by user: ${user.userId}`);

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    logger.error('Error creating task:', error);
    return NextResponse.json(
      { message: 'Error creating task' },
      { status: 500 }
    );
  }
}