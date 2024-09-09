import { UserEntity } from "../entities/user.entity";
import { RegisterRepositoryInterface } from "../registerRepository.interface";
import { apiError } from "../../../../../http/nestjs/helpers/api-Error.helper";

export class FindUserByEmailUsecase {
  constructor(readonly repo: RegisterRepositoryInterface) {}
  public async execute(email: string): Promise<UserEntity> {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new apiError("Este usuario não existe", 404, "NOT_FOUND");
    }
    return user;
  }
}
