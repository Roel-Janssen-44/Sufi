// ModalContext.js
import {createContext, useContext, useState} from 'react';

const ModalContext = createContext({
  isModalOpen: false,
  toggleModal: () => {}, // Default value is a no-op function
});

export const ModalProvider = ({children}: {children: any}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{isModalOpen, toggleModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
