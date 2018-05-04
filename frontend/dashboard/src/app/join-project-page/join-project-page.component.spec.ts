import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinProjectPageComponent } from './join-project-page.component';

describe('JoinProjectPageComponent', () => {
  let component: JoinProjectPageComponent;
  let fixture: ComponentFixture<JoinProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
