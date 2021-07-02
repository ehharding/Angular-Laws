import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';

import { AppRoutingModule } from 'app/app-routing.module';

import { UserService } from '@core/services/user/user.service';

import { AppComponent } from 'app/app.component';

describe('AppComponent', () : void => {
  let appComponent : AppComponent;
  let fixture : ComponentFixture<AppComponent>;

  const MOCK_USER_SERVICE : any = jasmine.createSpyObj('UserService', ['getAllUsers']);

  // Asynchronous beforeEach()
  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [AppComponent],
      imports : [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule],
      providers : [{ provide : UserService, useValue : MOCK_USER_SERVICE }]
    }).compileComponents(); // Compile Template And CSS
  }));

  // Synchronous beforeEach()
  beforeEach(() : void => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  });

  it('should be created', () : void => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
