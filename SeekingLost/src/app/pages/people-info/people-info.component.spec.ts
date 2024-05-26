import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleInfoComponent } from './people-info.component';

describe('PeopleInfoComponent', () => {
  let component: PeopleInfoComponent;
  let fixture: ComponentFixture<PeopleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
