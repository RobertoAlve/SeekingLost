import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDefaultImageComponent } from './card-default-image.component';

describe('CardDefaultImageComponent', () => {
  let component: CardDefaultImageComponent;
  let fixture: ComponentFixture<CardDefaultImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardDefaultImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDefaultImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
