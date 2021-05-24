import React from 'react';
import {View, Button} from 'react-native'
import {
    CardField,
    CardFieldInput,
    PaymentIntents,
    StripeProvider,
    useStripe,
    PaymentMethodCreateParams,
    handleCardAction
  } from '@stripe/stripe-react-native';
//import PaymentScreen from './PaymentScreen';

import react, { useState, useEffect} from 'react';
  

  export default function CheckOut() {
    //const [card, setCard] = useState();
    //const { confirmPayment, handleCardAction } = useStripe();
    const [card, setCard] = useState();
    const {handleCardAction} = useStripe();
    const pay = async () => {
      const { paymentMethod, error } = await createPaymentMethod(card);
    
      if (error) {
        // Handle error
      } else if (paymentMethod) {
        const paymentMethodId = paymentMethod.id;
        console.log("--------------------------")
        console.log(paymentMethodId)
        // Send the ID of the PaymentMethod to your server for the next step
        // ...
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "payment_method_id": paymentMethodId
          })
        }
        try{
          const response = await fetch("http://51.178.36.227:2000/api/payment/pay", options)
          const json = await response.json()
          console.log("response")
          console.log(json)
          if(json.error){
            console.log("Error en Pago")
          } else if (json.requiresAction){
            console.log("Se requiere de accion crack")
            const{ error, paymentIntent} = await handleCardAction(
              json.clientSecret
            );
            if(error){
              console.log("Error DESCONOCIDO")
            } else{
              console.log("La cosa pinta bien")

              fetch("http://51.178.36.227:2002/pay/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payment_intent_id: paymentIntent.id })
              }).then(function(confirmPayment){
                return confirmResult.json();
              }).then(handleServerResponse)
            }
          } else {
            console.log("PAGO OK")
            
          }
  
        } catch(error){
          console.log(error)
          console.log("error de conexion (pago)")
        }
        


      }
    }; 

    async function createPaymentMethod(card) {
      console.log("creando payment method")
      console.log(card)
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "theCard": card
        })
      }
      try{
        const response = await fetch("http://51.178.36.227:2000/api/payment/createPaymentMethod", options)
        if(!response.ok){
          console.log("Error en createpaymentmethod")
        } else {
          console.log("todo ok en crear metodo de pago")
          return await response.json()
        }

      } catch(error){
        console.log("error de conexion")
      }
    }



    return (
        <View>
          <CardField
                postalCodeEnabled={false}
                placeholder={{
                number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                }}
                style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                setCard(cardDetails);
                console.log(cardDetails)
                }}
                onFocus={(focusedField) => {
                console.log('focusField', focusedField);
                }}
            />
          <Button title="Paga" onPress={pay}></Button>
        </View>
    );

    
  }



