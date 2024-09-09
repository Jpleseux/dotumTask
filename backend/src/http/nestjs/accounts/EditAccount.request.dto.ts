import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class EditAccountDto {
  @ApiProperty({ example: "Pagamento de contas" })
  name: string;

  @ApiProperty({ example: "Pagamento da fatura do cartão" })
  description: string;

  @ApiProperty({ example: 150.0 })
  value: number;

  @ApiProperty({ example: "2024-09-01T00:00:00Z" })
  @Transform(({ value }) => new Date(value))
  expirationDate: Date;

  @ApiProperty({ example: "pay", enum: ["pay", "receive"] })
  accountType: "pay" | "receive";
}
