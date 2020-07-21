import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentRouter = Router();

const appointments: Appointment[] = [];

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findSameDateAppointment = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findSameDateAppointment) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked.' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentRouter;
