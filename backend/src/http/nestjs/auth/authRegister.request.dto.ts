import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class AuthRegisterUserRequestDto {
  @ApiProperty({ example: "userTeste" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  userName: string;

  @ApiProperty({ example: "12345678" })
  @IsString({ message: "A senha deve ser uma string" })
  @IsNotEmpty({ message: "A senha não pode ser vazia" })
  @MinLength(8, {
    message: "Senha precisa ter no minimo 8 caracteres.",
  })
  password: string;

  @ApiProperty({ example: "usuario91@email.com" })
  @IsString({ message: "O email deve ser uma string" })
  @IsNotEmpty({ message: "O email não pode ser vazio" })
  email: string;
}
