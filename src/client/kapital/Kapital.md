``https://pg.kapitalbank.az/docs
``

**_Test_** - https://tstpg.kapitalbank.az:5443/Exec
**_Prod_** - https://3dsrv.kapitalbank.az:5443/Exec

**_Purchase sorğusu_**
```
<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
      <Request>
              <Operation>CreateOrder</Operation>
              <Language>RU</Language>
              <Order>
                    <OrderType>Purchase</OrderType>
                    <Merchant>E1000010</Merchant>
                    <Amount>123456</Amount>
                    <Currency>944</Currency>
                    <Description>xxxxxxxx</Description>
                    <ApproveURL>/testshopPageReturn.jsp</ApproveURL>
                    <CancelURL>/testshopPageReturn.jsp</CancelURL>
                    <DeclineURL>/testshopPageReturn.jsp</DeclineURL>
              </Order>
      </Request>
</TKKPG>
```

**_Məbləğ_**
<Amount> sahəsində <Order> teqində əməliyyatın məbləğini həmişə 100-ə vurmalısınız. Məsələn, məbləğ 30 AZN-dirsə, <Məbləğ>-də 3000 yazmalısınız.

**_Dil seçimi_**
<Language> parametri boş buraxıla bilməz və yalnız AZ, EN, RU dəyərlərindən birini ala bilər.

**_Valyuta_**
<Currency> parametri boş buraxıla bilməz və yalnız 944 dəyərini ala bilər.

**_Redirect URL-lər_**
Ödəniş tamamlandıqdan sonra müştəri (cardholder) ödənişin statusundan asılı olaraq <ApproveURL>, <CancelURL> və <DeclineURL> parametrlərindən birinə yönləndiriləcək


**_Geri qaytarma sorğusu_**
```
<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
    <Request>
      <Operation>Refund</Operation>
      <Language>EN</Language>
      <Order>
        <Merchant>your_merchant_id</Merchant>
        <OrderID>original_order_id</OrderID>
          <Positions>
            <Position>
              <PaymentSubjectType>1</PaymentSubjectType>
              <Quantity>1</Quantity>
              <Price>1</Price>
              <Tax>1</Tax>
              <Text>name position</Text>
              <PaymentType>2</PaymentType>
              <PaymentMethodType>1</PaymentMethodType>
            </Position>
          </Positions>
      </Order>
      <Description>refund test</Description>
      <SessionID>original_session_id</SessionID>
      <Refund>
        <Amount>refund_amount</Amount>
        <Currency>944</Currency>
        <WithFee>false</WithFee>
      </Refund>                                                                                                                   
      <TranId></TranId>
      <Source>1</Source>
    </Request>
</TKKPG>
```

Zəhmət olmasa, bu sorğuda yalnız OrderID, SessionID, Amount teqlərini dəyişdirin.
Qeyd: Purchase əməliyyatı zamanı XMLOut-da əldə etdiyiniz TwoId dəyəri <TranId> parametrinə göndərilməlidir.

Qeyd: Refund əməliyyatının icra edilməsi üçün cari hesabınızda (bu, həmin hesaba bağlı kart deyil) həmin əməliyyatın miqdarı qədər vəsait olmalıdır, yoxsa sorğu nəticəsi olaraq 205 xəta cavab kodu alacaqsınız.




Ödəniş Prosesi
İnternet mağaza serveri Sifariş Yarat əməliyyatına XML cavabını alır və müştəri brauzerini Order/URL sahəsində alınan ünvana yönləndirir. POST və ya GET protokol sahələrini doldurmaq tələb olunur:

Sifariş ID - sifariş ID-si Order/Order ID  sahəsində qəbul edilmişdir

Sessiya ID - sessiya ID-si Order/SessionID  sahəsində qəbul edilmişdir

GET metodu ilə çağırış:
Test - https://tstpg.kapitalbank.az/index.jsp?ORDERID=Sizin_order_id&SESSIONID=Sizin_session_id
Prod - https://3dsrv.kapitalbank.az/index.jsp?ORDERID=Sizin_order_id&SESSIONID=Sizin_session_id

Sonra müştəri TWEC PG vasitəsilə ödəniş edir.

Test kartı məlumatları
Test kartı məlumatları
PAN: 4169733213495869
ExpDate: 05/23
CVV2: 447
Test sertifikatı olan test mühitində yalnız bu test kartından istifadə etməlisiniz. Real mühitində növbəti mərhələdə real kartdan istifadə etməlisiniz.




