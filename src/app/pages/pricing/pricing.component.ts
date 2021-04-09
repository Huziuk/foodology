import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleQuestion(count: number): void{
    let elem = document.querySelector(`.question-item:nth-child(${count})`) as HTMLDivElement
    if (elem.style.height == 'auto'){
      elem.style.height = '98px'
    } else {
      elem.style.height = 'auto'
    }
  }

}
