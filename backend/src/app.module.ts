require("dotenv").config();
import { UserModel } from "@modules/auth/infra/database/models/UserModel.model";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./http/nestjs/auth/auth.module";
import { AccountModule } from "./http/nestjs/accounts/account.module";
import { AccountModel } from "@modules/accounts/infra/database/models/AccountModel.model";
import { AccountUserModel } from "@modules/accounts/infra/database/models/UserModel.model";
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_DEFAULT_DRIVER as any,
      host: process.env.DB_DEFAULT_HOST,
      port: process.env.DB_DEFAULT_PORT as any,
      database: process.env.DB_DEFAULT_NAME,
      username: process.env.DB_DEFAULT_USENAME,
      schema: process.env.DB_DEFAULT_SCHEMA ?? "public",
      password: process.env.DB_DEFAULT_PASSWORD,
      entities: [UserModel, AccountModel, AccountUserModel],
    }),
    AuthModule,
    AccountModule,
  ],
  controllers: [],
})
export class AppModule {}
