import './Modal.css';
import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  isOpen: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  children?: ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, setState, children }: Props) => {

  const portalDiv = document.getElementById('portal');
  if (!portalDiv || !isOpen) return null;

  const handleClick = () => {
    setState(false);
  };

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={handleClick} />
      <div className="modal-style">
        <button className="modal-close" onClick={handleClick}>
          X
        </button>
        {children}
      </div>
    </>,
    portalDiv
  );
};

export default Modal;
