// lib/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { logger } from './logger';

interface TokenPayload {
  userId: string;
  role: string;
}

export const runtime = 'nodejs'; 
export async function getUserFromToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    console.log('Authorization Header Received:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token found or incorrect format');
        return null;
    }
    
    const token = authHeader.substring(7);
    console.log('Extracted Token:', token); 

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is missing in .env');
      }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as TokenPayload;
    console.log('Decoded Token:', decoded); 

    return decoded;
  } catch (error) {
    logger.error('Error validating token:', error);
    return null;
  }
}