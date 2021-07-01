import { User } from '@core/services/user/user.model';

export interface InMemoryDatabase {
  allUsers : User[];
}
