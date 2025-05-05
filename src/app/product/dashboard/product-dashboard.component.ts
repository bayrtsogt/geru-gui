import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../Services/ApiService";

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css'],
  providers: [MessageService]
})
export class ProductDashboardComponent implements OnInit {
  // addProduct dialog
  addProductVisible = false;
  displayImageDialog = false;

  private selectedFile: File | null = null;
  eats: any[] | undefined;
  softDrinks: any[] | undefined;
  alcohols: any[] | undefined;

  constructor(private http: HttpClient,
              private apiService: ApiService,
              private messageService: MessageService) {}
  product = {
    name: '',
    price: '',
    isSharefood: false,
    image: '',
    type: 'Eats' as 'Eats' | 'Drink',
    alcoholPercent: 0
  };

  products: any[] = [];

  // dropdown options
  productTypes = [
    { label: 'Хоол',   value: 'Eats'  },
    { label: 'Уух',    value: 'Drink' }
  ];
  ngOnInit() {
    this.getData();
  }

  openAddDialog() {
    this.product = { name:'', price:'', isSharefood:false, image:'', type:'Eats', alcoholPercent:0 };
    this.addProductVisible = true;
  }

  onImageUploaded(image: File) {
    this.selectedFile = image;
    const reader = new FileReader();
    reader.onload = () => {
      this.product.image = reader.result as string;  // preview
    };
    reader.readAsDataURL(image);
    this.displayImageDialog = false;
  }

  closeImageDialog() {
    this.displayImageDialog = false;
  }
  createProduct() {
    if (!this.product.name || !this.product.price || !this.selectedFile || !this.product.type) {
      this.messageService.add({ severity:'error', summary:'Алдаа', detail:'Бүх талбарыг бөглөнө үү' });
      return;
    }

    const fd = new FormData();
    fd.append('name', this.product.name);
    fd.append('ownerId', localStorage.getItem('userId')!);
    fd.append('price', this.product.price.toString());
    fd.append('isSharefood', this.product.isSharefood ? '1' : '0');
    fd.append('type', this.product.type);
    if (this.product.type === 'Drink') {
      fd.append('alcoholPercent', this.product.alcoholPercent.toString());
    }
    fd.append('img', this.selectedFile, this.selectedFile.name);


    this.apiService.createProduct(fd).subscribe(res => {
        this.messageService.add({ severity:'success', summary:'Амжилт', detail:'Бүртгэгдлээ' });
        this.addProductVisible = false;
        this.getData();
      });
  }

  getData() {
    const userId = localStorage.getItem('userId');
    if (userId) {
       // Encrypt user ID

      this.apiService.getProducts(userId).subscribe(
        (result: any) => {
          this.products = result;
          this.eats        = this.products.filter(p => p.type === 'Eats');
          this.softDrinks  = this.products.filter(p => p.type === 'Drink' && p.alcoholPercent === 0);
          this.alcohols    = this.products.filter(p => p.type === 'Drink' && p.alcoholPercent > 0);
        }
      );
    }

  }

    delete(product: any) {
      this.apiService.deleteProduct(product.id).subscribe(() =>{
        window.location.reload();
      });
    }
}
