import { API_CONFIG } from './../../config/api.config';
import { ProductDTO } from './../../models/product.dto';
import { ProductService } from './../../services/domain/product.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, InfiniteScroll } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[] = [];
  page: number = 0;
  loader: Loading;
  infiniteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loader = this.presentLoading();
    this.loadData();
  }

  loadData() {
    let categoryId = this.navParams.get('categoryId');
    

    this.productService.findByCategories(categoryId, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        
        this.loader.dismiss();
        this.completeInfinite();
        
        this.loadImageUrls(start, this.items.length - 1);
      },
        error => {
          this.loader.dismiss();
        });
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i <= end; i++) {
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  showDetail(productId: string) {
    this.navCtrl.push('ProductDetailPage', { productId: productId });
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: "Loading"
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.page++;

    this.loadData();
  }

  completeInfinite() {
    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  }
}
