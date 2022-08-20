import { toast } from 'react-toastify';

const useToast = () => {
  const successToast = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const errorToast = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const promisesToast = (func) => {
    toast.promise(func, {
      pending: 'Saving your changes... ☁️',
      success: 'All done! 👌',
      error: 'Promise rejected 🤯',
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return {
    successToast,
    errorToast,
    promisesToast,
  };
};

export default useToast;
