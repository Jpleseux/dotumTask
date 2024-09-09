import { UserEntity } from "../../../entities/auth/User.entity";
export type signUpOutput = {
    status: number,
    user?: UserEntity,
    message: string,
    token?: string
}
export type Output = {
    status: number,
    message: string,
}
export type loginInput = {
    email: string;
    password: string;
}

export interface userGateway {
    signUp(user: UserEntity): Promise<signUpOutput>;
    Login(input: loginInput): Promise<signUpOutput>;
    findUserByEmail(): Promise<signUpOutput>;
}