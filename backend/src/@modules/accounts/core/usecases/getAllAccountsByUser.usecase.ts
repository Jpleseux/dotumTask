import { AccountsRepositoryInterface } from "../accountsRepository.interface";
import { AccountEntity } from "../entities/account.entity";

export class GetAllAccountsByUserUsecase {
  constructor(readonly repo: AccountsRepositoryInterface) {}
  public async execute(userUuid: string): Promise<AccountEntity[]> {
    return this.repo.getAccountsByUser(userUuid);
  }
}
