import { Router } from 'express';
import { authController } from '../controllers/authController';

export const authRouter = Router();

// 1. Signup Route
authRouter.post('/signup', authController.signup);

// 2. Email Verification Route
authRouter.post('/verify-email', authController.verifyEmail);

// 3. Login Route
authRouter.post('/login', authController.login);

// 4. Token Refresh Route
authRouter.post('/refresh', authController.refresh);

// 5. Logout Route
authRouter.post('/logout', authController.logout);

// 6. Forgot Password Route
authRouter.post('/forgot-password', authController.forgotPassword);

// 7. Reset Password Route
authRouter.post('/reset-password', authController.resetPassword);

// 8. Google OAuth sign-in / signup route
authRouter.post('/google', authController.googleAuth);

export default authRouter;
