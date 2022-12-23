import {
  IsAlphanumeric,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  MinLength,
  isMongoId,
  IsOptional
} from "class-validator";
import { ENUMS } from "../../enum/enums";

export class OrderUpdateDto {

  @IsMongoId()
  id: string;

  @IsOptional()
  @IsAlphanumeric()
  trackingNumber?: string;

  @IsOptional()
  @IsAlphanumeric()
  productName?: string;

  @IsOptional()
  @IsAlphanumeric()
  shop?: string;

  @IsOptional()
  @IsNumber()
  @MinLength(1)
  quantity?: number;

  @IsOptional()
  @IsAlphanumeric()
  shopTrackingNumber?: string;

  @IsOptional()
  @IsNumber()
  invoicePrice?: number;

  @IsOptional()
  @IsNumber()
  deliveryPrice?: number;

  @IsOptional()
  @IsEnum(ENUMS.PAYMENT_METHODS)
  paymentMethod?: typeof ENUMS.PAYMENT_METHODS;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsBoolean()
  isCustomsApproved?: boolean;

  @IsOptional()
  @IsDate()
  deliveryDate?: Date;

  @IsOptional()
  @IsEnum(ENUMS.ORDER_STATUS)
  status?: typeof ENUMS.ORDER_STATUS;
}
