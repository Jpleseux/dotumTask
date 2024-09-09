import { AccountsRepositoryInterface } from "../accountsRepository.interface";
import { apiError } from "../../../../http/nestjs/helpers/api-Error.helper";

export class FinishAccountUsecase {
  constructor(readonly repo: AccountsRepositoryInterface) {}
  public async execute(uuid: string): Promise<void> {
    const account = await this.repo.getAccountByUuid(uuid);
    if (!account) {
      throw new apiError("Nenhuma conta encontrada", 404, "NOT_FOUND");
    }
    await this.repo.FinishAccount(account.uuid());
  }
}