Sifariş Statusunu əldə edin
Müştəri sorğuda müəyyən edilmiş hər hansı URL-ə (Approve, Decline, Cancel) gedirsə, İnternet mağaza təhlükəsizlik məqsədləri üçün GetOrderStatus əməliyyatını yerinə yetirməli və cavabdan asılı olaraq xidməti təmin edib-etməmək barədə qərar verməlidir.

GetOrderStatus Sorğusu

```
<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
    <Request>
        <Operation>GetOrderStatus</Operation>
        <Language>RU</Language>
        <Order>
            <Merchant>E1000010</Merchant>
            <OrderID></OrderID>
        </Order>
        <SessionID></SessionID>
    </Request>
</TKKPG>
```

Response

```
<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
      <Request>
            <Operation>GetOrderStatus</Operation>
            <Status>30</Status>
            <Order>
                <OrderID></OrderID>
                <OrderStatus></OrderStatus>
            </Order>
            <AdditionalInfo>
                Receipt>BASE64-encode-info</Receipt>
            </AdditionalInfo>
      </Request>
</TKKPG>
```

Tranzaksiya haqqında daha ətraflı məlumat üçün GetOrderInformation sorğusundan istifadə edə bilərsiniz

GetOrderInformation sorğusu

```
<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
    <Request>
        <Operation>GetOrderInformation</Operation>
        <Language>EN</Language>
        <Order>
            <Merchant>E1000010</Merchant>
            <OrderID>14008766</OrderID>
        </Order>
        <SessionID>277F3E926B1FADDA45E449B0C0E8CF76</SessionID>
    </Request>
</TKKPG>
Response
<Order>
    <row>
        <id>15859914</id>
        <SessionID>02447E3150B781C426638A03706030A5</SessionID>
        <createDate>2021-02-22 10:43:36</createDate>
        <lastUpdateDate>2021-02-22 10:44:24</lastUpdateDate>
        <payDate>2021-02-22 10:44:24</payDate>
        <MerchantID>E1000010</MerchantID>
        <Amount>328</Amount>
        <Currency>944</Currency>
        <OrderLanguage>EN</OrderLanguage>
        <Description>xxxxx</Description>
        <ApproveURL>app.com</ApproveURL>
        <CancelURL>can.com</CancelURL>
        <DeclineURL>dec.com</DeclineURL>
        <Orderstatus>APPROVED</Orderstatus>
        <Receipt></Receipt>
        <twoId>2292054</twoId>
        <RefundAmount>0</RefundAmount>
        <RefundCurrency>null</RefundCurrency>
        <ExtSystemProcess>0</ExtSystemProcess>
        <OrderType>Purchase</OrderType>
        <OrderSubType></OrderSubType>
        <Fee>0</Fee>
        <Email></Email>
        <RefundDate>0000-00-00 00:00:00</RefundDate>
        <TWODate>210222</TWODate>
        <TWOTime>104424</TWOTime>
    </row>
</Order>
```
-------------------------------------------------------------------------------

<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
    <Request>
        <Operation>GetOrderInformation</Operation>
        <Language>EN</Language>
        <Order>
            <Merchant>E1000010</Merchant>
            <OrderID>14008766</OrderID>
        </Order>
        <SessionID>277F3E926B1FADDA45E449B0C0E8CF76</SessionID>
    </Request>
</TKKPG>
Response
<Order>
    <row>
        <id>15859914</id>
        <SessionID>02447E3150B781C426638A03706030A5</SessionID>
        <createDate>2021-02-22 10:43:36</createDate>
        <lastUpdateDate>2021-02-22 10:44:24</lastUpdateDate>
        <payDate>2021-02-22 10:44:24</payDate>
        <MerchantID>E1000010</MerchantID>
        <Amount>328</Amount>
        <Currency>944</Currency>
        <OrderLanguage>EN</OrderLanguage>
        <Description>xxxxx</Description>
        <ApproveURL>app.com</ApproveURL>
        <CancelURL>can.com</CancelURL>
        <DeclineURL>dec.com</DeclineURL>
        <Orderstatus>APPROVED</Orderstatus>
        <Receipt></Receipt>
        <twoId>2292054</twoId>
        <RefundAmount>0</RefundAmount>
        <RefundCurrency>null</RefundCurrency>
        <ExtSystemProcess>0</ExtSystemProcess>
        <OrderType>Purchase</OrderType>
        <OrderSubType></OrderSubType>
        <Fee>0</Fee>
        <Email></Email>
        <RefundDate>0000-00-00 00:00:00</RefundDate>
        <TWODate>210222</TWODate>
        <TWOTime>104424</TWOTime>
    </row>
