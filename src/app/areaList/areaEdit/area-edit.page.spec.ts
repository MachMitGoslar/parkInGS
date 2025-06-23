import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaEditPage } from './area-edit.page';

describe('AreaEditPage', () => {
  let component: AreaEditPage;
  let fixture: ComponentFixture<AreaEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
