import { AccountEntity } from "../../../entities/accounts/account.entity";

export type simpleOutput = {
    status: number,
    account?: AccountEntity,
    message: string,
}
export type manyOutput = {
    status: number,
    accounts?: AccountEntity[],
    message: string,
}

export interface AccountGateway {
    createNewAccount(account: AccountEntity): Promise<simpleOutput>;
    getAllAccountsByUser(): Promise<manyOutput>;
    getOneAccount(uuid: string): Promise<simpleOutput>;
    finshAccount(uuid: string): Promise<simpleOutput>;
    updateAccount(account: AccountEntity): Promise<simpleOutput>;
    deleteAccount(uuid: string): Promise<simpleOutput>;
}