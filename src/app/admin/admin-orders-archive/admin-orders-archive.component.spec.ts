import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersArchiveComponent } from './admin-orders-archive.component';

describe('AdminOrdersArchiveComponent', () => {
  let component: AdminOrdersArchiveComponent;
  let fixture: ComponentFixture<AdminOrdersArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdersArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
