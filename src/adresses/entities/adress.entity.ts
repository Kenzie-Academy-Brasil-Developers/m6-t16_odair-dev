import { Address } from '@prisma/client';

export class AdressEntity implements Address {
  id: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement: string;
  user_id: string;
}
