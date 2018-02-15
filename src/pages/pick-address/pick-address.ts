import { CartService } from './../../services/domain/cart.service';
import { PurchaseDTO } from './../../models/purchase.dto';
import { ClientService } from './../../services/domain/client.service';
import { AddressDTO } from './../../models/address.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[];
  purchase: PurchaseDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'];

          let cart = this.cartService.getCart();

          this.purchase = {
            client: {id: response['id']},
            deliveryAddress: null,
            payment: null,
            items: cart.items.map(c => { return {amount: c.amount, product: {id: c.product.id}}})
          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }

  nextPage(item: AddressDTO) {
    this.purchase.deliveryAddress = {id: item.id};
    this.navCtrl.push('PaymentPage', {purchase: this.purchase});
  }

}
