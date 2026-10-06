import { Request, Response, NextFunction } from 'express';
import { authService, AuthError } from '../services/authService';
import { logger } from '../config/logger';

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user, accessToken, refreshToken } = await authService.signup(req.body);
      
      logger.info(`👤 New user created: ${user.email} [Role: ${user.role}]`);

      res.status(201).json({
        success: true,
        data: {
          message: 'Signup successful.',
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (err: any) {
      if (err instanceof AuthError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  },

  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, code } = req.body;
      await authService.verifyEmail(email, code);

      logger.info(`✓ Email verified successfully for: ${email}`);

      res.status(200).json({
        success: true,
        data: {
          message: 'Email verified successfully. Session unlocked.'
        }
      });
    } catch (err: any) {
      if (err instanceof AuthError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user, accessToken, refreshToken } = await authService.login(req.body);

      logger.info(`🔑 User logged in: ${user.email}`);

      res.status(200).json({
        success: true,
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (err: any) {
      if (err instanceof AuthError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: { code: 'REFRESH_TOKEN_REQUIRED', message: 'Refresh token is required.' }
        });
        return;
      }

      const { nextAccessToken } = await authService.refresh(refreshToken);
      
      res.status(200).json({
        success: true,
        data: {
          accessToken: nextAccessToken
        }
      });
    } catch (err: any) {
      if (err instanceof AuthError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      
      res.status(200).json({
        success: true,
        data: { message: 'Logged out successfully.' }
      });
    } catch (err) {
      next(err);
    }
  },

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const resetToken = await authService.forgotPassword(email);

      if (resetToken) {
        logger.info(`✉ Password recovery dispatch triggered for: ${email} (OTP: ${resetToken})`);
      }

      res.status(200).json({
        success: true,
        data: {
          message: 'If the email exists, a password reset link has been sent.',
          mockResetCodeDevOnly: resetToken || undefined
        }
      });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.resetPassword(req.body);

      logger.info(`✓ Password reset completed successfully for: ${req.body.email}`);

      res.status(200).json({
        success: true,
        data: { message: 'Password has been successfully updated.' }
      });
    } catch (err: any) {
      if (err instanceof AuthError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  },

  async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        res.status(400).json({
          success: false,
          error: { code: 'ID_TOKEN_REQUIRED', message: 'Google idToken is required.' }
        });
        return;
      }

      const { user, accessToken, refreshToken } = await authService.googleAuth(idToken);

      res.status(200).json({
        success: true,
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      });
    } catch (err: any) {
      if (err instanceof AuthError) {
        res.status(err.statusCode).json({
          success: false,
          error: { code: err.code, message: err.message }
        });
        return;
      }
      next(err);
    }
  }
};
