import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteBuscaNomeComponent } from './cliente-busca-nome.component';

describe('ClienteBuscaNomeComponent', () => {
  let component: ClienteBuscaNomeComponent;
  let fixture: ComponentFixture<ClienteBuscaNomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteBuscaNomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteBuscaNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
