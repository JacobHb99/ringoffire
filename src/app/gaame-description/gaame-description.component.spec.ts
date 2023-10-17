import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaameDescriptionComponent } from './gaame-description.component';

describe('GaameDescriptionComponent', () => {
  let component: GaameDescriptionComponent;
  let fixture: ComponentFixture<GaameDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaameDescriptionComponent]
    });
    fixture = TestBed.createComponent(GaameDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
