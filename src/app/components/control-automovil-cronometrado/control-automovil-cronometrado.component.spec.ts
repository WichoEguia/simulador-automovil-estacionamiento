import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAutomovilCronometradoComponent } from './control-automovil-cronometrado.component';

describe('ControlAutomovilCronometradoComponent', () => {
  let component: ControlAutomovilCronometradoComponent;
  let fixture: ComponentFixture<ControlAutomovilCronometradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAutomovilCronometradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAutomovilCronometradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
