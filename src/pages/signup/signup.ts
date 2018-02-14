import { ClientService } from './../../services/domain/client.service';
import { CityDTO } from './../../models/city.dto';
import { StateService } from './../../services/domain/state.service';
import { CityService } from './../../services/domain/city.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states: CityDTO[];
  cities: CityDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cityService: CityService,
    public stateService: StateService,
    public clientService: ClientService,
    public alertController: AlertController){

      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        type: ['', [Validators.required]],
        cpfCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        password: ['', [Validators.required]],
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        neighborhood: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
        phonenumber1: ['', [Validators.required]],
        phonenumber2: ['', []],
        phonenumber3: ['', []],
        stateId: [null, [Validators.required]],
        cityId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad(){
   this.stateService.findAll()
    .subscribe(response => {
      this.states = response;
      this.formGroup.controls.stateId.setValue(this.states[0].id);
      this.updateCities();
    },
    error => {});
  }

  updateCities() {
    let stateId = this.formGroup.value.stateId;
    this.cityService.findAll(stateId)
      .subscribe(response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      },
      error => {});
  }

  signupUser() {
    console.log(this.formGroup.value);
    this.clientService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertController.create({
      title: 'Success',
      message: 'Registration successfully',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
