import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseDTO } from './../../models/purchase.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  purchase: PurchaseDTO;
  installments: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.purchase = this.navParams.get('purchase');

      console.log(this.purchase);

      this.formGroup = this.formBuilder.group({
        installments: [1, [Validators.required]],
        "@type": ['paymentWithCard', [Validators.required]]
      });
  }

  nextPage() {
    this.purchase.payment = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', {purchase: this.purchase});
  }

}
