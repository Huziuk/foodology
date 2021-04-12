import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AboutComponent } from './pages/about/about.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { LoginComponent } from './pages/login/login.component';
import { SubscribeComponent } from './layouts/subscribe/subscribe.component';
import { FeedbackComponent } from './layouts/feedback/feedback.component';
import { MenustodayComponent } from './layouts/menustoday/menustoday.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    HomeComponent,
    PricingComponent,
    AboutComponent,
    FoodsComponent,
    LoginComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    SubscribeComponent,
    FeedbackComponent,
    MenustodayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
