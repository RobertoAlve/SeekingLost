import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLostPeopleComponent } from './register-lost-people.component';

describe('RegisterLostPeopleComponent', () => {
  let component: RegisterLostPeopleComponent;
  let fixture: ComponentFixture<RegisterLostPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterLostPeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterLostPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
