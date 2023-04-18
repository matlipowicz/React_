import { RegisterValues } from 'src/components/register/FakeRegister';

export interface RegisterInterface {
  name: string;
  surname: string;
  login: string;
  password: string;
  repeatPassword: string;
  email: string;
}

export type AuthManagementType = {
  registerUser: RegisterInterface[];
  setRegisterUser: React.Dispatch<React.SetStateAction<RegisterValues[]>>;
  addUser: (values: RegisterValues) => void;
  logIn: (values: LoginType) => void;
  logOut: () => void;
  auth: boolean;
  currentUser: RegisterInterface | undefined;
};

export type LoginType = {
  login: string;
  password: string;
};
