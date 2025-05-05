// addVehicle.component.ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {ApiService} from "../../Services/ApiService";

@Component({
    selector: 'app-addVehicle',
    templateUrl: './addVehicle.component.html',
    styleUrls: ['./addVehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Output() donenew = new EventEmitter<any>();
  restaurant = {
    name: '',
    tableCount: '',
    phone: '',
    location: '',
    profileImage: null,
    coverImage: null,
    profilePreview: '',
    coverPreview: ''
  };


  displayImageDialog = false;


  constructor(
    private http: HttpClient,
    public messageService: MessageService,
    private apiService: ApiService
  ) {}

    ngOnInit() {
    }
  side: 'profile' | 'cover' = 'cover';

  openDialog(type: 'profile' | 'cover') {
    this.side = type;
    this.displayImageDialog = true;
  }

  onImageUploaded(image: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (this.side === 'profile') {
        // @ts-ignore
        this.restaurant.profileImage = image;
        this.restaurant.profilePreview = reader.result as string;
      } else {
        // @ts-ignore
        this.restaurant.coverImage = image;
        this.restaurant.coverPreview = reader.result as string;
      }
    };
    reader.readAsDataURL(image);
    this.displayImageDialog = false;
  }

  closeImageDialog() {
    this.displayImageDialog = false;
  }
  submitRestaurant() {
    if (
      !this.restaurant.name ||
      !this.restaurant.tableCount ||
      !this.restaurant.phone ||
      !this.restaurant.location ||
      !this.restaurant.coverImage ||
      !this.restaurant.profileImage
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Бүртгэл дутуу байна',
        detail: 'Бүх талбарыг зөв бөглөж, хоёр зургийг хоёуланг нь оруулна уу.'
      });
      return;
    }
    const formData = new FormData();
    formData.append('name', this.restaurant.name);
    formData.append('tableCount', this.restaurant.tableCount);
    formData.append('phone', this.restaurant.phone);
    formData.append('location', this.restaurant.location);
    formData.append('ownerId', localStorage.getItem('userId') || "");
    formData.append('coverImage', this.restaurant.coverImage);
    formData.append('profileImage', this.restaurant.profileImage);

    this.apiService.createRestaurant(formData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Амжилттай',
          detail: 'Рестораны бүртгэл амжилттай хийгдлээ.'
        });

        // Reset form
        this.restaurant = {
          name: '',
          tableCount: '',
          phone: '',
          location: '',
          profileImage: null,
          coverImage: null,
          profilePreview: '',
          coverPreview: ''
        };
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Амжилтгүй',
          detail: 'Сервертэй холбогдоход алдаа гарлаа.'
        });
        console.error('Restaurant submission error:', error);
      }
    });
    this.donenew.emit();
  }


}
