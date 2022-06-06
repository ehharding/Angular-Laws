/* EXTERNAL INTERFACE THAT MIMICS FIREBASE CLOUD FIRESTORE STRUCTURE - MODIFY BOTH SIMULTANEOUSLY */
interface Contributor {
  contributorId : number;
  pocketFicUserId : number | undefined;
  firstName : string;
  lastName : string;
  email : string;
  resume : string | undefined;
  gitHub : string | undefined;
  linkedIn : string | undefined;
  jobTitle : string;
  personalSummary : string;
}

export type {
  Contributor
};
