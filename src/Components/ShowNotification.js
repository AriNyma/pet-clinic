
import { toast } from 'react-toastify';

const showNotification = ({ message, type }) => {
  const getToastOptions = () => {
    switch (type) {
      case 'success':
        return {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'success',
        };
      case 'error':
        return {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'error',
        };
      case 'warning':
        return {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'warning',
        };
      default:
        return {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: 'info',
        };
    }
  };

  toast(message, getToastOptions());

  return null;
};

export default showNotification;