import { Navigate } from 'react-router-dom';

import { useAuthContext } from './LoginAuthContext';

export const ProtectProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthContext();

  return <>{auth ? children : <Navigate to='/' />}</>;
};
