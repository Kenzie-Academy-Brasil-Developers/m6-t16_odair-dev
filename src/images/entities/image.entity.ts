import { Image } from '@prisma/client';

export class ImageEntity implements Image {
  id: string;
  url: string;
  announcement_id: string;
}
