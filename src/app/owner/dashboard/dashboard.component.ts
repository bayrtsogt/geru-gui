import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {ApiService} from "../../Services/ApiService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  restaurants: any[] = [];
  qrDialogVisible: any = false;
  addRestaurantVisible: any = false;
  selectedRestaurant: any = null;
  qrTableNumber: number | null = null;
  qrImageSrc: any | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadRestaurants();

  }

  loadRestaurants() {
    const userId = localStorage.getItem('userId')!;
    this.apiService.getRestaurants(userId).subscribe((data: any) => {
      this.restaurants = data;
    });
  }

  openQrDialog(rest: any) {
    this.selectedRestaurant = rest;
    this.qrTableNumber = null;
    this.qrImageSrc    = null;
    this.qrDialogVisible = true;
  }

  generateQr() {
    if (this.qrTableNumber == null) { return; }

    this.apiService.getQr(this.selectedRestaurant.id, this.qrTableNumber)
        .subscribe({
          next: (base64: string) => {
            this.qrImageSrc = base64.trim();
          },
          error: err => console.error('QR fetch failed:', err)
        });
  }


  /** After creating a new restaurant */
  done() {
    this.addRestaurantVisible = false;
    // window.location.reload();
  }

  delete(restaurant: any) {
    this.apiService.deleteRestaurant(restaurant.id).subscribe(() =>{
        window.location.reload();
      });
  }
}
