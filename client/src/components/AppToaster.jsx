import { Toaster } from 'react-hot-toast';

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
        },

        success: {
          duration: 1000,
        },

        error: {
          duration: 1000,
        },
      }}
    />
  );
};

export default AppToaster;
