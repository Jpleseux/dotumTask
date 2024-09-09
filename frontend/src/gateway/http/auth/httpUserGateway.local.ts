import { UserEntity } from "../../../entities/auth/User.entity";
import httpClient from "../../../http/httpClient";
import { loginInput, signUpOutput, userGateway } from "../../interfaces/auth/userGateway";

export class HttpUserGateway implements userGateway {
    constructor(readonly httpClient: httpClient) {}
    async signUp(user: UserEntity): Promise<signUpOutput> {
        const response = await this.httpClient.post("auth/save/user", user.props);
        if (response && response.status < 300) {
            const userRes =  new UserEntity({
                email: response.data.user.email,
                userName: response.data.user.userName,
                password: response.data.user.password
            })
            return {
                token: response.data.token,
                status: response.status,
                user: userRes,
                message: response.data.message,
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
    async Login(input: loginInput): Promise<signUpOutput> {
        const response = await this.httpClient.post("auth/login", input);
        if (response && response.status < 300) {
            const userRes =  new UserEntity({
                email: response.data.user.email,
                userName: response.data.user.userName,
                password: response.data.user.password,
                token: response.data.token,
                uuid: response.data.user.uuid,
            })
            return {
                token: response.data.token,
                status: response.status,
                user: userRes,
                message: response.data.message,
            }
        }
        return {
            status: response.status,
            message: response.data.message,
        }
    }
    async findUserByEmail(): Promise<signUpOutput> {
        const response = await this.httpClient.get("auth/protected");
        if (response && response.status < 300) {
          const userRes = new UserEntity({
            uuid: response.data.user.uuid,
            email: response.data.user.email,
            userName: response.data.user.userName,
            password: response.data.user.password,
          });
          return {
            token: response.data.token,
            status: response.status,
            user: userRes,
            message: response.data.message,
          };
        }
        return {
          status: response.status,
          message: response.data.message,
        };
      }
}