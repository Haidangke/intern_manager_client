import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorInfoComponent } from './mentor-info.component';

describe('MentorInfoComponent', () => {
  let component: MentorInfoComponent;
  let fixture: ComponentFixture<MentorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
