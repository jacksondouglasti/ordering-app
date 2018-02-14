import { ProductDTO } from './../../models/product.dto';
import { Cart } from './../../models/cart';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {

    }

    createOrClearCart() : Cart {
        let cart: Cart = { items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart = this.storage.getCart();

        if (cart == null) {
            cart = this.createOrClearCart();
        }

        return cart;
    }

    addProduct(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(i => i.product.id == product.id);

        if (position == -1) {
            cart.items.push({amount: 1, product: product});
        }
        
        this.storage.setCart(cart);
        return cart;
    }
}