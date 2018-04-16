import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInterrogationComponent } from './delete-interrogation.component';

describe('DeleteInterrogationComponent', () => {
  let component: DeleteInterrogationComponent;
  let fixture: ComponentFixture<DeleteInterrogationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteInterrogationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInterrogationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
