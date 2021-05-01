import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AboutComponent } from './pages/about/about.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminBundleComponent } from './admin/admin-bundle/admin-bundle.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { ProfileGuard } from './shared/guards/profile/profile.guard';
import { LoginGuard } from './shared/guards/login/login.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'order', component: OrdersComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'product' },
      { path: 'product', component: AdminProductComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'bundle', component: AdminBundleComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
