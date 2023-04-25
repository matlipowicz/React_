import { RegisterValues } from 'src/components/register/FakeRegister';

export interface RegisterInterface {
  email: string;
  login: string;
  name: string;
  password: string;
  repeatPassword: string;
  surname: string;
}

export type AuthManagementType = {
  addUser: (values: RegisterValues) => void;
  auth: boolean;
  currentUser: RegisterInterface | undefined;
  logIn: (values: LoginType) => void;
  logOut: () => void;
  registerUser: RegisterInterface[];
  setRegisterUser: React.Dispatch<React.SetStateAction<RegisterValues[]>>;
};

export type LoginType = {
  login: string;
  password: string;
};
