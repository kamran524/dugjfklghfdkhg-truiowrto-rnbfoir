
export enum KapitalStatusEnum{
  SUCCESSFUL="00",
  WRONG_MESSAGE_FORMAT="30",
  SHOP_NOT_REGISTERED="10 ",
  WRONG_OPERATION="54 ",
  OPERATION_SYSTEM_ERROR="96",
  APPROVED_BALANCES_AVAILABLE = '000',
  APPROVED_BALANCES_NO_AVAILABLE = '001',
  UNKNOWN_SYSTEM_ERROR = '020',
  NO_SHARING_ALLOWED = '053',
  INVALID_TRANSACTION = '055',
  LOST_OR_STOLEN_CARD = '057',
  INVALID_CARD_STATUS = '058',
  RESTRICTED_STATUS = '059',
  ACCOUNT_NOT_FOUND = '060',
  WRONG_CUSTOMER_INFORMATION_FOR_PAYMENT = '061',
  CUSTOMER_INFORMATION_FORMAT_ERROR = '062',
  DUPLICATE_TRANSACTION_RECEIVED = '078',
  BALANCE_NOT_ALLOWED = '085',
  AMOUNT_OVER_MAXIMUM = '095',
  UNABLE_TO_PROCESS = '100',
  CARD_NOT_SUPPORTED = '105',
  INVALID_ACCOUNT = '200',
  INVALID_ADVANCE_AMOUNT = '205',
  INVALID_TRANSACTION_CODE = '209',
  FORMAT_ERROR = '800',
  ORIGINAL_TRANSACTION_NOT_FOUND = '801',
  TRANSACTION_TIMEOUT = '810',
  SYSTEM_ERROR = '811',
  EXPIRED_CARD = '901',
  APPROVED = '501',
  PARTIALLY_APPROVED = '502',
  PURCHASE_ONLY_APPROVED = '503',
}