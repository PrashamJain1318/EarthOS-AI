import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthPayload {
  userId: string;
  role: string;
}

// Extend Express Request to carry authenticated user payload
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

/**
 * JWT Authentication Middleware
 * Extracts Bearer token from Authorization header, verifies it,
 * and attaches decoded payload to req.user for downstream handlers.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication token is missing. Include a valid Bearer token in the Authorization header.'
      }
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Authentication token is invalid or expired.'
      }
    });
    return;
  }
}

/**
 * RBAC Authorization Middleware
 * Factory function that returns a middleware checking if the authenticated
 * user's role exists in the provided array of allowed roles.
 */
export function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated.'
        }
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'User lacks the required role to access this resource.'
        }
      });
      return;
    }

    next();
  };
}

export default authMiddleware;
