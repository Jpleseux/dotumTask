import { AccountEntity } from "../../../entities/accounts/account.entity";
import httpClient from "../../../http/httpClient";
import { AccountGateway, manyOutput, simpleOutput } from "../../interfaces/accounts/accountGateway";

export class HttpAccountGateway implements AccountGateway {
    constructor(readonly httpClient: httpClient) {}
    async createNewAccount(account: AccountEntity): Promise<simpleOutput> {
        const response = await this.httpClient.post("account/protected/save", account.props);
        if (response && response.status < 300) {
            return {
                status: response.status,
                message: response.data.message,
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
    async getAllAccountsByUser(): Promise<manyOutput> {
        const response = await this.httpClient.get("account/protected/all");
        if (response && response.status < 300) {
            return {
                status: response.status,
                message: response.data.message,
                accounts: response.data.accounts.map((account) => new AccountEntity(account))
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
    async getOneAccount(uuid: string): Promise<simpleOutput> {
        const response = await this.httpClient.get(`account/protected/${uuid}`);
        if (response && response.status < 300) {
            return {
                status: response.status,
                message: response.data.message,
                account: new AccountEntity(response.data.account),
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
    async deleteAccount(uuid: string): Promise<simpleOutput> {
        const response = await this.httpClient.delete("account/protected", uuid);
        if (response && response.status < 300) {
            return {
                status: response.status,
                message: response.data.message,
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
    async finshAccount(uuid: string): Promise<simpleOutput> {
        const response = await this.httpClient.patch(`account/protected/finish/${uuid}`, {});
        if (response && response.status < 300) {
            return {
                status: response.status,
                message: response.data.message,
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
    async updateAccount(account: AccountEntity): Promise<simpleOutput> {
        console.log(account)
        const response = await this.httpClient.patch(`account/protected/edit/${account.uuid()}`, account.props);
        if (response && response.status < 300) {
            return {
                status: response.status,
                message: response.data.message,
                account: new AccountEntity(response.data.account),
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
}