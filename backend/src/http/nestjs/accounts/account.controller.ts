import { AccountsRepositoryTypeOrm } from "@modules/accounts/infra/repository/accounts.repository";
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateAccountDto } from "./NewAccount.request.dto";
import { CreateNewAccountUsecase } from "@modules/accounts/core/usecases/createNewAccount.usecase";
import { GetAllAccountsByUserUsecase } from "@modules/accounts/core/usecases/getAllAccountsByUser.usecase";
import { GetOneAccountUsecase } from "@modules/accounts/core/usecases/getOneAccount.usecase";
import { DeleteAccountUsecase } from "@modules/accounts/core/usecases/deleteAccount.usecase";
import { FinishAccountUsecase } from "@modules/accounts/core/usecases/FinishAccount.usecase";
import { EditAccountDto } from "./EditAccount.request.dto";
import { UpdateAccountUsecase } from "@modules/accounts/core/usecases/updateAccount.usecase";

@ApiTags("Account")
@Controller("account")
export class AccountController {
  constructor(readonly repo: AccountsRepositoryTypeOrm) {}
  @Post("protected/save")
  async saveAccount(@Body() body: CreateAccountDto, @Res() res, @Req() req) {
    const tokenDecoded = req["tokenPayload"];
    const account = await new CreateNewAccountUsecase(this.repo).execute({ ...body, userUuid: tokenDecoded.uuid });
    res.status(HttpStatus.OK).send({
      account: account.props,
      message: "Nova conta adicionada com sucesso",
    });
  }
  @Get("protected/all")
  async getAllAccountByUser(@Req() req, @Res() res) {
    const tokenDecoded = req["tokenPayload"];
    const accounts = await new GetAllAccountsByUserUsecase(this.repo).execute(tokenDecoded.uuid);
    res.status(HttpStatus.OK).send({
      accounts: accounts.map((account) => account.props),
      message: "Nova conta adicionada com sucesso",
    });
  }
  @Get("protected/:uuid")
  async getAccountByUuid(@Param("uuid") uuid: string, @Res() res) {
    const account = await new GetOneAccountUsecase(this.repo).execute(uuid);
    res.status(HttpStatus.OK).send({
      account: account.props,
    });
  }
  @Delete("protected/:uuid")
  async DeleteAccount(@Param("uuid") uuid: string, @Res() res) {
    await new DeleteAccountUsecase(this.repo).execute(uuid);
    res.status(HttpStatus.OK).send({
      message: "Conta deletada",
    });
  }
  @Patch("protected/finish/:uuid")
  async FinishAccount(@Param("uuid") uuid: string, @Res() res) {
    await new FinishAccountUsecase(this.repo).execute(uuid);
    res.status(HttpStatus.OK).send({
      message: "Conta finalizada",
    });
  }
  @Patch("protected/edit/:uuid")
  async EditAccount(@Param("uuid") uuid: string, @Res() res, @Body() body: EditAccountDto) {
    const account = await new UpdateAccountUsecase(this.repo).execute(uuid, body);
    res.status(HttpStatus.OK).send({
      message: "Conta atualizada",
      account: account.props,
    });
  }
}
