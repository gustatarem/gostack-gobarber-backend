import IUsersRepository from '@modules/users/repositories/iUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/iCreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  public async findByEmail(email: string): Promise<User | undefined> {}

  public async findById(id: string): Promise<User | undefined> {}

  public async create(userData: ICreateUserDTO): Promise<User> {}

  public async save(user: User): Promise<User> {}
}

export default UsersRepository;
