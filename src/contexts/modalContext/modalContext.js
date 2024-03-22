import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    workoutFilterModal: false,
    mobileInputModal: false,
    notesModal: false,
  });

  const toggleModal = (modalName) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: !prevModals[modalName],
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
