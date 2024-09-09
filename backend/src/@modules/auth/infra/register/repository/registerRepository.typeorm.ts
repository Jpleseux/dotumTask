import { DataSource } from "typeorm";
import { UserEntity } from "@modules/auth/core/register/entities/user.entity";
import { RegisterRepositoryInterface } from "@modules/auth/core/register/registerRepository.interface";
import { UserModel } from "../../database/models/UserModel.model";

export class RegisterRepositoryTypeOrm implements RegisterRepositoryInterface {
  constructor(readonly dataSource: DataSource) {}
  async saveUser(user: UserEntity): Promise<UserEntity> {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values([
        {
          email: user.email(),
          password: user.password(),
          userName: user.userName(),
          uuid: user.uuid(),
        },
      ])
      .execute();
    return user;
  }
  async findByEmail(email: string): Promise<UserEntity> {
    const userDb = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("email = :email", { email: email })
      .getOne();
    if (!userDb) {
      return;
    }
    return new UserEntity(userDb);
  }
}
