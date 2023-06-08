import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeCodeInputComponent } from './one-time-code-input.component';

describe('OneTimeCodeInputComponent', () => {
  let component: OneTimeCodeInputComponent;
  let fixture: ComponentFixture<OneTimeCodeInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneTimeCodeInputComponent]
    });
    fixture = TestBed.createComponent(OneTimeCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
