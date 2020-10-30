import User from './user';

export default interface Users {
  [username: string]: User;
}
