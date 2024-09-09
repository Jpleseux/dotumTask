import { UserEntity } from "../entities/user.entity";
import { RegisterRepositoryInterface } from "../registerRepository.interface";
import { apiError } from "../../../../../http/nestjs/helpers/api-Error.helper";
import { RegisterGatewayInterface } from "../registerGateway.interface";
import { randomUUID } from "crypto";

export type userInput = {
  email: string;
  password: string;
  userName: string;
};
export type signUpOutput = {
  user: UserEntity;
  token: string;
};
export class saveUserUsecase {
  constructor(
    readonly repo: RegisterRepositoryInterface,
    readonly gateway: RegisterGatewayInterface,
  ) {}
  public async execute(user: userInput): Promise<signUpOutput> {
    const userDb = await this.repo.findByEmail(user.email);
    if (userDb) {
      throw new apiError("Esse email já existe", 400, "item_already_exist");
    } else if ((await this.gateway.validateEmail(user.email)) === false) {
      throw new apiError("Este email é inválido", 400, "invalid_item");
    }
    const input = new UserEntity({
      email: user.email,
      password: await this.gateway.encryptPassword(user.password),
      userName: user.userName,
      uuid: randomUUID(),
    });
    const output = await this.repo.saveUser(input);
    const token = await this.gateway.tokenGenerate(output);

    return { user: output, token: token };
  }
}
