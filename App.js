import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native'
import PaymentScreen from './PaymentScreen';
import {
  SafeAreaView,

} from 'react-native';
import CheckOut from './CheckOut'


function App() {
  const publishableKey = "pk_test_51IsANIBMsQSe7vj68L2VVQkQlCnwgsEIFw2LFVcROL1gT4WrxwGHIrlEOliWtqCPu5o7yPqg0lWQm65BrBH75kvH009hvHJaBx";
  return (
  <StripeProvider
    publishableKey={publishableKey}>
      <CheckOut></CheckOut>
  </StripeProvider>
  );
};

export default App;
