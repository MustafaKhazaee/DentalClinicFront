import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitBoardComponent } from './visit-board.component';

describe('VisitBoardComponent', () => {
  let component: VisitBoardComponent;
  let fixture: ComponentFixture<VisitBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
