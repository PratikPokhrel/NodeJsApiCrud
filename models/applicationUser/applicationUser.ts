import { Role } from "../applicationUser/Role";

export class applicationUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNo: string;
  mobileNo: string;
  email: string;
  passwordHash: string;
  roles: string[];
  userName: string;
  confirmPassword: string;
  address: Address;
  image_url: string;
  departments: string[];
}

export class Address {
  city: string;
  state: string;
  province: string;
  id: string;
}
