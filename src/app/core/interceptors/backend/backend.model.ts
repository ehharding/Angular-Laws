import { Contributor } from '@contributors/services/contributor/contributor.model';
import { User } from '@core/services/user/user.model';

export const DEFAULT_CONTRIBUTORS : Contributor[] = [
  {
    id : 1,
    pocketFicUserName : 'solomon',
    firstName : 'Evan',
    lastName : 'Harding',
    email : 'ehharding@gmail.com',
    resume : 'https://drive.google.com/file/d/1NNx7D6jjK-QTicMbIeOLKai8t6U1Wk7H/view',
    gitHub : 'https://github.com/ehharding',
    linkedIn : 'https://www.linkedin.com/in/ehharding/',
    jobTitle : 'Sofware Engineer II',
    personalSummary : 'The creator of the site, Evan is a software engineer working for Lockheed Martin in Littleton, CO. He graduated from The Pennsylvania State ' +
                      'University (Penn State) in 2019 with a major in Computer Engineering and a minor in Mathematics. His interests include gaming, reading, watching ' +
                      'movies, artificial intelligence, and in general everything technology. He is 24 years old and lives in Castle Rock, CO with his wife Sarah, their ' +
                      'Australian Cattle Dog Sega, and their three cats Edgar Allan Paw, Molly, and Minerva (Minnie).'
  }
];

export const DEFAULT_USERS : User[] = [
  {
    id : 1,
    isAdmin : true,
    userName : 'solomon',
    password : 'time', // NOTE: In Production We Would Not Store Passwords Like This In Plaintext
    birthday : '19/09/2552',
    title : undefined,
    firstName : 'Evan',
    middleName : undefined,
    lastName : 'Harding',
    generation : undefined,
    jwtToken : ''
  }
];
