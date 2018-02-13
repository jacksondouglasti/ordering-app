import { API_CONFIG } from './../../config/api.config';
import { CategoryDTO } from './../../models/category.dto';
import { CategoryService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoryDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoryService: CategoryService) {
  }

  ionViewDidLoad() {
    this.categoryService.findAll()
      .subscribe(response => {
        this.items = response;
      },
    error => {});
  }

}
