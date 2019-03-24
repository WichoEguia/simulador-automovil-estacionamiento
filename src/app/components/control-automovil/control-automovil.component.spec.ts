import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAutomovilComponent } from './control-automovil.component';

describe('ControlAutomovilComponent', () => {
  let component: ControlAutomovilComponent;
  let fixture: ComponentFixture<ControlAutomovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAutomovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
