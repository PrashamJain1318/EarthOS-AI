import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { UserModel } from '../models/User';

export const authRouter = Router();

// Utility: Sign Access Token
const signAccessToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: '15m' });
};

// Utility: Sign Refresh Token
const signRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });
};

// 1. Signup Route
authRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, role, password } = req.body;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { code: 'EMAIL_ALREADY_EXISTS', message: 'Email address is already registered.' }
      });
    }

    // Generate random 6-digits OTP code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user record
    const user = new UserModel({
      name,
      email,
      role,
      password,
      verificationCode,
      isVerified: false
    });

    await user.save();
    logger.info(`👤 New user created: ${email} [Role: ${role}] (OTP: ${verificationCode})`);

    res.status(201).json({
      success: true,
      data: {
        message: 'Signup successful. Please verify email to complete onboarding.',
        userId: user._id,
        email: user.email,
        mockCodeDevOnly: verificationCode // Dev assistance helper
      }
    });
  } catch (err) {
    next(err);
  }
});

// 2. Email Verification Route
authRouter.post('/verify-email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User profile not found.' }
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: { code: 'ALREADY_VERIFIED', message: 'Profile is already verified.' }
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_VERIFICATION_CODE', message: 'Verification code is invalid or expired.' }
      });
    }

    // Mark verified
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    logger.info(`✓ Email verified successfully for: ${email}`);

    res.status(200).json({
      success: true,
      data: {
        message: 'Email verified successfully. Session unlocked.'
      }
    });
  } catch (err) {
    next(err);
  }
});

// 3. Login Route
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' }
      });
    }

    // Verify Password match
    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' }
      });
    }

    // Check verification status
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: { code: 'EMAIL_UNVERIFIED', message: 'Please verify your email before logging in.' }
      });
    }

    // Sign Access & Refresh Tokens
    const accessToken = signAccessToken(user._id.toString(), user.role);
    const refreshToken = signRefreshToken(user._id.toString());

    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save();

    logger.info(`🔑 User logged in: ${email}`);

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
  } catch (err) {
    next(err);
  }
});

// 4. Token Refresh Route
authRouter.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: { code: 'REFRESH_TOKEN_REQUIRED', message: 'Refresh token is required.' }
      });
    }

    const payload = jwt.verify(refreshToken, env.JWT_SECRET) as any;
    const user = await UserModel.findOne({ _id: payload.userId, refreshToken });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token is invalid or expired.' }
      });
    }

    const nextAccessToken = signAccessToken(user._id.toString(), user.role);
    res.status(200).json({
      success: true,
      data: {
        accessToken: nextAccessToken
      }
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token is invalid or expired.' }
    });
  }
});

// 5. Logout Route
authRouter.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await UserModel.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
    }
    res.status(200).json({
      success: true,
      data: { message: 'Logged out successfully.' }
    });
  } catch (err) {
    next(err);
  }
});

// 6. Forgot Password Route
authRouter.post('/forgot-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: true,
        data: { message: 'If the email exists, a password reset link has been sent.' }
      });
    }

    // Generate random 6-digits token code
    const resetPasswordToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 Hour lifespan
    await user.save();

    logger.info(`✉ Password recovery dispatch triggered for: ${email} (OTP: ${resetPasswordToken})`);

    res.status(200).json({
      success: true,
      data: {
        message: 'If the email exists, a password reset link has been sent.',
        mockResetCodeDevOnly: resetPasswordToken
      }
    });
  } catch (err) {
    next(err);
  }
});

// 7. Reset Password Route
authRouter.post('/reset-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, token, password } = req.body;

    const user = await UserModel.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_RESET_TOKEN', message: 'Reset token code is invalid or has expired.' }
      });
    }

    // Update password (User pre-save hook will hash it automatically)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    logger.info(`✓ Password reset completed successfully for: ${email}`);

    res.status(200).json({
      success: true,
      data: { message: 'Password has been successfully updated.' }
    });
  } catch (err) {
    next(err);
  }
});

export default authRouter;
