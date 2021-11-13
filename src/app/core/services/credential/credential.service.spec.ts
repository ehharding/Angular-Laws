import { TestBed } from '@angular/core/testing';

import { DEFAULT_USERS } from '@core/interceptors/backend/backend.model';
import { User } from '@core/services/user/user.model';

import { CredentialService } from '@core/services/credential/credential.service';

describe('service CredentialService', () : void => {
  let credentialService : CredentialService;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      providers : [CredentialService]
    });

    localStorage.clear();
    credentialService = TestBed.inject(CredentialService);

    expect(credentialService).toBeTruthy();
  });

  it('should be created', () : void => {
    expect(credentialService['_currentUser']).toBeNull();
    expect(credentialService['_jwtToken']).toEqual('');
  });

  describe('function getCurrentUser()', () : void => {
    it('should return the currently logged in user', () : void => {
      expect(credentialService.getCurrentUser()).toBe(credentialService['_currentUser']);
    });
  });

  describe('function getJwtToken()', () : void => {
    it('should return the JSON Web Token (JWT) of the current user', () : void => {
      expect(credentialService.getJwtToken()).toBe(credentialService['_jwtToken']);
    });
  });

  describe('function isLoggedIn()', () : void => {
    it('should return whether or not the current user is logged in based on whether or not they have a JWT set', () : void => {
      expect(credentialService.isLoggedIn()).toBeFalse();

      credentialService['_jwtToken'] = 'fake-jwt-token';
      expect(credentialService.isLoggedIn()).toBeTrue();
    });
  });

  describe('function setCurrentUser()', () : void => {
    it('should set the current user for the application, meaning that the state of the CredentialService is updated', () : void => {
      const MOCK_CURRENT_USER : User = { ...DEFAULT_USERS[0], jwtToken : 'fake-jwt-token' };

      credentialService.setCurrentUser(MOCK_CURRENT_USER);
      expect(credentialService['_currentUser']).toEqual(MOCK_CURRENT_USER);
      expect(credentialService['_jwtToken']).toEqual(MOCK_CURRENT_USER.jwtToken);
    });
  });

  describe('function _loadCredentialsFromStorage()', () : void => {
    it('should set the current user for the application if there is a user to load from local storage', () : void => {
      const MOCK_CURRENT_USER : User = { ...DEFAULT_USERS[0], jwtToken : 'fake-jwt-token' };
      spyOn(JSON, 'parse').and.returnValue(MOCK_CURRENT_USER);

      credentialService['_loadCredentialsFromStorage']();
      expect(credentialService['_currentUser']).toEqual(MOCK_CURRENT_USER);
      expect(credentialService['_jwtToken']).toEqual(MOCK_CURRENT_USER.jwtToken);
    });

    it('should do nothing if there is not a current user in storage', () : void => {
      credentialService['_loadCredentialsFromStorage']();
      expect(credentialService['_currentUser']).toBeNull();
      expect(credentialService['_jwtToken']).toEqual('');
    });
  });
});
