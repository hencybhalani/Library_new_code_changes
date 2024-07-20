import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBookModalComponent } from './e-book-modal.component';

describe('EBookModalComponent', () => {
  let component: EBookModalComponent;
  let fixture: ComponentFixture<EBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EBookModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