</Order>


Xəta kodları
Status
Sorğunun icra nəticəsi:
00 - uğurlu
30 – Yanlış mesaj formatı (məcburi sahələr yoxdur və s.)
10 – İnternet mağazanın CreateOrder əməliyyatına çıxışı yoxdur (yaxud internet mağaza qeydiyyatdan keçməyib)
54 – Yanlış əməliyyat
96 - Sistem xətası







Cavab siyahısı
<ResponceList>
<Response code="000" eng="Approved, balances available" rus="Удачное выполнение транзакции" />
<Response code="001" eng="Approved, no balances available" rus="Удачное выполнение транзакции"/>
<Response code="003" eng="Approved, additional identification requested" rus="Транзакция выполнена, требуется дополнительная идентификация"/>
<Response code="007" eng="Approved administrative transaction" rus="Административная транзакция выполнена успешно"/>
<Response code="050" eng="General" rus="Финансовая транзакция не выполнена"/>
<Response code="020" eng="Code - 20, unknown system error" rus="Код ошибки - 20, неизвестная системная ошибка"/>
<Response code="051" eng="Expired card" rus="Карта клиента просрочена"/>
<Response code="052" eng="Number of PIN tries exceeded" rus="Превышено число попыток ввода PIN"/>
<Response code="053" eng="No sharing allowed" rus="Не удалось маршрутизировать транзакцию"/>
<Response code="055" eng="Invalid transaction" rus="Транзакция имеет некорректные атрибуты или данная операция не разрешена"/>
<Response code="056" eng="Transaction not supported by institution" rus="Запрашиваемая операция не поддерживается хостом"/>
<Response code="057" eng="Lost or stolen card" rus="Карта клиента имеет статус 'потеряна' или 'украдена' "/>
<Response code="058" eng="Invalid card status" rus="Карта клиента имеет неправильный статус"/>
<Response code="059" eng="Restricted status" rus="Карта клиента имеет ограниченные возможности"/>
<Response code="060" eng="Account not found" rus="Не найден вендор с указанным номером счета"/>
<Response code="061" eng="Wrong customer information for payment" rus="Неверное количество информационных полей для заданного вендора"/>
<Response code="062" eng="Customer information format error" rus="Неверный формат информационного поля платежа"/>
<Response code="063" eng="Prepaid Code not found" rus="Не найден prepaid-код"/>
<Response code="064" eng="Bad track information Track2" rus="Track2 карты клиента содержит неверную информацию"/>
<Response code="069" eng="Bad message edit" rus="Неверный формат сообщения"/>
<Response code="074" eng="Unable to authorize" rus="Невозможно авторизовать"/>
<Response code="075" eng="Invalid credit PAN" rus="Неверный PAN карты"/>
<Response code="076" eng="Insufficient funds" rus="На счете не хватает средств"/>
<Response code="078" eng="Duplicate transaction received" rus="Произошло дублирование транзакции"/>
<Response code="082" eng="Maximum number of times used" rus="Превышение количества использований карты клиента"/>
<Response code="085" eng="Balance not allowed" rus="Невозможно выдать баланс"/>
<Response code="095" eng="Amount over maximum" rus="Превышение лимита по сумме"/>
<Response code="100" eng="Unable to process" rus="Невозможно провести транзакцию"/>
<Response code="101" eng="Unable to authorize – call issuer" rus="Невозможно авторизовать – необходимо позвонить издателю карты "/>
<Response code="105" eng="Card not supported" rus="Данный тип карт не поддерживается"/>
<Response code="200" eng="Invalid account" rus="Неправильный счет клиента"/>
<Response code="201" eng="Incorrect PIN" rus="Неправильный PIN"/>
<Response code="205" eng="Invalid advance amount" rus="Некорректная сумма"/>
<Response code="209" eng="Invalid transaction code" rus="Неверный код транзакции"/>
<Response code="210" eng="Bad CAVV" rus="Неверное значение CAVV"/>
<Response code="211" eng="Bad Cvv2" rus="Неверное значение CVV2 "/>
<Response code="212" eng="Original transaction not found for slip" rus="Не найдена оригинальная транзакция для слипа"/>
<Response code="213" eng="Slip already received" rus="Слип принимается повторно"/>
<Response code="800" eng="Format error" rus="Ошибка формата"/>
<Response code="801" eng="Original transaction not found" rus="Не найдена оригинальная транзакция для реверса"/>
<Response code="809" eng="Invalid close transaction" rus="Неверная операция закрытия периода"/>
<Response code="810" eng="Transaction timeout" rus="Произошел тайм-аут"/>
<Response code="811" eng="System error" rus="Системная ошибка"/>
<Response code="820" eng="Invalid terminal identifier" rus="Неправильный идентификатор терминала"/>
<Response code="880" eng="Download has been received in its entirety" rus="Был послан последний пакет - прогрузка успешно завершена"/>
<Response code="881" eng="Download received successfully and there is more data for this download" rus="Предыдущий этап прогрузки был успешно выполнен –имеются еще данные"/>
<Response code="882" eng="Download aborted (call for service)" rus="Прогрузка терминала остановлена, необходимо позвонить в процессинговый центр"/>
<Response code="897" eng="Invalid cryptogram" rus="Получена неверная криптограмма в транзакции"/>
<Response code="898" eng="Invalid MAC" rus="Получен неверный MAC"/>
<Response code="899" eng="Sequence error—resync" rus="Ошибка синхронизации"/>
<Response code="900" eng="Pin Tries Limit Exceeded" rus="Превышено число попыток ввода PIN, требуется захват карты"/>
<Response code="901" eng="Expired Card" rus="Карта просрочена, требуется захват карты"/>
<Response code="909" eng="External Decline Special Condition" rus="Требуется захват карты"/>
<Response code="959" eng="Administrative transaction not supported" rus="Административная транзакция не поддерживается"/>
<Response code="-1" eng="System error, POS not answer" rus="Системная ошибка, POS не отвечает"/>
<Response code="500" eng="None" rus=" "/>
<Response code="501" eng="Approved" rus="Транзакция выполнена успешно"/>
<Response code="502" eng="Partially approved" rus="ТТранзакция выполнена успешно на частичную сумму"/>
<Response code="503" eng="Purchase only approved" rus="Транзакция выполнена успешно только на сумму покупки (для транзакции 118 – Purchase with Cashback)"/>
<Response code="503" eng="Purchase only approved" rus="Транзакция выполнена успешно только на сумму покупки (для транзакции 118 – Purchase with Cashback)"/>
<Response code="510" eng="Should select account number" rus="Нет номера счета в запросе транзакции, есть несколько счетов указанного типа, и терминал поддерживает выбор счета"/>
<Response code="511" eng="Should change PVV" rus="Необходимо сменить PVV (разрешена только транзакция PIN Change)"/>
<Response code="512" eng="Confirm Payment Precheck" rus="Необходимо подтвердить результаты проверки платежа в системе online-приема платежей"/>
<Response code="513" eng="Select Bill" rus="Транзакция запроса списка уведомлений выполнена успешно"/>
<Response code="514" eng="Customer confirmation requested" rus="Необходимо подтвердить результаты предпроверки операции"/>
<Response code="515" eng="Original transaction not found" rus="Не найдена оригинальная транзакция"/>
<Response code="516" eng="Slip already received" rus="Слип уже принят"/>
<Response code="517" eng="Personal information input error" rus="Ошибка в реквизитах платежа"/>
<Response code="520" eng="Prepaid code not found" rus="Невозможно захватить Prepaid-код"/>
<Response code="521" eng="Corresponding account exhausted" rus="Баланс корр. счета исчерпан"/>
<Response code="522" eng="Acquirer limit exceeded" rus="Превышен эквайринговый лимит"/>
<Response code="524" eng="Dynamic PVV Expired" rus="Истек срок действия диамического PVV"/>
<Response code="525" eng="Weak PIN" rus="Слабый PIN"/>
<Response code="540" eng="Lost card" rus="Карта потеряна"/>
<Response code="541" eng="Stolen card" rus="Карта украдена"/>
<Response code="549" eng="Ineligible vendor account" rus="Недопустимый тип платежа для данного вендора"/>
<Response code="550" eng="Unauthorized usage" rus="Несанкционированное использование"/>
<Response code="551" eng="Expired card" rus="Истек срок действия карты"/>
<Response code="552" eng="Invalid card" rus="Неверная карта"/>
<Response code="553" eng="Invalid PIN" rus="Неверный PIN-код"/>
<Response code="554" eng="System error" rus="Системная ошибка"/>
<Response code="555" eng="Ineligible transaction" rus="Неподходящая транзакция"/>
<Response code="556" eng="Ineligible account" rus="Неподходящий счет"/>
<Response code="557" eng="Transaction not supported" rus="Транзакция не поддерживается"/>
<Response code="558" eng="Restricted Card" rus="Карта ограничена (данная операция по карте не разрешена)"/>
<Response code="559" eng="Insufficient funds" rus="Недостаточно средств на счете"/>
<Response code="560" eng="Uses limit exceeded" rus="Превышен лимит на число использований карты"/>
<Response code="561" eng="Withdrawal limit would be exceeded" rus="Лимит на снятие наличных будет превышен"/>
<Response code="562" eng="PIN tries limit was reached" rus="Достигнут или превышен лимит на число неверных вводов PIN-кода"/>
<Response code="563" eng="Withdrawal limit already reached" rus="Достигнут лимит на снятие наличных"/>
<Response code="564" eng="Credit amount limit" rus="Достигнут лимит на депозит"/>
<Response code="565" eng="No statement information" rus="Нет информации для предоставления отчета по счету"/>
<Response code="566" eng="Statement not available" rus="Предоставление отчета по счету невозможно (запрещено)"/>
<Response code="567" eng="Invalid amount" rus="Недопустимая сумма"/>
<Response code="568" eng="External decline" rus="Транзакция отвергнута внешним хостом"/>
<Response code="569" eng="No sharing" rus="Несогласованный запрос (данная карта не обслуживается в данном терминале)"/>
<Response code="571" eng="Contact card issuer" rus="Необходимо обратиться к издателю"/>
<Response code="572" eng="Destination not available" rus="Авторизатор недоступен"/>
<Response code="573" eng="Routing error" rus="Ошибка маршрутизации"/>
<Response code="574" eng="Format error" rus="Ошибка формата"/>
<Response code="575" eng="External decline special condition" rus="Транзакция отвергнута внешним хостом по специальному условию (владелец карты подозревается в мошенничестве)"/>
<Response code="580" eng="Bad CVV" rus="Неверный CVV"/>
<Response code="581" eng="Bad CVV2" rus="Неверный CVV2"/>
<Response code="582" eng="Invalid transaction" rus="Неверная транзакция (транзакция не разрешена с такими условиями проведения)"/>
<Response code="583" eng="PIN tries limit was exceeded" rus="Лимит на число неверных вводов PIN-кода УЖЕ достигнут (т.е. ранее был достигнут лимит на число неверных вводов PIN-кода, после чего был введен верный PIN)"/>
<Response code="584" eng="Bad CAVV" rus="Неверное значение проверочного числа 3D Secure Cardholder Authentication Verification Value"/>
<Response code="585" eng="Bad ARQC" rus="Неверное значение криптограммы ARQC"/>
<Response code="00" eng="Not enrolled or element is missing" rus="Карта не подписана на 3-D Secure"/>
<Response code="05" eng="Authentication failed, order declined" rus="Авторизация отклонена"/>
<Response code="18" eng="Wrong authorization code" rus="Некорректный авторизационный код"/>
</ResponceList>









