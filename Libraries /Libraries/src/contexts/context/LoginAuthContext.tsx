import { createContext, useContext, useEffect, useState } from 'react';
import { RegisterValues } from 'src/components/register/FakeRegister';
import {
  AuthManagementType,
  LoginType,
  RegisterInterface,
} from 'src/contexts/types/LoginAuthTypes';

export const AuthContext = createContext<AuthManagementType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [registerUser, setRegisterUser] = useState<RegisterInterface[]>(registeredUsers || []);
  const [auth, setAuth] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<RegisterInterface | undefined>(undefined);

  //! Register
  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(registerUser));
  }, [registerUser]);

  const addUser = (values: RegisterValues) => {
    setRegisterUser((prev) => [...prev, values]);
  };

  function registeredUsers() {
    const users = JSON.parse(localStorage.getItem('accounts') as string);
    if (!users) return [];
    return users as RegisterValues[];
  }
  //! Login
  function logIn(values: LoginType) {
    registerUser.forEach((user) => {
      if (values.password === user.password && values.login === user.login) {
        setAuth(!auth);
        setCurrentUser(user);
      }
    });
  }

  function logOut() {
    setCurrentUser(undefined);
    setAuth(false);
  }
  return (
    <>
      <AuthContext.Provider
        value={{ registerUser, setRegisterUser, addUser, auth, logIn, logOut, currentUser }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

//! Hook context values - extracting
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("Missing AuthContext, it's not wrapped in ThemeProvider");
  }
  return ctx;
};
