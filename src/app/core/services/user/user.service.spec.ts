import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DEFAULT_USERS } from '@core/interceptors/backend/backend.model';
import { HttpMethod } from '@core/services/config/config.model';
import { User } from '@core/services/user/user.model';

import { ConfigService } from '@core/services/config/config.service';
import { UserService } from '@core/services/user/user.service';

describe('service UserService', () : void => {
  let userService : UserService;

  let httpClient : HttpClient;
  let httpTestingController : HttpTestingController;

  let allUsersGetRequest : TestRequest;
  let currentUserGetRequest : TestRequest;

  const MOCK_CURRENT_USER : User = { ...DEFAULT_USERS[0], jwtToken : 'fake-jwt-token' };

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [HttpClient, UserService]
    });

    userService = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    expect(userService).toBeTruthy();

    allUsersGetRequest = httpTestingController.expectOne(ConfigService.appConfiguration.apiServer.paths.users.allUsers);
    currentUserGetRequest = httpTestingController.expectOne(ConfigService.appConfiguration.apiServer.paths.users.currentUser);

    expect(allUsersGetRequest.request.method).toBe(HttpMethod.Get);
    expect(currentUserGetRequest.request.method).toBe(HttpMethod.Get);

    expect(userService['_allUsers$'].value).toEqual([]);
    expect(userService['_currentUser$'].value).toBeNull();
  });

  afterEach(() : void => {
    httpTestingController.verify(); // Assert That There Are No Outstanding Requests After Each Test Suite
  });

  describe('Constructor Tests', () : void => {
    it('should be created with a current user', () : void => {
      currentUserGetRequest.flush(MOCK_CURRENT_USER);
      expect(userService['_currentUser$'].value).toEqual(MOCK_CURRENT_USER);
    });
  });

  describe('function getAllUsers$()', () : void => {
    it('should return an Observable User[] stream with the emitted object being the current list of all users', () : void => {
      allUsersGetRequest.flush(DEFAULT_USERS);

      userService.getAllUsers$().subscribe({
        next(allUsers : User[]) : void {
          expect(allUsers).toEqual(DEFAULT_USERS);
        }
      });
    });
  });

  describe('function getCurrentUser$()', () : void => {
    it('should return null if there is no currently authenticated user', () : void => {
      userService.getCurrentUser$().subscribe({
        next(currentUser : User | null) : void {
          expect(currentUser).toBeNull();
        }
      });
    });

    it('should return a User stream with the emitted object being the current authenticated user', () : void => {
      currentUserGetRequest.flush(MOCK_CURRENT_USER);

      userService.getCurrentUser$().subscribe({
        next(currentUser : User | null) : void {
          expect(currentUser).toEqual(MOCK_CURRENT_USER);
        }
      });
    });
  });

  describe('function login$()', () : void => {
    const MOCK_USER_CREDENTIALS : { userName : string; password : string; } = { userName : 'userName', password : 'password' };

    it('should reject the users provided credentials if they do not match what the server expects', () : void => {
      userService.login$(MOCK_USER_CREDENTIALS.userName, MOCK_USER_CREDENTIALS.password).subscribe({
        next(responseObject : User) : void {
          expect(userService['_currentUser$'].value).not.toEqual(responseObject);
        }
      });

      const LOGIN_REQUEST : TestRequest = httpTestingController.expectOne(ConfigService.appConfiguration.apiServer.paths.users.authenticate);
      expect(LOGIN_REQUEST.request.body).toEqual(MOCK_USER_CREDENTIALS);
      expect(LOGIN_REQUEST.request.method).toBe(HttpMethod.Post);
      expect(LOGIN_REQUEST.request.withCredentials).toBeTrue();

      LOGIN_REQUEST.flush(DEFAULT_USERS[0]);
    });

    it('should accept the users provided credentials if match what the server expects', () : void => {
      userService.login$(MOCK_USER_CREDENTIALS.userName, MOCK_USER_CREDENTIALS.password).subscribe({
        next(responseObject : User) : void {
          expect(userService['_currentUser$'].value).toEqual(responseObject);
        }
      });

      const LOGIN_REQUEST : TestRequest = httpTestingController.expectOne(ConfigService.appConfiguration.apiServer.paths.users.authenticate);
      expect(LOGIN_REQUEST.request.body).toEqual(MOCK_USER_CREDENTIALS);
      expect(LOGIN_REQUEST.request.method).toBe(HttpMethod.Post);
      expect(LOGIN_REQUEST.request.withCredentials).toBeTrue();

      LOGIN_REQUEST.flush(MOCK_CURRENT_USER);
    });
  });
});
