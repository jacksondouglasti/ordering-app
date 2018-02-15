import { PurchaseService } from './../../services/domain/purchase.service';
import { ClientService } from './../../services/domain/client.service';
import { AddressDTO } from './../../models/address.dto';
import { ClientDTO } from './../../models/client.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PurchaseDTO } from '../../models/purchase.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  purchase: PurchaseDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  idPurchase: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService,
    public purchaseService: PurchaseService) {
  
    this.purchase = this.navParams.get('purchase');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService.findById(this.purchase.client.id)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.address = this.findAddresses(this.purchase.deliveryAddress.id, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findAddresses(id: string, list: AddressDTO[]) : AddressDTO {
    let position = list.findIndex(a => a.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    this.purchaseService.insert(this.purchase)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.idPurchase = this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  private extractId(location: string ) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
