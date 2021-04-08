import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenustodayComponent } from './menustoday.component';

describe('MenustodayComponent', () => {
  let component: MenustodayComponent;
  let fixture: ComponentFixture<MenustodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenustodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenustodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
