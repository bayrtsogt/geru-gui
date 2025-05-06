import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiBase = `${environment.apiHost}`;

  constructor(private http: HttpClient) {}

  /** GET хүсэлт */
  get<T>(
      path: string,
      params?: Record<string, string | number | boolean>,
      headers?: Record<string, string>
  ): Observable<T> {
    const httpParams = new HttpParams({fromObject: params as any});
    const httpHeaders = new HttpHeaders(headers || {});
    return this.http.get<T>(`${this.apiBase}/${path}`, {
      params: httpParams,
      headers: httpHeaders
    });
  }

  /** POST хүсэлт */
  post<T>(path: string, body: any,): Observable<T> {
    return this.http.post<any>(`${this.apiBase}/${path}`,body);
  }

  /** Нэвтрэх хүсэлт */
  login(username: string, password: string): Observable<any> {
    return this.get(`user/login?username=${username}&password=${password}`);
  }

  /** Шинэ хэрэглэгч үүсгэх хүсэлт */
  createUser(body: any): Observable<any> {
    return this.post('user/createUser', body);
  }

  /** Нууц үг сэргээх хүсэлт */
  getPassword(mailAddress: any) {
    return this.get(`user/getPassword?mail=${mailAddress}`);
  }

  /** Ресторан үүсгэх хүсэлт */
  createRestaurant(formData: any) {
    return this.post(`restaurant/create`,formData);
  }

  /** Бүртгэлтэй ресторануудын жагсаалт авах хүсэлт */
  getRestaurants(userId: string) {
    return this.get(`restaurant/owner/${userId}`);
  }

  /** Рестораны код, Ширээний дугаараар QR цэс үүсгэх хүсэлт */
  getQr(id: number, table: number): Observable<string> {
    return this.http.get(`${this.apiBase}/api/qrcode/${id}/${table}`, { responseType: 'text' });
  }

  /** Ресторан хасах хүсэлт */
  deleteRestaurant(id: number) {
    return this.get(`restaurant/delete/${id}`);
  }

  /** Бүтээгдэхүүн бүртгэх хүсэлт */
  createProduct(fd: any) {
    return this.post('api/product/create', fd);
  }

  /** Бүртгэлтэй бүтээгдэхүүний жагсаалт авах хүсэлт */
  getProducts(userId: string) {
    return this.get(`api/product/fromUser/${userId}`);
  }

  /** Рестораны дугаараар рестораны эзэмшигчийн мэдээлэл авах хүсэлт */
  getRestaurantById(restaurantId: number) {
    return this.get(`restaurant/${restaurantId}`);
  }

  /** Рестораны дугаараар рестораны мэдээлэл авах хүсэлт */
  getRestaurantInfoById(restaurantId: number) {
    return this.get(`restaurant/info/${restaurantId}`);
  }

  /** Төлбөрийн нэхэмжлэх үүсгэх хүсэлт */
  createInvoice(body: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${this.apiBase}/rest/createInvoice`,
      body,
      { headers }
    );
  }

  /** Төлбөрийн нэхэмжлэх төлөгдсөн эсэхийг шалгах хүсэлт */
  checkInvoice(invoiceId: any) {
    return this.get(`rest/getInvoiceById?invoiceId=${invoiceId}`);
  }

  /** Хэрэглэгчийн мэдээлэл авах хүсэлт */
  getUserInfo(userId: any) {
    return this.get(`user/getByUserId?userId=${userId}`);
  }

  /** Бүтээгдэхүүн хасах хүсэлт */
  deleteProduct(id: any) {
    return this.get(`api/product/delete/${id}`);
  }

  /** Бүтээгдэхүүн идэвхигүй болгох хүсэлт */
  activeProduct(id: any) {
    return this.get(`api/product/active/${id}`);
  }

  /** Барны захиалгуудын мэдээлэл авах хүсэлт */
  barOrders(id: any) {
    return this.get(`api/orders/bar/${id}`);
  }

  /** Гал тогооны захиалгуудын мэдээлэл авах хүсэлт */
  kitchenOrders(id: any) {
    return this.get(`api/orders/kitchen/${id}`);
  }

  /** Бүтээгдэхүүнүүдийг төрлөөр нь ялган авах хүсэлт */
  getProductsByType(id: any, type: any) {
    return this.get(`api/product/${type}/${id}`);
  }


  /** Захиалга хүргэгдсэн төлөвт шилжүүлэх хүсэлт */
  doneOrder(id: any) {
    return this.get(`api/orders/done/${id}`);
  }
}

