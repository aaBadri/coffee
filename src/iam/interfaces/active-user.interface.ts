import { Role } from 'src/users/enum/role.enum';

export interface ActiveUserData {
  sub: string;
  email: string;
  role: Role;
}
