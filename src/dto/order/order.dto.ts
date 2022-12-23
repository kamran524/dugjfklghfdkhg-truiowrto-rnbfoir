import {
  IsString,
  IsAlphanumeric,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
  IsOptional,
  Min,
} from "class-validator";
import { ENUMS } from "../../enum/enums";

export class OrderDto {
  @IsNotEmpty()
  @IsMongoId()
  customerID: string;

  @IsNotEmpty()
  @IsMongoId()
  localBranchID: string;

  @IsNotEmpty()
  @IsMongoId()
  foreignBranchID: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  trackingNumber: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  productName: string;

  @IsNotEmpty()
  @IsString()
  shop: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsAlphanumeric()
  shopTrackingNumber: string;

  @IsNotEmpty()
  @IsNumber()
  invoicePrice: number;

  @IsOptional()
  @IsNumber()
  deliveryPrice?: number;

  @IsNotEmpty()
  @IsEnum(ENUMS.PAYMENT_METHODS)
  paymentMethod: typeof ENUMS.PAYMENT_METHODS;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsBoolean()
  isCustomsApproved?: boolean;

  @IsOptional()
  @IsDate()
  deliveryDate?: Date;

  @IsOptional()
  @IsEnum(ENUMS.ORDER_STATUS)
  status: typeof ENUMS.ORDER_STATUS;
}
