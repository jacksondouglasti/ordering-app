import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseDTO } from '../../models/purchase.dto';

@Injectable()
export class PurchaseService {

    constructor(public http: HttpClient) {

    }

    insert(obj: PurchaseDTO) {
        return this.http.post(
          `${API_CONFIG.baseUrl}/purchases`,
          obj,
          {
              observe: 'response',
              responseType: 'text'
          }
        );
    }
}