FAQ
Əgər tranzaksiya ilə bağlı probleminiz varsa, bizə ORDERID/SESSIONID və əməliyyat tarixini göndərin.
Hər hansı bir əməliyyatdan sonra serverimiz avtomatik olaraq sizə XmlOut Mesajı göndərir. Bu mesajda siz əməliyyatla bağlı bütün məlumatları tapa bilərsiniz. OrderStatus və ResponseDescription elementlərinə diqqət yetirin.
Bütün testlərinizi bitirdikdən sonra, zəhmət olmasa, bizimlə əlaqə saxlayın və real mühit mərhələsinə başlamaq üçün MID (Merchant ID) təqdim etməyimizi xahiş edin.
Əgər “3dsrv.kapitalbank.az (və ya tstpg.kapitalbank.az) 5443 portuna qoşulmaq alınmadı: Bağlantı rədd edildi” xətası ilə qarşılaşırsınızsa, serverinizdə 5443 portunu çıxışın aktiv olmasını yoxlayın.
IP : 85.132.41.198
Test mühitində siz yalnız test kartı məlumatlarından istifadə edə bilərsiniz.
Əgər csr faylının yaradılması ilə bağlı probleminiz varsa, zəhmət olmasa, bu onlayn alətdən istifadə edin: csrgenerator.com
