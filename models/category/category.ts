import { subCategory } from '../subCategory/subCategory';

export class Category {
  id: string;
  categoryName: string;
  isActive: boolean;
  categoryCode: string;
  color: string;
  items: subCategory[];
}
