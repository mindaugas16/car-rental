import {UserRoleEnum} from '../../shared/enums/user-role.enum';

export interface User {
  userId: string;
  email: string;
  name: string;
  surname: string;
  birthDate: string;
  password: string;
  driverLicenseNumber: number;
  role: UserRoleEnum;
  token: string;
}
