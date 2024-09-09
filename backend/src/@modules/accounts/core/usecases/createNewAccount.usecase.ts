import { randomUUID } from "crypto";
import { AccountsRepositoryInterface } from "../accountsRepository.interface";
import { AccountEntity } from "../entities/account.entity";
import { apiError } from "../../../../http/nestjs/helpers/api-Error.helper";

export type saveAccountInput = {
  name: string;
  description: string;
  value: number;
  expirationDate: Date;
  userUuid: string;
  accountType: "pay" | "receive";
};
export class CreateNewAccountUsecase {
  constructor(readonly repo: AccountsRepositoryInterface) {}
  public async execute(input: saveAccountInput): Promise<AccountEntity> {
    const user = await this.repo.findUserByUuid(input.userUuid);
    if (!user) {
      throw new apiError("Usuario não encontrado", 404, "NOT_FOUND");
    }
    const account = new AccountEntity({ ...input, uuid: randomUUID() });
    await this.repo.saveAccount(account);
    return account;
  }
}
