// lib/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { logger } from './logger';

interface TokenPayload {
  userId: string;
  role: string;
}

export async function getUserFromToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as TokenPayload;
    
    return {
      userId: decoded.userId,
      role: decoded.role
    };
  } catch (error) {
    logger.error('Error validating token:', error);
    return null;
  }
}