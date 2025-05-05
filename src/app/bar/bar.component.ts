import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../Services/ApiService";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent implements OnInit {
  restaurantId!: number;
  isOrder: any = true;
  orders: any;
  products: any;

  constructor(
      private route: ActivatedRoute,
      private apiService: ApiService,
      private messageService: MessageService,
      private titleService: Title
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('restaurantId')!;
      this.apiService.getRestaurantInfoById(this.restaurantId).subscribe(
          (result: any) => {
            console.log("result ====" , result);
            this.titleService.setTitle(result['name'] + ' - Баар');
          }
      );
      this.getData();
      this.getProducts();
    });
  }

  getData(){
    this.apiService.barOrders(this.restaurantId).subscribe( (result: any) => {
      this.orders = result;
    })
  }
  private getProducts() {
    this.apiService.getProductsByType(localStorage.getItem('userId'), 'Drink').subscribe( (result: any) => {
      this.products = result;
    })
  }
  active(product: any) {
    this.apiService.activeProduct(product.id).subscribe((result: any) => {
      console.log("done");
      this.getProducts();
    })
  }
  done(id: any) {
    this.apiService.doneOrder(id).subscribe((result: any) => {
      console.log("done");
      this.getData();
    })
  }

}
