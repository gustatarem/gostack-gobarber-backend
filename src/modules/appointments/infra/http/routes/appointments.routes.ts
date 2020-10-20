import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();
const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
