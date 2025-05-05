import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import {ApiService} from "../../Services/ApiService";

interface MenuDto {
  id: number;
  name: string;
  type: string;
  parentId?: number;
  activeFlag: boolean;
  children: MenuDto[];
  products: { id: number; name: string; price: number; }[];
}
interface ProductDto {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css'],
  providers: [MessageService]
})
export class TenantDashboardComponent implements OnInit {
  products: ProductDto[] = [];
  menus: MenuDto[] = [];

  // Dialog state
  menuDialogVisible = false;
  menuName = '';
  menuType = '';
  parentId?: number;
  menuActive = true;
  menuTypes = [
    { label: 'Үндсэн цэс', value: 'Main' },
    { label: 'Хоол', value: 'Eats' },
    { label: 'Уух зүйлс', value: 'Drinks' },
    { label: 'Алкохол', value: 'Alcohol' }
  ];

  assignDialogVisible = false;
  selectedMenu?: MenuDto;
  selectedProducts: number[] = [];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadMenus();
  }

  /** Load all products for the tenant */
  loadProducts() {
    const userId = localStorage.getItem('userId')!;
    this.apiService.getProducts(userId).subscribe((data: any) => (this.products = data));
  }

  /** Load full menu hierarchy */
  loadMenus() {
    const userId = localStorage.getItem('userId')!;
    // this.apiService.getMenu(userId).subscribe((data: any) => (this.menus = data));
  }

  /** --- Create Menu --- */
  openNewMenuDialog() {
    this.menuName = '';
    this.menuType = '';
    this.parentId = undefined;
    this.menuActive = true;
    this.menuDialogVisible = true;
  }

  saveMenu() {
    if (!this.menuName.trim() || !this.menuType) {
      this.messageService.add({
        severity: 'error',
        summary: 'Алдаа',
        detail: 'Нэр, төрөл хоёрыг заавал оруулна уу'
      });
      return;
    }

    const payload = {
      name: this.menuName.trim(),
      type: this.menuType,
      parentId: this.parentId,
      activeFlag: this.menuActive
    };
    // this.apiService.createMenu(payload).subscribe({
    //     next: () => {
    //       this.messageService.add({ severity:'success', summary:'Амжилт', detail:'Меню үүслээ' });
    //       this.menuDialogVisible = false;
    //       this.loadMenus();
    //     },
    //     error: () => {
    //       this.messageService.add({ severity:'error', summary:'Алдаа', detail:'Меню үүсгэхэд алдаа' });
    //     }
    //   });
  }

  onMenuDialogHide() {
    this.menuName = '';
    this.menuType = '';
    this.parentId = undefined;
  }

  /** --- Assign Products to a SubMenu --- */
  openAssignDialog(menu: MenuDto) {
    this.selectedMenu = menu;
    // Pre-select existing product IDs
    this.selectedProducts = menu.products.map(p => p.id);
    this.assignDialogVisible = true;
  }

  saveMenuProducts() {
    if (!this.selectedMenu) return;

    // this.apiService.addProductToMenu(this.selectedMenu.id, this.selectedProducts).subscribe({
    //     next: () => {
    //       this.messageService.add({ severity:'success', summary:'Амжилт', detail:'Бүтээгдэхүүнүүд холболдлоо' });
    //       this.assignDialogVisible = false;
    //       this.loadMenus();
    //     },
    //     error: () => {
    //       this.messageService.add({ severity:'error', summary:'Алдаа', detail:'Холболт амжилтгүй' });
    //     }
    //   });
  }

  onAssignDialogHide() {
    this.selectedMenu = undefined;
    this.selectedProducts = [];
  }
  /** Returns true if this product is already chosen */
  isSelected(prodId: number): boolean {
    return this.selectedProducts.includes(prodId);
  }

  /** Toggle inclusion/removal of a product ID */
  toggleProduct(prodId: number): void {
    const idx = this.selectedProducts.indexOf(prodId);
    if (idx === -1) {
      this.selectedProducts.push(prodId);
    } else {
      this.selectedProducts.splice(idx, 1);
    }
  }


}
