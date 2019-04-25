
import { permissionRule } from "../permissionRule/permissionRule";
import { Category } from '../category/category';
import { subCategory } from '../subCategory/subCategory';
import { AssetFile } from '../assetFile/assetFile';

export class Asset {
  id: string;
  assetName: string;
  assetURL: boolean;
  assignedON: Date;
  updatedOn: Date;
  updatedBy: string;
  categoryName: string;
  subCatName: string;
  category: Category;
  subCategory: subCategory;
  categoryId: string;
  subCategoryId: string;
  assetFiles: AssetFile[];
  attachments: Document[];
  permissionRule: permissionRule;
  createdOn: Date;
  createdBy: string;
  color: string;
  subColor: string;
  totalFiles: string;
  firstName: string;
  lastName: string;
  image_url: string;
}
