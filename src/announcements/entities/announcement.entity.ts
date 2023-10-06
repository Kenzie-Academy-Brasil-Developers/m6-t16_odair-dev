import { $Enums, Announcement } from '@prisma/client';

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
  user_id: string;
}
