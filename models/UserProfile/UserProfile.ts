export class UserProfile {
  constructor(public id?: number, public userName?: string, public firstName?: string,
    public lastName?: string, public image_url?: string,
    public phoneNo?: string, public mobileNo?: string,
    public city?: string, public street?: string, public email?: string,
    public state?: string, public roles?: string[], public departments?: string[], public attachmentFiles?: File[]) {

    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image_url = image_url;
    this.phoneNo = phoneNo;
    this.mobileNo = mobileNo;
    this.city = city;
    this.street = street;
    this.state = state;
    this.email = email;
    this.roles = roles;
    this.departments = departments;
    this.attachmentFiles = attachmentFiles;
 }
  
}
