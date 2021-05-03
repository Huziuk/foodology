import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisibleburger = false;
  loginPath: string;
  loginName: string;
  emptyBasket: boolean;
  

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.checkLogin()
    this.getLocalUser()
  }

  checkLogin(): void {
    this.authService.loginStatus$.subscribe(() => {
      this.getLocalUser()
    }
    )
  }

  getLocalUser(): void {
    if (localStorage.getItem('user')) {
      this.loginName = 'Profile'
      this.loginPath = 'profile'
    } else {
      this.loginName = 'Sing In'
      this.loginPath = 'login'
    }
  }

  toggleBurger(): void {
    this.isVisibleburger = !this.isVisibleburger
    if (this.isVisibleburger){
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('body').style.overflow = 'auto'
    }
  }

}
