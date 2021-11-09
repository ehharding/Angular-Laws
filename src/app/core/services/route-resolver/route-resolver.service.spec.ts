import { TestBed } from '@angular/core/testing';

import { AppRoute } from 'app/app-routing.module';

import { RouteResolverService } from '@core/services/route-resolver/route-resolver.service';

describe('service RouteResolverService', () : void => {
  let routeResolverService : RouteResolverService;

  beforeEach(() : void => {
    TestBed.configureTestingModule({
      providers : [RouteResolverService]
    });

    routeResolverService = TestBed.inject(RouteResolverService);
  });

  it('should be created', () : void => {
    expect(routeResolverService).toBeTruthy();
  });

  describe('function _getThreshold()', () : void => {
    it('should return a threshold of three if the user requested path is less than five characters long and five otherwise', () : void => {
      expect(RouteResolverService['_getThreshold']('1')).toBe(3);
      expect(RouteResolverService['_getThreshold']('12')).toBe(3);
      expect(RouteResolverService['_getThreshold']('123')).toBe(3);
      expect(RouteResolverService['_getThreshold']('1234')).toBe(3);

      expect(RouteResolverService['_getThreshold']('12345')).toBe(5);
      expect(RouteResolverService['_getThreshold']('123456')).toBe(5);
    });
  });

  // eslint-disable-next-line no-warning-comments
  // TODO Improve the robustness of this functions' tests
  describe('function resolve()', () : void => {
    it('should return null if the requested route is totally different from any existing route (greater than five characters different)', () : void => {
      // Since "contributors" Is The Closest Existent Route And This Is Different In Length By Five Characters
      expect(routeResolverService.resolve({ queryParams : { requestedRoute : `${ AppRoute.Contributors }sssss` } } as any, { } as any)).toBeNull();
    });

    it('should return "contributors,users", since "contributors" would be the closest to the input', () : void => {
      expect(routeResolverService.resolve({ queryParams : { requestedRoute : `${ AppRoute.Contributors }ssss` } } as any, { } as any)).toEqual(`${ AppRoute.Contributors },${ AppRoute.Users }`);
    });
  });
});
