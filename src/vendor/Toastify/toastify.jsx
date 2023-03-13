import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AppContext from '../../Contexts/AppContext';
import 'react-toastify/dist/ReactToastify.css';

function renderToastify(type, message) {
  return toast[type](message, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

function Toastify() {
  const { theme } = useContext(AppContext);

  return <ToastContainer theme={theme} newestOnTop={false} />;
}

export { Toastify, renderToastify };
