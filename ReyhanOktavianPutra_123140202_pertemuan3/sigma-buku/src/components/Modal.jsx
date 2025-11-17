import React, { useRef } from 'react';

const Modal = ({ children, onClose }) => {
  const modalRef = useRef();

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="modal-content"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;