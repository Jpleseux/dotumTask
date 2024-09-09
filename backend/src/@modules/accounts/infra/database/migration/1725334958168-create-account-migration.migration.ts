import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccountMigration1725334958168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_accounts",
        columns: [
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
          {
            name: "uuid",
            type: "uuid",
            isPrimary: true,
            primaryKeyConstraintName: "PK_user_accounts",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "value",
            type: "DOUBLE PRECISION",
          },
          {
            name: "expiration_date",
            type: "date",
          },
          {
            name: "user_uuid",
            type: "uuid",
          },
          {
            name: "is_done",
            type: "boolean",
            default: false,
          },
          {
            name: "account_type",
            type: "enum",
            enum: ["pay", "receive"],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_accounts");
  }
}
