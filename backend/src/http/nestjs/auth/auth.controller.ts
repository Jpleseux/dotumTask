import { RegisterGatewayLocal } from "@modules/auth/infra/register/gateway/registerGateway.local";
import { RegisterRepositoryTypeOrm } from "@modules/auth/infra/register/repository/registerRepository.typeorm";
import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthRegisterUserResponse } from "./authRegister.response.dto";
import { AuthRegisterUserRequestDto } from "./authRegister.request.dto";
import { saveUserUsecase } from "@modules/auth/core/register/usecases/saveUser.usecase";
import { AuthLoginRequestDto } from "./authLogin.request.dto";
import { LoginUsecase } from "@modules/auth/core/login/usecases/login.usecase";
import { LoginGatewayLocal } from "@modules/auth/infra/login/gateway/loginGatewayLocal.local";
import { LoginRepositoryTypeorm } from "@modules/auth/infra/login/repository/loginRepositoryTypeOrm.orm";
import { FindUserByEmailUsecase } from "@modules/auth/core/register/usecases/findUserByEmail.usecase";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    readonly registerRepo: RegisterRepositoryTypeOrm,
    readonly registerGateway: RegisterGatewayLocal,
    readonly loginGateway: LoginGatewayLocal,
    readonly loginRepo: LoginRepositoryTypeorm,
  ) {}
  @ApiOkResponse({
    description: "",
    type: AuthRegisterUserResponse,
    isArray: false,
  })
  @Post("save/user")
  async saveUser(@Body() body: AuthRegisterUserRequestDto, @Res() response) {
    try {
      const action = new saveUserUsecase(this.registerRepo, this.registerGateway);
      const output = await action.execute(body);
      response.status(HttpStatus.OK).send({
        message: "Usuario salvo com sucesso",
        user: output.user.props,
        token: output.token,
      });
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).send({
        message: error.message,
      });
    }
  }
  @Post("login")
  async Login(@Body() body: AuthLoginRequestDto, @Res() response) {
    const action = new LoginUsecase(this.loginGateway, this.loginRepo);
    const output = await action.execute(body);
    response.status(HttpStatus.OK).send({
      message: "Login realizado com sucesso.",
      token: output.token,
      user: output.user.props,
    });
  }
  @Get("protected")
  async findUserByEmail(@Res() response, @Req() request) {
    const action = new FindUserByEmailUsecase(this.registerRepo);
    const tokenDecoded = request["tokenPayload"];
    response.status(HttpStatus.OK).send({
      user: (await action.execute(tokenDecoded.email)).props,
    });
  }
}
