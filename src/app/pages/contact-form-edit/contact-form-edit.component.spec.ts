import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormEditComponent } from './contact-form-edit.component';

describe('ContactFormEditComponent', () => {
  let component: ContactFormEditComponent;
  let fixture: ComponentFixture<ContactFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
