import { AccountsRepositoryInterface } from "../accountsRepository.interface";
import { AccountEntity } from "../entities/account.entity";

export class GetAllAccountsByUserUsecase {
  constructor(readonly repo: AccountsRepositoryInterface) {}
  public async execute(userUuid: string): Promise<AccountEntity[]> {
    const accounts = await this.repo.getAccountsByUser(userUuid);
    return accounts;
  }
}
