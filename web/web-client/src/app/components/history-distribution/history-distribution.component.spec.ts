import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDistributionComponent } from './history-distribution.component';

describe('HistoryDistributionComponent', () => {
  let component: HistoryDistributionComponent;
  let fixture: ComponentFixture<HistoryDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
