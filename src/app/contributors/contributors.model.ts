/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

import { animate, state, style, transition, trigger } from '@angular/animations';

import { ConfigService } from '@core/services/config/config.service';

enum JobTitles {
  SoftwareEngineer = 'Software Engineer'
}

export interface Contributor {
  firstName : string;
  lastName : string;
  title : string;
  email : string;
  personalSummary : string;
  gitHub ?: string;
  linkedIn ?: string;
}

export const CONTRIBUTORS : Contributor[] = [
  {
    firstName : 'Evan',
    lastName : 'Harding',
    title : JobTitles.SoftwareEngineer,
    email : 'ehharding@gmail.com',
    personalSummary : 'The creator of the site, Evan is a software engineer currently working for Lockheed Martin in Littleton, CO. He graduated ' +
                      'from The Pennsylvania State University (Penn State) in 2019 with a major in Computer Engineering and a minor in ' +
                      'Mathematics. His interests include gaming, reading, watching movies, artificial intelligence, and in general everything ' +
                      'technology. He is 24 years old and lives in Castle Rock, CO with his fiancée Sarah, their Australian cattle dog Sega, and ' +
                      'their two cats Edgar and Minerva (Minnie).',
    gitHub : 'https://github.com/ehharding',
    linkedIn : 'https://www.linkedin.com/in/ehharding/'
  }
];

export const CONTRIBUTORS_ANIMATIONS : unknown[] = [
  trigger('hover', [
    state('normalState', style({ transform : 'translateX(0)' })),
    state('shiftedState', style({ transform : 'translateX(10px)' }))
  ]),
  trigger('openClose', [
    state('visibleState', style({ opacity : 1 })),
    state('invisibleState', style({ opacity : 0 })),
    transition('visibleState <=> invisibleState', [animate(`${ ConfigService.internalAppConfiguration.constants.genericAnimationDurationMS }ms`)])
  ])
];
