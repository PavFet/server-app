import { createUser } from './create-user';
import { emailAvailable } from './email-available';
import { getUser } from './get-user';

const UserModel = {
  getUser,
  createUser,
  emailAvailable,
};

export default UserModel;
