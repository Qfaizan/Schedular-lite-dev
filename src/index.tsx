import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK || '');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);