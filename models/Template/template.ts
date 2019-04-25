import { Category } from "../category/category";
import { subCategory } from "../subCategory/subCategory";
import { TemplateFile } from "../TemplateFile/TemplateFile";
import { permissionRule } from "../permissionRule/permissionRule";

export class Template {
  id: string;
  templateName: string;
  templateURL: string;
  assignedON: Date;
  updatedOn: Date;
  updatedBy: string;
  categoryName: string;
  subCatName: string;
  category: Category;
  subCategory: subCategory;
  categoryId: string;
  subCategoryId: string;
  templateFile: TemplateFile[];
  attachments: Document[];
  permissionRule: permissionRule;
}
