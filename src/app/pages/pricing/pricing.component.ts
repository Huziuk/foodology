import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IBundle } from 'src/app/shared/interfaces/bundle.interface';
import { BundleService } from 'src/app/shared/services/bundle/bundle.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  bundles: Array<any> = [];

  constructor(
    private bundleService: BundleService
  ) { }

  ngOnInit(): void {
    this.getBundles()
  }

  getBundles(): void {
    this.bundleService.firebaseBundle().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() as object })
        )
      )
    ).subscribe(data => {
      this.bundles = data;
    });
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
