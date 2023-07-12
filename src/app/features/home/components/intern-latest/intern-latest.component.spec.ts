import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternLatestComponent } from './intern-latest.component';

describe('InternLatestComponent', () => {
  let component: InternLatestComponent;
  let fixture: ComponentFixture<InternLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternLatestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
