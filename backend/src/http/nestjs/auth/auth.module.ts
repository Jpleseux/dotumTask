import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterRepositoryTypeOrm } from "@modules/auth/infra/register/repository/registerRepository.typeorm";
import { DataSource } from "typeorm";
import { getDataSourceToken } from "@nestjs/typeorm";
import { RegisterGatewayLocal } from "@modules/auth/infra/register/gateway/registerGateway.local";
import { LoginRepositoryTypeorm } from "@modules/auth/infra/login/repository/loginRepositoryTypeOrm.orm";
import { LoginGatewayLocal } from "@modules/auth/infra/login/gateway/loginGatewayLocal.local";
import { middlewareGateway } from "@modules/shared/infra/gateway/middleware.gateway";
import { AuthorizationMiddleware } from "../middlewares/autorization.middleware";
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: RegisterRepositoryTypeOrm,
      useFactory: (dataSource: DataSource) => {
        return new RegisterRepositoryTypeOrm(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: RegisterGatewayLocal,
      useFactory: (dataSource: DataSource) => {
        return new RegisterGatewayLocal(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: LoginGatewayLocal,
      useFactory: (dataSource: DataSource) => {
        return new LoginGatewayLocal(dataSource);
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: LoginRepositoryTypeorm,
      useFactory: (dataSource: DataSource) => {
        return new LoginRepositoryTypeorm(dataSource);
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
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes("auth/protected");
  }
}
