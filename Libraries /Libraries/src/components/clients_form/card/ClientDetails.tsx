import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ClientCard as ClientCardType, getClient, deleteClient } from 'src/api/clients';
import style from './Card.module.css';
import { useQuery } from '@tanstack/react-query';
import TransitionsModal from 'src/components/modals/DeleteModal';

export const ClientDetails = () => {
  const [edit, setEdit] = useState(false);
  // const [user, setUser] = useState<ClientCardType | null>(null);
  const { clientId } = useParams();

  const editUser = () => {
    setEdit(!edit);
  };

  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['clients', clientId],
    queryFn: () => getClient(clientId as string | number),
  });
  const eraseUser = () => {
    if (user) {
      deleteClient(clientId as string);
    }
  };
  // useEffect(() => {
  //     if (clientId) {
  //         getClient(clientId).then((data) => setUser(data));
  //     }
  // }, [clientId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError || !user) {
    if (error instanceof Error) {
      return <p>Error: {error.message}</p>;
    }
  }

  return (
    <>
      {user && (
        <div className={style['card__user']} key={user?.id}>
          <p className={style['card__user--name']}>
            <strong>Name: </strong>
            {user.name}
          </p>
          <p className={style['card__user--surname']}>
            <strong>Surname:</strong> {user.surname}
          </p>
          <p className={style['card__user--street']}>
            <strong>Street:</strong> {user.street}
          </p>
          <p className={style['card__user--postalcode']}>
            <strong> Code:</strong> {user.postalCode}
          </p>
          <p className={style['card__user--town']}>
            <strong>Town:</strong> {user.town}
          </p>
          <p className={style['card__user--region']}>
            <strong>Region:</strong> {user.subRegion}
          </p>
          <p className={style['card__user-strong>-imgSrc']}>
            <strong>Image link:</strong>
            <a href={user.imgSrc}>{user.imgSrc}</a>
          </p>
          <p className={style['card__user--phoneNumber']}>
            <strong>Phone number:</strong> {user.phoneNumber}
          </p>

          <div style={{ display: 'flex' }}>
            <Link to='edit' onClick={editUser}>
              <button className='card__user-edit-btn'>Edit</button>
            </Link>

            <TransitionsModal deleteUser={eraseUser} />
          </div>
        </div>
      )}
    </>
  );
};
