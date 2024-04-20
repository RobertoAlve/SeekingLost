import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterPeopleComponent } from './form-register-people.component';

describe('FormRegisterPeopleComponent', () => {
  let component: FormRegisterPeopleComponent;
  let fixture: ComponentFixture<FormRegisterPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRegisterPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRegisterPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
