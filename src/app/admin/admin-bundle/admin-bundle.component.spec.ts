import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBundleComponent } from './admin-bundle.component';

describe('AdminBundleComponent', () => {
  let component: AdminBundleComponent;
  let fixture: ComponentFixture<AdminBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBundleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
