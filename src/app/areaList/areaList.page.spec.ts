import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaListPage} from './areaList.page';

describe('AreaListPage', () => {
  let component: AreaListPage;
  let fixture: ComponentFixture<AreaListPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AreaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
