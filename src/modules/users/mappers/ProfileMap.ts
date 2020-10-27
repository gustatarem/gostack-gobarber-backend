import User from '../infra/typeorm/entities/User';

interface IProfileMap {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export default class UserMap {
  public static toDTO(user: User): IProfileMap {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
