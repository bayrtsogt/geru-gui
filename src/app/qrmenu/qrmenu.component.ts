import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MessageService} from "primeng/api";
import {ApiService} from "../Services/ApiService";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;         // raw base64
  type: 'Eats' | 'Drink';
  alcoholPercent: number;
  isSharefood: 0 | 1;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-qrmenu',
  templateUrl: './qrmenu.component.html',
  styleUrls: ['./qrmenu.component.css']
})
export class QrmenuComponent implements OnInit {
  restaurantId!: number;
  tableNumber!: number;

  // view state
  screen:
      'Drinks' |
      'alcohol' |
      'foods' |
      'cart' | undefined;

  // raw & buckets
  products: Product[] = [];
  eats: Product[]       = [];
  softDrinks: Product[] = [];
  alcohols: Product[]   = [];
  foods: Product[]      = [];
  shareFoods: Product[] = [];

  // cart
  cart: CartItem[] = [];
  ownerId: any;
  invoiceId: any;
  click: any = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('restaurantId')!;
      this.tableNumber  = +params.get('tableNumber')!;
      this.loadRestaurant();
    });
    this.go('Drinks');
  }

  private loadRestaurant() {
    this.apiService.getRestaurantById(this.restaurantId).subscribe(r => {
          this.ownerId = r;
          this.loadProducts();
        });
  }
  private loadProducts() {
    this.apiService.getProducts(this.ownerId).subscribe((all: any) => {
        this.products = all;
        this.eats       = all.filter((p: any) => p.type === 'Eats');
        this.shareFoods = this.eats.filter((p: any) => p.isSharefood === 1);
        this.foods      = this.eats.filter((p: any) => p.isSharefood === 0);
        this.softDrinks = all.filter((p: any) => p.type === 'Drink' && p.alcoholPercent === 0);
        this.alcohols   = all.filter((p: any) => p.type === 'Drink' && p.alcoholPercent > 0);
      });
  }

  go(screen: QrmenuComponent['screen']) {
    this.screen = screen;
  }

  getCurrentList(): Product[] {
    switch (this.screen) {
      case 'Drinks':       return this.softDrinks;
      case 'alcohol':   return this.alcohols;
      case 'foods':     return this.foods;
      default:          return [];
    }
  }

  // ----- CART LOGIC -----
  addToCart(p: Product) {
    const item = this.cart.find(i => i.product.id === p.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ product: p, quantity: 1 });
    }
  }

  increaseQty(item: CartItem) {
    item.quantity++;
  }
  decreaseQty(item: CartItem) {
    if (item.quantity > 1) item.quantity--;
  }
  removeFromCart(item: CartItem) {
    this.cart = this.cart.filter(i => i !== item);
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  openCart() {
    this.screen = 'cart';
  }
  checkout() {
    this.click ++;
    // TODO: integrate your payment flow here
    console.log('Proceeding to payment with total', this.getCartTotal());
    // e.g. this.router.navigate(['/payment'], { state: { cart: this.cart } });
    const list: { restaurantId: number; tableId: number; productId: number; count: number; }[] = [];
    this.cart.forEach( item => {
      let order = {
        "restaurantId": this.restaurantId,
        "tableId": this.tableNumber,
        "productId": item.product.id,
        "count": item.quantity
      }
      list.push(order);
    })

    this.apiService.createInvoice(JSON.stringify(list)).subscribe((result: any) => {
      console.log(result);
      let url = result.data.url;
      this.invoiceId = result.data.id;
      window.open(url);
    });
  }

  checkInvoice() {
    this.apiService.checkInvoice(this.invoiceId).subscribe((result: any) => {
      if(result.status == 200){
        this.messageService.add({ severity:'success', summary:'Амжилттай', detail:'Төлбөр амжилттай төлөгдлөө' });
      }
      else {
        this.messageService.add({ severity:'warn', summary:'Амжилтгүй', detail:'Төлбөр төлөгдөөгүй байна.' });
      }
    });
  }
}
