import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsDate, IsEnum } from "class-validator";

export class CreateAccountDto {
  @ApiProperty({ example: "Pagamento de contas" })
  @IsString({ message: "O nome deve ser uma string" })
  @IsNotEmpty({ message: "O nome não pode ser vazio" })
  name: string;

  @ApiProperty({ example: "Pagamento da fatura do cartão" })
  @IsString({ message: "A descrição deve ser uma string" })
  @IsNotEmpty({ message: "A descrição não pode ser vazia" })
  description: string;

  @ApiProperty({ example: 150.0 })
  @IsNumber({}, { message: "O valor deve ser um número" })
  @IsNotEmpty({ message: "O valor não pode ser vazio" })
  value: number;

  @ApiProperty({ example: "2024-09-01T00:00:00Z" })
  @Transform(({ value }) => new Date(value)) // Converte o valor para Date
  @IsDate({ message: "A data de expiração deve ser uma data válida" })
  @IsNotEmpty({ message: "A data de expiração não pode ser vazia" })
  expirationDate: Date;

  @ApiProperty({ example: "pay", enum: ["pay", "receive"] })
  @IsEnum(["pay", "receive"], { message: "O tipo de conta deve ser 'pay' ou 'receive'" })
  @IsNotEmpty({ message: "O tipo de conta não pode ser vazio" })
  accountType: "pay" | "receive";
}
