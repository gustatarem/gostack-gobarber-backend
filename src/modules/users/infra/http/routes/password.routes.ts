import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPassword = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();
const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPassword.create);
passwordRouter.post('/reset', resetPassword.create);

export default passwordRouter;
