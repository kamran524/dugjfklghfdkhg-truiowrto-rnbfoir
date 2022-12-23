import {GenderEnum} from "./storage/gender.enum";
import {Citizenship} from "./storage/citizenship.enum";
import {OrderStatus} from "./storage/order.status.enum";
import {PaymentMethods} from "./storage/payment.method.enum";
import {RequestObjects} from "./storage/request.objects.enum";
import {ImageSize, FileFormat} from "./storage/file.enum";
import {ApplicationEnum} from "./storage/application.enum";
import {KapitalStatusEnum} from "./storage/kapital.status.enum";
import {LanguageEnum} from "./storage/language.enum";
import {TariffEnums} from "./storage/tariffs.enum";


export class ENUMS {
  static readonly GENDER : typeof GenderEnum = GenderEnum;
  static readonly CITIZENSHIP = Citizenship;
  static readonly ORDER_STATUS = OrderStatus;
  static readonly PAYMENT_METHODS = PaymentMethods;
  static readonly REQUEST_OBJECTS : typeof RequestObjects  = RequestObjects;
  static readonly IMAGE_SIZE = ImageSize;
  static readonly  FILE_FORMAT = FileFormat;
  static readonly APPLICATION = ApplicationEnum;
  static readonly KAPiTAL_STATUS = KapitalStatusEnum;
  static readonly LANGUAGE = LanguageEnum;
  static readonly TARIFF_TYPE = TariffEnums;
  constructor() {}
}


