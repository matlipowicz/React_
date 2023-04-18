import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import { useContext } from 'react';
import { useAuthContext } from 'src/contexts/context/LoginAuthContext';

export function UserAvatar() {
  //! Register

  const { registerUser, auth, logIn, currentUser } = useAuthContext();

  if (!currentUser) return null;

  const nameFirstLetter = currentUser.name.at(0);
  const surnnameFirstLetter = currentUser.surname.at(0);
  //! Ternary
  return (
    <>
      {auth && (
        <div key={currentUser.login}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {nameFirstLetter}
            {surnnameFirstLetter}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>Name: {currentUser.name}</p>
            <p>Surname: {currentUser.surname}</p>
            <p>E-mail: {currentUser.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
