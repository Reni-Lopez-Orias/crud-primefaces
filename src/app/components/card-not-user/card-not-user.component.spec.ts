import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNotUserComponent } from './card-not-user.component';

describe('CardNotUserComponent', () => {
  let component: CardNotUserComponent;
  let fixture: ComponentFixture<CardNotUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNotUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNotUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
