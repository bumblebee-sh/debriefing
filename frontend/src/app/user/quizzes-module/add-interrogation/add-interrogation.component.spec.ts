import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterrogationComponent } from './add-interrogation.component';

describe('AddInterrogationComponent', () => {
  let component: AddInterrogationComponent;
  let fixture: ComponentFixture<AddInterrogationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterrogationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterrogationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
