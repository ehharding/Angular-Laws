export interface User {
  id : number;
  isAdmin : boolean;
  userName : string;
  password : string;
  birthday : string;
  title : string | null;
  firstName : string;
  middleName : string | null;
  lastName : string | null;
  generation : string | null;
  jwtToken : string;
}
