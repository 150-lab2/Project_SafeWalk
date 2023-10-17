import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginexamplePage } from './loginexample.page';

describe('LoginexamplePage', () => {
  let component: LoginexamplePage;
  let fixture: ComponentFixture<LoginexamplePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginexamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
