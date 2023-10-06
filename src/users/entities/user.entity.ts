import { $Enums, User } from '@prisma/client';
export class UserEntity implements User {
  id: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birth: Date;
  description: string;
  password: string;
  type: $Enums.Type_user;
}
