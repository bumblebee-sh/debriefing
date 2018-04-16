import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQuizzesComponent } from './profile-quizzes.component';

describe('ProfileQuizzesComponent', () => {
  let component: ProfileQuizzesComponent;
  let fixture: ComponentFixture<ProfileQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
