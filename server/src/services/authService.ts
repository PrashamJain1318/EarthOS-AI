import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env';
import { UserModel } from '../models/User';

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export class AuthError extends Error {
  code: string;
  statusCode: number;
  constructor(message: string, code: string, statusCode = 400) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const authService = {
  signAccessToken(userId: string, role: string) {
    return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: '15m' });
  },

  signRefreshToken(userId: string) {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });
  },

  async signup(data: any) {
    const { name, email, role, password } = data;
    
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new AuthError('Email address is already registered.', 'EMAIL_ALREADY_EXISTS', 400);
    }

    const user = new UserModel({
      name,
      email,
      role,
      password,
      isVerified: true
    });

    await user.save();
    
    const accessToken = this.signAccessToken(user.id, user.role);
    const refreshToken = this.signRefreshToken(user.id);
    
    return { user, accessToken, refreshToken };
  },

  async verifyEmail(email: string, code: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AuthError('User profile not found.', 'USER_NOT_FOUND', 404);
    }
    if (user.isVerified) {
      throw new AuthError('Profile is already verified.', 'ALREADY_VERIFIED', 400);
    }
    if (user.verificationCode !== code) {
      throw new AuthError('Verification code is invalid or expired.', 'INVALID_VERIFICATION_CODE', 400);
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    return user;
  },

  async login(data: any) {
    const { email, password } = data;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AuthError('Invalid email or password.', 'INVALID_CREDENTIALS', 401);
    }

    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch) {
      throw new AuthError('Invalid email or password.', 'INVALID_CREDENTIALS', 401);
    }

    if (!user.isVerified) {
      throw new AuthError('Please verify your email before logging in.', 'EMAIL_UNVERIFIED', 403);
    }

    const accessToken = this.signAccessToken(user._id.toString(), user.role);
    const refreshToken = this.signRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  },

  async refresh(refreshToken: string) {
    let payload;
    try {
      payload = jwt.verify(refreshToken, env.JWT_SECRET) as any;
    } catch (err) {
      throw new AuthError('Refresh token is invalid or expired.', 'INVALID_REFRESH_TOKEN', 401);
    }

    const user = await UserModel.findOne({ _id: payload.userId, refreshToken });
    if (!user) {
      throw new AuthError('Refresh token is invalid or expired.', 'INVALID_REFRESH_TOKEN', 401);
    }

    const nextAccessToken = this.signAccessToken(user._id.toString(), user.role);
    return { nextAccessToken };
  },

  async logout(refreshToken: string) {
    if (refreshToken) {
      await UserModel.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: 1 } }
      );
    }
  },

  async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const resetPasswordToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    return resetPasswordToken;
  },

  async resetPassword(data: any) {
    const { email, token, password } = data;
    const user = await UserModel.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      throw new AuthError('Reset token code is invalid or has expired.', 'INVALID_RESET_TOKEN', 400);
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  },

  async googleAuth(idToken: string) {
    let email: string;
    let name: string;

    if (idToken === 'mock_google_id_token' && env.NODE_ENV === 'development') {
      email = 'google_mock@earthos.ai';
      name = 'Google Mock User';
    } else {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email || !payload.name) {
        throw new AuthError('Unable to parse credentials from Google token.', 'INVALID_GOOGLE_TOKEN', 400);
      }
      email = payload.email;
      name = payload.name;
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-16);
      user = new UserModel({
        name,
        email,
        password: randomPassword,
        role: 'USER',
        isVerified: true
      });
      await user.save();
    } else if (!user.isVerified) {
      user.isVerified = true;
    }

    const accessToken = this.signAccessToken(user._id.toString(), user.role);
    const refreshToken = this.signRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  }
};
