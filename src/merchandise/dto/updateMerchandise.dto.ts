import { PartialType } from '@nestjs/mapped-types'; // 利用原本的DTO去建立一個內容元素是可選擇使用的新DTO
// import { PartialType } from '@nestjs/swagger'; // Insure Swagger UI can get all partial type properties
import { MerchandiseDto } from './merchandise.dto'; // 原本的DTO

export class UpdateMerchandiseDto extends PartialType(MerchandiseDto) {}