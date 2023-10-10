import { $Enums, Address, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
export class UserEntity implements User {
  id: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birth: Date;
  description: string;

  @Exclude()
  password: string;

  type: $Enums.Type_user;
  Address: Address;
}
