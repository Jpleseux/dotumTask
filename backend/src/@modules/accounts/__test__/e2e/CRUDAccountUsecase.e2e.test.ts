import { AccountEntity } from "@modules/accounts/core/entities/account.entity";
import { CreateNewAccountUsecase } from "@modules/accounts/core/usecases/createNewAccount.usecase";
import { DeleteAccountUsecase } from "@modules/accounts/core/usecases/deleteAccount.usecase";
import { GetOneAccountUsecase } from "@modules/accounts/core/usecases/getOneAccount.usecase";
import { UpdateAccountUsecase } from "@modules/accounts/core/usecases/updateAccount.usecase";
import { AccountModel } from "@modules/accounts/infra/database/models/AccountModel.model";
import { AccountsRepositoryTypeOrm } from "@modules/accounts/infra/repository/accounts.repository";
import dataSource from "@modules/shared/infra/database/datasource";

let repo: AccountsRepositoryTypeOrm;
let account: AccountEntity;
describe("Deve testar o CRUD das contas", () => {
  beforeAll(async () => {
    await dataSource.initialize();
    repo = new AccountsRepositoryTypeOrm(dataSource);
    account = await new CreateNewAccountUsecase(repo).execute({
      description: "teste",
      expirationDate: new Date(Date.now()),
      name: "test",
      value: 24.99,
      userUuid: "d0027811-4f76-4cf2-a24b-bc99ad777950",
      accountType: "pay",
    });
  });

  afterAll(async () => {
    await dataSource
      .getRepository(AccountModel)
      .createQueryBuilder()
      .delete()
      .where("user_uuid = :uuid", { uuid: "d0027811-4f76-4cf2-a24b-bc99ad777950" })
      .execute();
    await dataSource.destroy();
  });
  test("Deve registrar uma nova conta", async () => {
    const account = await new CreateNewAccountUsecase(repo).execute({
      description: "teste",
      expirationDate: new Date(Date.now()),
      name: "test",
      value: 24.99,
      userUuid: "d0027811-4f76-4cf2-a24b-bc99ad777950",
      accountType: "receive",
    });
    const db = await repo.getAccountByUuid(account.uuid());
    expect(db.uuid()).toEqual(account.uuid());
    await repo.deleteAccount(account.uuid());
  });
  test("Deve pegar todas as contas de um usuario", async () => {
    const accounts = await repo.getAccountsByUser("d0027811-4f76-4cf2-a24b-bc99ad777950");
    expect(accounts.length).toBe(1);
  });
  test("Deve buscar uma conta pelo uuid", async () => {
    const response = await new GetOneAccountUsecase(repo).execute(account.uuid());
    expect(response.uuid()).toBe(account.uuid());
  });
  test("Deve atualizar uma cobrança", async () => {
    const newAccount = await new UpdateAccountUsecase(repo).execute(account.uuid(), { name: "update" });
    expect(newAccount.uuid()).toBe(account.uuid());
    expect(newAccount.name()).toBe("update");
  });
  test("Deve deletar uma conta", async () => {
    const accountD = await new CreateNewAccountUsecase(repo).execute({
      description: "teste",
      expirationDate: new Date(Date.now()),
      name: "test",
      value: 24.99,
      userUuid: "d0027811-4f76-4cf2-a24b-bc99ad777950",
      accountType: "receive",
    });
    await new DeleteAccountUsecase(repo).execute(accountD.uuid());
    const res = await repo.getAccountByUuid(accountD.uuid());
    expect(res).toBeUndefined();
  });
});
