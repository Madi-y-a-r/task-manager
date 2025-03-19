import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Проверяем входные данные
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Проверяем, есть ли пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set in .env');
    }

    // Генерируем токен
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`User registered: ${user.id}`);

    return NextResponse.json({ user, token }, { status: 201 });
  } catch (error: any) {
    logger.error('Registration error:', error.message);
    return NextResponse.json(
      { message: 'Error registering user', error: error.message },
      { status: 500 }
    );
  }
}
