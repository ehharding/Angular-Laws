import { Contributor } from '@contributors/services/contributor/contributor.model';
import { User } from '@core/services/user/user.model';

export const INITIAL_CONTRIBUTORS : Contributor[] = [
  {
    id : 1,
    pocketFicUserName : 'solomon',
    firstName : 'Evan',
    lastName : 'Harding',
    email : 'ehharding@gmail.com',
    gitHub : 'https://github.com/ehharding',
    linkedIn : 'https://www.linkedin.com/in/ehharding/',
    jobTitle : 'Sofware Engineer II',
    personalSummary : 'The creator of the site, Evan is a software engineer currently working for Lockheed Martin in Littleton, CO. He graduated from The Pennsylvania ' +
                      'State University (Penn State) in 2019 with a major in Computer Engineering and a minor in Mathematics. His interests include gaming, reading, ' +
                      'watching movies, artificial intelligence, and in general everything technology. He is 24 years old and lives in Castle Rock, CO with his wife Sarah, ' +
                      'their Australian cattle dog Sega, and their two cats Edgar and Minerva (Minnie).'
  }
];

export const INITIAL_USERS : User[] = [
  {
    id : 1,
    isAdmin : true,
    userName : 'solomon',
    password : 'time',
    birthday : '19/09/2552',
    title : null,
    firstName : 'Evan',
    middleName : null,
    lastName : 'Harding',
    generation : null,
    jwtToken : ''
  }
];

export const INITIAL_CONTRIBUTORS_JSON : string = JSON.stringify(INITIAL_CONTRIBUTORS);
export const INITIAL_USERS_JSON : string = JSON.stringify(INITIAL_USERS);