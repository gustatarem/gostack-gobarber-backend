import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppoiintmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  appointmentsRepository = new AppoiintmentsRepository();

  constructor(appointmentsRepository: AppoiintmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findSameDateAppointment = this.appointmentsRepository.findAppointmentByDate(
      appointmentDate,
    );

    if (findSameDateAppointment) {
      throw Error('This appointment is already booked.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
