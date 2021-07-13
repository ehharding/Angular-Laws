import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ContributorsRoutingModule } from '@contributors/contributors-routing.module';
import { SharedModule } from '@shared/shared.module';

import { CONTRIBUTORS } from '@contributors/contributors.model';

import { ContributorsComponent } from '@contributors/contributors.component';

describe('ContributorsComponent', () : void => {
  let contributorsComponent : ContributorsComponent;
  let fixture : ComponentFixture<ContributorsComponent>;

  beforeEach(waitForAsync(() : void => {
    TestBed.configureTestingModule({
      declarations : [ContributorsComponent],
      imports : [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatTooltipModule,
        ContributorsRoutingModule,
        SharedModule
      ]
    }).compileComponents(); // Compile Template And CSS
  }));

  beforeEach(() : void => {
    fixture = TestBed.createComponent(ContributorsComponent);
    contributorsComponent = fixture.componentInstance;

    expect(contributorsComponent.contributors).toEqual(CONTRIBUTORS);
    expect(contributorsComponent.contributorNamesKebab).toEqual([]);

    expect(contributorsComponent.panelHovered).toBeFalse();
    expect(contributorsComponent.panelOpen).toBeFalse();
  });

  it('should be created', () : void => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('lifecycle hook ngOnInit()', () : void => {
    it('should execute component initialization instructions', () : void => {
      fixture.detectChanges();
      expect(contributorsComponent.contributorNamesKebab.length).toEqual(CONTRIBUTORS.length);

      for (let contributorIndex : number = 0; contributorIndex < CONTRIBUTORS.length; contributorIndex++) {
        const CONTRIBUTOR_NAME : string = `${ CONTRIBUTORS[contributorIndex].firstName } ${ CONTRIBUTORS[contributorIndex].lastName }`;

        expect(contributorsComponent.contributorNamesKebab[contributorIndex]).toEqual(`${ CONTRIBUTOR_NAME }`.toLowerCase().replace(' ', '-'));
      }
    });
  });
});
