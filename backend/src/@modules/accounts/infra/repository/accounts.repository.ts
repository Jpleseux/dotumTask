import { AccountsRepositoryInterface } from "@modules/accounts/core/accountsRepository.interface";
import { AccountEntity, AccountProps } from "@modules/accounts/core/entities/account.entity";
import { DataSource } from "typeorm";
import { AccountModel } from "../database/models/AccountModel.model";
import { UserEntity } from "@modules/accounts/core/entities/user.entity";
import { AccountUserModel } from "../database/models/UserModel.model";

export class AccountsRepositoryTypeOrm implements AccountsRepositoryInterface {
  constructor(readonly datasource: DataSource) {}
  async saveAccount(account: AccountEntity): Promise<void> {
    await this.datasource
      .createQueryBuilder()
      .insert()
      .into(AccountModel)
      .values({
        description: account.description(),
        accountType: account.accountType(),
        expirationDate: account.expirationDate(),
        name: account.name(),
        userUuid: account.userUuid(),
        uuid: account.uuid(),
        value: account.value(),
      })
      .execute();
  }
  async findUserByUuid(uuid: string): Promise<UserEntity> {
    const userModel = await this.datasource
      .getRepository(AccountUserModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid })
      .getOne();
    if (!userModel) {
      return;
    }
    return new UserEntity(userModel);
  }
  async getAccountByUuid(uuid: string): Promise<AccountEntity> {
    const accountModel = await this.datasource
      .getRepository(AccountModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid })
      .getOne();
    if (!accountModel) {
      return;
    }
    return new AccountEntity(accountModel);
  }
  async getAccountsByUser(uuid: string): Promise<AccountEntity[]> {
    const accountsModel = await this.datasource
      .getRepository(AccountModel)
      .createQueryBuilder()
      .where("user_uuid = :uuid", { uuid })
      .getMany();
    if (!accountsModel || (accountsModel && accountsModel.length === 0)) {
      return [];
    }
    return accountsModel.map((account) => {
      return new AccountEntity(account);
    });
  }
  async deleteAccount(uuid: string): Promise<void> {
    await this.datasource.getRepository(AccountModel).createQueryBuilder().delete().where("uuid = :uuid", { uuid }).execute();
  }
  async updateAccount(uuid: string, newAccount: Partial<AccountProps>): Promise<void> {
    if (Object.keys(newAccount).length === 0) {
      return;
    }
    await this.datasource
      .getRepository(AccountModel)
      .createQueryBuilder()
      .update(AccountModel)
      .set(newAccount)
      .where("uuid = :uuid", { uuid })
      .execute();
  }
  async FinishAccount(uuid: string): Promise<void> {
    await this.datasource
      .getRepository(AccountModel)
      .createQueryBuilder()
      .update(AccountModel)
      .set({ isDone: true })
      .where("uuid = :uuid", { uuid })
      .execute();
  }
}
