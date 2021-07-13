import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { User } from '@core/services/user/user.model';

import allUsers from '@core/mocks/all-users.json';

import { ConfigService } from '@core/services/config/config.service';
import { UserService } from '@core/services/user/user.service';

describe('UserService', () : void => {
  let userService : UserService;
  let httpMock : HttpTestingController;

  let allUsersRequest : TestRequest;

  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [UserService]
    });
  }));

  beforeEach(() : void => {
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

    expect(userService['_allUsers$'].value).toEqual([] as User[]);
    expect(userService['_currentUser$'].value).toEqual({} as User);
    expect(userService['_userLoggedIn$'].value).toBeFalse();

    allUsersRequest = httpMock.expectOne(ConfigService.internalAppConfiguration.apiServer.paths.allUsers);
    expect(allUsersRequest.request.urlWithParams).toEqual(ConfigService.internalAppConfiguration.apiServer.paths.allUsers);
    expect(allUsersRequest.request.method).toEqual('GET');
    expect(allUsersRequest.request.body).toBeFalsy();
  });

  afterEach(() : void => {
    httpMock.verify();
  });

  it('should be created', () : void => {
    expect(userService).toBeTruthy();

    allUsersRequest.flush(allUsers);
    expect(userService['_allUsers$'].value).toEqual(allUsers);
  });

  describe('function getAllUsers()', () : void => {
    it('should return a User[]-typed Observable stream of all users in the application', () : void => {
      userService.getAllUsers().subscribe({
        next(allUsersValue : User[]) : void { expect(userService['_allUsers$'].value).toEqual(allUsersValue); }
      });

      userService['_allUsers$'].next(allUsers);
      userService['_allUsers$'].next([]);
    });
  });

  describe('function getCurrentUser()', () : void => {
    it('should return a User-typed Observable stream of the currently-logged-in user', () : void => {
      userService.getCurrentUser().subscribe({
        next(currentUserValue : User) : void { expect(userService['_currentUser$'].value).toEqual(currentUserValue); }
      });

      userService['_currentUser$'].next(allUsers[0]);
      userService['_currentUser$'].next({} as User);
    });
  });

  describe('function getUserLoggedIn()', () : void => {
    it('should return a boolean-typed Observable stream of the logged-in status of the application', () : void => {
      userService.getUserLoggedIn().subscribe({
        next(userLoggedInValue : boolean) : void { expect(userService['_userLoggedIn$'].value).toEqual(userLoggedInValue); }
      });

      userService['_userLoggedIn$'].next(true);
      userService['_userLoggedIn$'].next(false);
    });
  });

  describe('function login()', () : void => {
    it('should log a provided user into the application', () : void => {
      const NEW_USER : User = allUsers[0];

      expect(userService['_currentUser$'].value).toEqual({} as User);
      expect(userService['_userLoggedIn$'].value).toBeFalse();

      userService.login(NEW_USER);
      expect(userService['_currentUser$'].value).toEqual(NEW_USER);
      expect(userService['_userLoggedIn$'].value).toBeTrue();
    });
  });
});
