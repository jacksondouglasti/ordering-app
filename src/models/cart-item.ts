import { ProductDTO } from './product.dto';

export interface CartItem {
    amount: number;
    product: ProductDTO;
}