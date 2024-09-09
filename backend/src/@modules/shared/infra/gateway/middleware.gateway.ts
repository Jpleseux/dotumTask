require("dotenv").config();
import { DataSource } from "typeorm";
import * as bcryptjs from "bcryptjs";
import { UserModel } from "@modules/auth/infra/database/models/UserModel.model";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "@modules/auth/core/login/entities/user.entity";
const secret = process.env.SRECRET;

export class middlewareGateway {
  constructor(readonly datasorce: DataSource) {}

  async userValidatePassword(user: UserEntity, password: string): Promise<boolean> {
    const userModel = await this.datasorce
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid: user.uuid() })
      .getOne();
    return await bcryptjs.compare(password, userModel.password);
  }

  async tokenGenerate(user: UserEntity): Promise<string> {
    const token = jwt.sign(user.payloadToken(), secret);
    return token;
  }

  async tokenDecoding(token: string): Promise<any> {
    try {
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (error) {
      throw new HttpException({ message: "Você não está autorizado" }, HttpStatus.UNAUTHORIZED);
    }
  }
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(12);
    const passwordHash = await bcryptjs.hash(password, salt);
    return passwordHash;
  }
}
