import envConfig from "../../../config/env.config";


class KapitalBankXml {
  constructor() {
  }

  async createOrderXml(amount,language){
    const merchant = envConfig.KAPITAL_BANK_MERCHANT;
    const currency = envConfig.KAPITAL_BANK_CURRENCY_AZE
    const approve = envConfig.KAPITAL_BANK_APPROVE_PATH;
    const cancel =  envConfig.KAPITAL_BANK_CANCEL_PATH;
    const decliner =  envConfig.KAPITAL_BANK_DECLINE_PATH;
    const $amount = amount * 100;
    return `<?xml version="1.0" encoding="UTF-8"?>
              <TKKPG>
                    <Request>
                            <Operation>CreateOrder</Operation>
                            <Language>${language}</Language>
                            <Order>
                                  <OrderType>Purchase</OrderType>
                                  <Merchant>${merchant}</Merchant>
                                  <Amount>${$amount}</Amount>
                                  <Currency>${currency}</Currency>
                                  <Description>Fex</Description>
                                  <ApproveURL>${approve}?status=approve</ApproveURL>
                                  <CancelURL>${cancel}?status=cancel</CancelURL>
                                  <DeclineURL>${decliner}?status=decline</DeclineURL>
                            </Order>
                    </Request>
              </TKKPG>`
  }

  async paymentStatus(orderID:string,sessionID:string,language:string){
    const merchant = envConfig.KAPITAL_BANK_MERCHANT;
     return `<?xml version="1.0" encoding="UTF-8"?>
                <TKKPG>
                    <Request>
                        <Operation>GetOrderStatus</Operation>
                        <Language>${language}</Language>
                        <Order>
                            <Merchant>${merchant}</Merchant>
                            <OrderID>${orderID}</OrderID>
                        </Order>
                        <SessionID>${sessionID}</SessionID>
                    </Request>
                </TKKPG>`
  }

  async getPaymentInformation(orderID:string,sessionID:string){
    const merchant = envConfig.KAPITAL_BANK_MERCHANT;
     return `<?xml version="1.0" encoding="UTF-8"?>
                <TKKPG>
                    <Request>
                        <Operation>GetOrderInformation</Operation>
                        <Language>EN</Language>
                        <Order>
                            <Merchant>${merchant}</Merchant>
                            <OrderID>${orderID}</OrderID>
                        </Order>
                        <SessionID>${sessionID}</SessionID>
                    </Request>
                </TKKPG>`
  }
}

export default KapitalBankXml
