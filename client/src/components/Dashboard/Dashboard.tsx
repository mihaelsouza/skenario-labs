import './Dashboard.css';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUser } from '../../redux/usersSlice';
import { openModal, switchRender } from '../../redux/modalSlice';

import Modal from '../../containers/Modal/Modal';
import NavBar from '../../containers/NavBar/NavBar';
import PropertyGrid from '../../containers/PropertyGrid/PropertyGrid';
import { getUserProperties } from '../../services/ServerService';
import { storeProperties } from '../../redux/propertySlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.users.userId);

  useEffect(() => {
    const userData = localStorage.getItem('sklabs-propertyviewer-userdata');
    if (userData) dispatch(updateUser(JSON.parse(userData)));
    else {
      dispatch(switchRender('user'));
      dispatch(openModal());
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const userProperties = await getUserProperties(userId);
      dispatch(storeProperties(userProperties));
    })();
  }, [userId, dispatch]);

  return (
    <div className="dashboard-container">
      <NavBar />
      <PropertyGrid />
      <Modal />
    </div>
  )
};

export default Dashboard;
