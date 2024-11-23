import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MISUPDATEComponent } from './misupdate.component';

describe('MISUPDATEComponent', () => {
  let component: MISUPDATEComponent;
  let fixture: ComponentFixture<MISUPDATEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MISUPDATEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MISUPDATEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
