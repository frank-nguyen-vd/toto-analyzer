import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotosComponent } from './totos.component';

describe('TotosComponent', () => {
  let component: TotosComponent;
  let fixture: ComponentFixture<TotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
