export type userProps = {
  uuid: string;
  email: string;
  password: string;
  userName: string;
};

export class UserEntity {
  constructor(readonly props: userProps) {}
  email(): string {
    return this.props.email;
  }
  uuid(): string {
    return this.props.uuid;
  }
  password(): string {
    return this.props.password;
  }
  userName(): string {
    return this.props.userName;
  }
  setUserName(userName: string) {
    this.props.userName = userName;
  }
  setEmail(email: string) {
    this.props.email = email;
  }
  setPassword(Password: string) {
    this.props.password = Password;
  }
  payloadToken() {
    const payload: any = {
      uuid: this.props.uuid,
      name: this.props.userName,
      email: this.props.email,
    };
    return payload;
  }
}
