/* eslint-disable prettier/prettier */
import { UserEntity } from "./entities/user.entity";
export interface RegisterRepositoryInterface {
  saveUser(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
}
