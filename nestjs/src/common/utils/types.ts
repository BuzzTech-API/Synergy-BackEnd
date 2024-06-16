import { Address } from 'nodemailer/lib/mailer';

export class CreateUserParams {
  // Modelo de dados final que vai ser enviado para o banco de dados
  user_name: string;
  user_password: string;
  user_email: string;
  user_permission_level: number;
  user_board: string;
}

export class CreateVirtualRoomParams {
  virtual_room_name: string;
  virtual_room_link: string;
  virtual_room_permission_level: number;
}

export type CreateReservationsParams = {
  reserve_date: Date;
  reserve_start: Date;
  reserve_end: Date;
  physical_room_id: number;
};

//Ivan novo type de VirtualRoom para conseguir utilizar o "virtual_room_id" como parametro.
export type CreateReservationsVirtualParams = {
  reserve_date: Date;
  reserve_start: Date;
  reserve_end: Date;
  virtual_room_id: number;
};

export type CreateReservationsHibridParams = {
  reserve_date: Date;
  reserve_start: Date;
  reserve_end: Date;
  virtual_room_id: number;
  physical_room_id: number;
};

export class CreatePhysicalroomParams {
  physical_room_name: string;
  physical_room_vacancies: number;
  physical_room_address: string;
  physical_room_permission_level: number;
}

export class UpdatePhysicalroomParams {
  physical_room_id: number;
  physical_room_name: string;
  physical_room_vacancies: number;
  physical_room_address: string;
  physical_room_permission_level: number;
}

export type CreateMeetingParams = {
  meeting_title: string;
  meeting_subject: string;
  meeting_type: string;
  reserve_id: number;
};

export type CreateParticipateParams = {
  meeting_id: number;
  users_list: number[];
};

export type CreatePresenceParams = {
  meeting_id: number;
  guests_list: number[];
};

export type CreateGuestParams = {
  guest_name: string;
  guest_email: string;
};

export type UpdateUserParams = {
  user_id: number;
  user_email: string;
  user_name: string;
  user_password: string;
};
export type User = {
  user_id: number;
  user_permission_level: number;
  user_email: string;
  user_board: string;
  user_name: string;
  is_active: boolean;
};

export type SendEmail = {
  recipients: Address[]; // pessaos que vão receber o email
  subject: string; // conteudo  da linha de assunto do email
  html: string;
  text?: string;
};

export type CreateMeeting = {
  access_token: string;
  refresh_token: string;
  topic: string;
  start_time: string;
  duration: number;
  agenda: string;
  meeting_invites: string[];
};

export class UpdateVirtualroomParams {
  virtual_room_id: number;
  virtual_room_name: string;
  virtual_room_link: string;
  virtual_room_permission_level: number;
}

export type populateAta = {
  assunto: string;
  data: string;
  horario: string;
  local: string;
  relator: string;
  participantes: Address[];
};

