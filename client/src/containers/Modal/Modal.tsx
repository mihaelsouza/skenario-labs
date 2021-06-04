import './Modal.css';
import React from 'react';
import ReactDom from 'react-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeModal } from '../../redux/modalSlice';

import UserLoginRegister from '../../components/UserLoginRegister/UserLoginRegister';
import PropertyView from '../../components/PropertyView/PropertyView';

const Modal: React.FC = () => {
  const modalState = useAppSelector(state => state.modal.value);
  const modalRender = useAppSelector(state => state.modal.render);
  const dispatch = useAppDispatch();

  const portalDiv = document.getElementById('portal');
  if (!portalDiv || !modalState) return null;

  const handleClick = () => {
    dispatch(closeModal());
  };

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={handleClick} />
      <div className="modal-style">
        <button className="modal-close" onClick={handleClick}>
          X
        </button>
        {modalRender === 'user'
          ? <UserLoginRegister />
          : <PropertyView actionMode={modalRender}/>
        }
      </div>
    </>,
    portalDiv
  );
};

export default Modal;
