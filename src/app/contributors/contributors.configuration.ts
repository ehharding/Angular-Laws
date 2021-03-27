/*****************************************************************************************************************************************************
 * Copyright 2021 Evan H. Harding. All Rights Reserved.
 ****************************************************************************************************************************************************/

enum JobTitles {
  SoftwareEngineer = 'Software Engineer'
}

export interface Contributor {
  name : string;
  title : string;
  email : string;
  personalSummary : string;
  linkedIn ? : string;
}

export const CONTRIBUTORS : Contributor[] = [
  {
    name : 'Evan Harding',
    title : JobTitles.SoftwareEngineer,
    email : 'ehharding@gmail.com',
    personalSummary : 'The creator of the site, Evan is a software engineer currently working for Lockheed Martin in Littleton, CO. He graduated ' +
                      'from The Pennsylvania State University (Penn State) in 2019 with a major in Computer Engineering and a minor in ' +
                      'Mathematics. His interests include gaming, reading, watching movies, artificial intelligence, and in general everything ' +
                      'technology. He is 24 years old and lives in Castle Rock, CO with his fiancée Sarah, their australian cattledog Sega, and ' +
                      'their two cats Edgar and Minerva (Minnie).',
    linkedIn : 'https://www.linkedin.com/in/ehharding/'
  }
];
