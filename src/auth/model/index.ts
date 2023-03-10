import { createUser } from './create-user';
import { emailAvailable } from './email-available';
import { getUserByEmail } from './get-user-by-email';

const UserModel = {
  getUserByEmail,
  createUser,
  emailAvailable,
};

export default UserModel;
