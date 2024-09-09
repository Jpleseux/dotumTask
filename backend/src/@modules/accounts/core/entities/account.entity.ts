export type AccountProps = {
  uuid: string;
  name: string;
  description: string;
  value: number;
  expirationDate: Date;
  accountType: "pay" | "receive";
  userUuid: string;
  isDone?: boolean;
};
export class AccountEntity {
  constructor(readonly props: AccountProps) {}

  uuid(): string {
    return this.props.uuid;
  }

  name(): string {
    return this.props.name;
  }

  description(): string {
    return this.props.description;
  }
  isDone(): boolean {
    return this.props.isDone;
  }
  value(): number {
    return this.props.value;
  }

  expirationDate(): Date {
    return this.props.expirationDate;
  }
  accountType(): "pay" | "receive" {
    return this.props.accountType;
  }
  userUuid(): string {
    return this.props.userUuid;
  }

  setName(name: string) {
    this.props.name = name;
  }

  setDescription(description: string) {
    this.props.description = description;
  }

  setValue(value: number) {
    this.props.value = value;
  }

  setExpirationDate(expirationDate: Date) {
    this.props.expirationDate = expirationDate;
  }

  setUserUuid(userUuid: string) {
    this.props.userUuid = userUuid;
  }
}
