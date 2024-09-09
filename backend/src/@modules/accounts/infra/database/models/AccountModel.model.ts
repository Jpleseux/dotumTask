import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("user_accounts")
export class AccountModel {
  @PrimaryColumn("uuid")
  uuid: string;
  @CreateDateColumn()
  created_at?: Date;
  @UpdateDateColumn()
  updated_at?: Date;
  @DeleteDateColumn()
  deleted_at?: Date;

  @Column()
  name: string;
  @Column()
  description: string;
  @Column("double precision")
  value: number;
  @Column({ name: "expiration_date" })
  expirationDate: Date;
  @Column({ name: "user_uuid" })
  userUuid: string;
  @Column({ name: "account_type" })
  accountType: "pay" | "receive";
  @Column({ name: "is_done", default: false })
  isDone: boolean;
}
