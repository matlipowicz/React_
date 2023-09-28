import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useAuthContext } from 'src/contexts/context/LoginAuthContext';
import { RootState } from 'src/redux/store/Money';

export function UserAvatar() {
  const [toggle, setToggle] = useState<boolean>(false);
  function showCredential() {
    setToggle(!toggle);
  }
  //! Redux

  const amount = useSelector((state: RootState) => state.money.amount);
  //! Register
  const { auth, currentUser } = useAuthContext();

  if (!currentUser) return null;

  const nameFirstLetter = currentUser.name.at(0);
  const surnnameFirstLetter = currentUser.surname.at(0);
  //! Ternary
  return (
    <>
      {auth && (
        <div
          key={currentUser.login}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            position: 'absolute',
            top: '5px',
            right: '5px',
          }}
        >
          <Avatar sx={{ bgcolor: deepPurple[500] }} onClick={showCredential}>
            {nameFirstLetter}
            {surnnameFirstLetter}
          </Avatar>
          {toggle && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <p>Name: {currentUser.name}</p>
                <p>Surname: {currentUser.surname}</p>
                <p>E-mail: {currentUser.email}</p>
              </div>
              <p>
                <b>Wallet:</b> <Link to={'/money'}>{amount}</Link>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
