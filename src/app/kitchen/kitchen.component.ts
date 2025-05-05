import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../Services/ApiService";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('restaurantId')!;
      this.apiService.getRestaurantInfoById(this.restaurantId).subscribe(
          (result: any) => {
            console.log("result ====" , result);
            this.titleService.setTitle(result['name'] + ' -   Гал тогоо');
          }
      );
      this.getData();
      this.getProducts();
    });
  }

  getData(){
    this.apiService.kitchenOrders(this.restaurantId).subscribe( (result: any) => {
      this.orders = result;
    })
  }

  private getProducts() {
    this.apiService.getProductsByType(localStorage.getItem('userId'), 'Eats').subscribe( (result: any) => {
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
