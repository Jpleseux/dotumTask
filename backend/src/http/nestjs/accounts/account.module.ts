import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AuthorizationMiddleware } from "../middlewares/autorization.middleware";
import { AccountsRepositoryTypeOrm } from "@modules/accounts/infra/repository/accounts.repository";
import { DataSource } from "typeorm";
import { getDataSourceToken } from "@nestjs/typeorm";
import { middlewareGateway } from "@modules/shared/infra/gateway/middleware.gateway";

@Module({
  controllers: [AccountController],
  providers: [
    {
      provide: AccountsRepositoryTypeOrm,
      useFactory: (dataSource: DataSource) => {
        return new AccountsRepositoryTypeOrm(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: middlewareGateway,
      useFactory: (dataSource: DataSource) => {
        return new middlewareGateway(dataSource);
      },
      inject: [getDataSourceToken()],
    },
  ],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes("account/protected");
  }
}
