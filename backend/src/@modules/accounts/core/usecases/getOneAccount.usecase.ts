import { AccountsRepositoryInterface } from "../accountsRepository.interface";
import { AccountEntity } from "../entities/account.entity";
import { apiError } from "../../../../http/nestjs/helpers/api-Error.helper";

export class GetOneAccountUsecase {
  constructor(readonly repo: AccountsRepositoryInterface) {}
  public async execute(uuid: string): Promise<AccountEntity> {
    const account = await this.repo.getAccountByUuid(uuid);
    if (!account) {
      throw new apiError("Nenhuma conta encontrada", 404, "NOT_FOUND");
    }
    return account;
  }
}
