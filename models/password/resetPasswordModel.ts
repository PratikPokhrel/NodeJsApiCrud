export class ResetPasswordModel {
  constructor(
    public userId?: string,
    public firstName?: string,
    public lastname?: string,
    public userName?: string,
    public password?: string,
    public confirmPassword?: string,
    public code?: string,
    public companyId?: number,
    public active?: boolean,
    public version?: string[]
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastname = lastname;
    this.userName = userName;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.code = code;
    this.companyId = companyId;
    this.active = active;
    this.version = version;
  }
}

