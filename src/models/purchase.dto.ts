import { PurchaseItemDTO } from './purchaseitem.dto';
import { PaymentDTO } from './payment.dto';
import { RefDTO } from './ref.dto';

export interface PurchaseDTO {
    client: RefDTO;
    deliveryAddress: RefDTO;
    payment: PaymentDTO;
    items: PurchaseItemDTO[];
}