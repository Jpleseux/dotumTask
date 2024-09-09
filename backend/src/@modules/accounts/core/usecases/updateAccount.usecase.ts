import { AccountsRepositoryInterface } from "../accountsRepository.interface";
import { AccountEntity, AccountProps } from "../entities/account.entity";
import { apiError } from "../../../../http/nestjs/helpers/api-Error.helper";

export class UpdateAccountUsecase {
  constructor(readonly repo: AccountsRepositoryInterface) {}
  public async execute(uuid: string, newAccount: Partial<AccountProps>): Promise<AccountEntity> {
    const account = await this.repo.getAccountByUuid(uuid);
    if (!account) {
      throw new apiError("Nenhuma conta encontrada", 404, "NOT_FOUND");
    }
    await this.repo.updateAccount(uuid, newAccount);
    return await this.repo.getAccountByUuid(account.uuid());
  }
}
