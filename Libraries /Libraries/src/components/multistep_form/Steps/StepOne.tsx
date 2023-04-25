import { useEffect, useState } from 'react';
import { ClientCard, getAllClients } from 'src/api/clients';

import style from '../MultiStepForm.module.css';

type UserData = {
  name: string;
  phoneNumber: string;
  postalCode: string;
  street: string;
  surname: string;
  town: string;
  updateForm: (invoiceFields: Partial<ClientCard>) => void;
};

const StepOne = ({
  name,
  surname,
  town,
  street,
  postalCode,
  phoneNumber,
  updateForm,
}: UserData) => {
  const [users, setUsers] = useState<ClientCard[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<ClientCard | undefined>(undefined);

  useEffect(() => {
    getAllClients().then((data) => setUsers(data));
  }, []);

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const select = event.target.value;
    const client = users?.find((u) => u.id === Number(select));

    if (!client) return undefined;
    setSelectedUser(client);
    updateForm(client);
  }

  return (
    <>
      <label htmlFor='users' className={style['step__users-label']}>
        <h2>Client</h2>
      </label>
      <select name='users' className={style['step__users-select']} onChange={handleSelect} required>
        <option value=''>Select user</option>
        {users !== null
          ? users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.surname}
              </option>
            ))
          : null}
      </select>

      <div className={style['step__users-details']}>
        <div key={name}>
          <p>
            <b>Full name:</b> {name} {surname}
          </p>
          <p>
            <b>Address:</b> {town} {postalCode} {street} {selectedUser === null ? '' : street}
          </p>
          <p>
            <b>Province:</b> {postalCode}
          </p>
          <p>
            <b>Phone:</b> {phoneNumber}
          </p>
        </div>
      </div>
    </>
  );
};
export default StepOne;
