import { $Enums, Announcement, Image } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AnnouncementEntity implements Announcement {
  id: string;
  mark: string;
  model: string;
  year: number;
  fuel: $Enums.Type_fuel;
  km: number;
  color: string;
  price: number;
  fipe: number;
  description: string;

  @Exclude()
  user_id: string;

  image?: Image[];
}
