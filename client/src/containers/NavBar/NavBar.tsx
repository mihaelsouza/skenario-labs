import './NavBar.css';
import React from 'react';

import { UserInitialState } from '../../interfaces/User';

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { updateUser } from '../../redux/usersSlice';
import { openModal, switchRender } from '../../redux/modalSlice';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.users.username);

  const handleClick = (): void => {
    localStorage.removeItem('sklabs-propertyviewer-userdata');
    dispatch(updateUser(UserInitialState));
    dispatch(switchRender('user'));
    dispatch(openModal());
  };

  return (
    <div className="navbar-container">
      <h2>Property Viewer</h2>
      <h3>Welcome Back, {username}</h3>
      <button onClick={handleClick}>LOGOUT</button>
    </div>
  )
}

export default NavBar
