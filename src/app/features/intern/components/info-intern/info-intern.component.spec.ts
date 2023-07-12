import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInternComponent } from './info-intern.component';

describe('InfoInternComponent', () => {
  let component: InfoInternComponent;
  let fixture: ComponentFixture<InfoInternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoInternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
