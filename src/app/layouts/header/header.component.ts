import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisibleburger = false;

  constructor() { }

  ngOnInit(): void {
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