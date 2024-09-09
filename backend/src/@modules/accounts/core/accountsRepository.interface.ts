import { AccountEntity, AccountProps } from "./entities/account.entity";
import { UserEntity } from "./entities/user.entity";

export interface AccountsRepositoryInterface {
  saveAccount(account: AccountEntity): Promise<void>;
  findUserByUuid(uuid: string): Promise<UserEntity>;
  getAccountByUuid(uuid: string): Promise<AccountEntity>;
  getAccountsByUser(uuid: string): Promise<AccountEntity[]>;
  updateAccount(uuid: string, newAccount: Partial<AccountProps>): Promise<void>;
  FinishAccount(uuid: string): Promise<void>;
  deleteAccount(uuid: string): Promise<void>;
}
