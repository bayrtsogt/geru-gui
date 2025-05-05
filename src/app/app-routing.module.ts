import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./owner/dashboard/dashboard.component";
import {ProductDashboardComponent} from "./product/dashboard/product-dashboard.component";
import {QrmenuComponent} from "./qrmenu/qrmenu.component";
import {KitchenComponent} from "./kitchen/kitchen.component";
import {BarComponent} from "./bar/bar.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'restaurant',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'product',
    children: [
      { path: 'dashboard', component: ProductDashboardComponent
        , canActivate: [AuthGuard]},
    ]
    , canActivate: [AuthGuard]
  },
  {
    path: ':restaurantId/kitchen',
    component: KitchenComponent,
    data: { layout: 'full' }
  },
  {
    path: ':restaurantId/bar',
    component: BarComponent,
    data: { layout: 'full' }
      , canActivate: [AuthGuard]
  },
  {
    path: ':restaurantId/:tableNumber',
    component: QrmenuComponent,
    data: { layout: 'full' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
