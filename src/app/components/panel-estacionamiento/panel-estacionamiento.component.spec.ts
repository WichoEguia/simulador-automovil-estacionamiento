import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEstacionamientoComponent } from './panel-estacionamiento.component';

describe('PanelEstacionamientoComponent', () => {
  let component: PanelEstacionamientoComponent;
  let fixture: ComponentFixture<PanelEstacionamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelEstacionamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEstacionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
