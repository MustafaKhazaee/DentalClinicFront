export interface User {
  sid: string;
  nameIdentifier: Array<string>;
  firstName: string;
  lastName: string;
  isLoggedIn: boolean;
  roles: Array<string>;
  token: string;
}
