interface User {
  id : number;
  isAdmin : boolean;
  userName : string;
  password : string;
  birthday : string;
  title : string | undefined;
  firstName : string;
  middleName : string | undefined;
  lastName : string | undefined;
  generation : string | undefined;
  jwtToken : string;
}

export type {
  User
};
