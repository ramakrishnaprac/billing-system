import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseItemsComponent } from './add-expense-items.component';

describe('AddExpenseItemsComponent', () => {
  let component: AddExpenseItemsComponent;
  let fixture: ComponentFixture<AddExpenseItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpenseItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
