import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavegacioComponent } from './barra-navegacio.component';

describe('BarraNavegacioComponent', () => {
  let component: BarraNavegacioComponent;
  let fixture: ComponentFixture<BarraNavegacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraNavegacioComponent]
    });
    fixture = TestBed.createComponent(BarraNavegacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
