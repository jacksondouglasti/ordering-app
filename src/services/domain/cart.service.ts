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

    removeProduct(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(i => i.product.id == product.id);

        if (position != -1) {
            cart.items.splice(position, 1);
        }

        this.storage.setCart(cart);
        return cart;
    }

    increaseAmount(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(i => i.product.id == product.id);

        if (position != -1) {
            cart.items[position].amount++;
        }

        this.storage.setCart(cart);
        return cart;
    }

    decreaseAmount(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(i => i.product.id == product.id);

        if (position != -1) {
            cart.items[position].amount--;
            if (cart.items[position].amount < 1) {
                cart = this.removeProduct(product);
            }
        }

        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;

        for(var i = 0; i < cart.items.length; i++) {
            sum = sum += cart.items[i].product.price * cart.items[i].amount;
        }
        return sum;
    }
}