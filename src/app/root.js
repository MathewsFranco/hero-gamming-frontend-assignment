import './main.css';

import * as React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { UniversalRouter } from './universal-router';
import { ToastContainer } from 'react-toastify';

export function Root(props) {
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <UniversalRouter location={props.location} />
    </>
  );
}
