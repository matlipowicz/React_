import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserAvatar } from 'src/components/login/user_avatar/UserAvatar';
import Home from 'src/components/pages/Home';
import { useThemeContext } from 'src/contexts/context/ThemeContext';
import { menuData } from 'src/mocks/menu';

import style from 'src/components/clients_form/card/Card.module.css';

// Wróć do zadania z menu z poprzedniego zestawu (komponenty) i dodaj przycisk umożliwiający jego zwijanie i rozwijanie, wykorzystaj useState

export const AsideMenu = () => {
  const [toggle, setToggle] = useState(false);
  const [client, setClient] = useState(false);

  const { toggleTheme } = useThemeContext();

  const toggleSideBarActive = () => {
    setToggle(!toggle);
  };

  const toggleSideBarInactive = () => {
    setToggle(false);
  };

  const addClient = () => {
    setClient(!client);
  };

  return (
    <>
      <button className={style.menu__btn} onClick={toggleSideBarActive}>
        Menu
      </button>

      <aside>
        <nav>
          <ul className={!toggle ? 'toggle' : 'toggle toggle--open'}>
            <button className='closeBtn' onClick={toggleSideBarInactive}>
              X
            </button>
            <Home />
            {menuData.map((item) => (
              <div
                key={item.linkName}
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <div>{item.icon}</div>
                <div>
                  <Link to={item.link} onClick={addClient}>
                    {item.linkName}
                  </Link>
                </div>
              </div>
            ))}
            <Link to='/register' style={{ justifyContent: 'left', display: 'flex' }}>
              Register
            </Link>
            ;
          </ul>
          {/* <CustomizedSwitches /> */}
          <button onClick={toggleTheme}>Toggle theme</button>
          <UserAvatar />
        </nav>
        <Outlet />
      </aside>
    </>
  );
};
