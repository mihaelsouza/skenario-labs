import './Dashboard.css';
import React, { useEffect } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { updateUser } from '../../redux/usersSlice';
import { openModal, switchRender } from '../../redux/modalSlice';

import Modal from '../../containers/Modal/Modal';
import NavBar from '../../containers/NavBar/NavBar';
import PropertyGrid from '../../containers/PropertyGrid/PropertyGrid';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('sklabs-propertyviewer-userdata');
    if (userData) dispatch(updateUser(JSON.parse(userData)));
    else {
      dispatch(switchRender('user'));
      dispatch(openModal());
    }
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <NavBar />
      <PropertyGrid />
      <Modal />
    </div>
  )
};

export default Dashboard;
