import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsumersComponent } from './list-consumers.component';

describe('ListConsumersComponent', () => {
  let component: ListConsumersComponent;
  let fixture: ComponentFixture<ListConsumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
