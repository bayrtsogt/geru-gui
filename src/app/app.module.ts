import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AboutComponent} from "./about/about.component";
import {TopbarComponent} from "./layout/topbar/topbar.component";
import {LoadingComponent} from "./loadingComponent/loading.component";
import {LoginComponent} from "./login/login.component";
import {AddVehicleComponent} from "./owner/addVehicle/addVehicle.component";
import {DashboardComponent} from "./owner/dashboard/dashboard.component";
import {PhotoUploadComponent} from "./photo-upload/photo-upload.component";
import {RegisterComponent} from "./register/register.component";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ChipsModule} from "primeng/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DockModule} from "primeng/dock";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {AppRoutingModule} from "./app-routing.module";
import {LoadingInterceptor} from "./loading.interceptor";
import {SpeedDialModule} from "primeng/speeddial";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MenuModule} from "primeng/menu";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TenantDashboardComponent} from "./tenant/dashboard/tenant-dashboard.component";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {GalleriaModule} from "primeng/galleria";
import {CheckboxModule} from "primeng/checkbox";
import {ProductDashboardComponent} from "./product/dashboard/product-dashboard.component";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {MultiSelectModule} from "primeng/multiselect";
import {ChipModule} from "primeng/chip";
import {QrmenuComponent} from "./qrmenu/qrmenu.component";
import {SidebarModule} from "primeng/sidebar";
import {TabMenuModule} from "primeng/tabmenu";
import { KitchenComponent } from './kitchen/kitchen.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TopbarComponent,
    LoadingComponent,
    LoginComponent,
    AddVehicleComponent,
    DashboardComponent,
    PhotoUploadComponent,
    RegisterComponent,
    TenantDashboardComponent,
    ProductDashboardComponent,
    QrmenuComponent,
    KitchenComponent,
    BarComponent
  ],
  imports: [
    BrowserModule,  // Only in the root module
    HttpClientModule,
    RouterModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ChipsModule,
    FormsModule,
    BrowserAnimationsModule,
    DockModule,
    DialogModule,
    ReactiveFormsModule,
    ToastModule,
    ProgressSpinnerModule,
    InputTextModule,
    SharedModule,
    AppRoutingModule,
    SpeedDialModule,
    ToggleButtonModule,
    MenuModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    ScrollPanelModule,
    CarouselModule,
    TagModule,
    GalleriaModule,
    CheckboxModule,
    PaginatorModule,
    ToolbarModule,
    MultiSelectModule,
    ChipModule,
    SidebarModule,
    TabMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
