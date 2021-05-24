import React from 'react';
import {View} from 'react-native'
import {
    CardField,
    CardFieldInput,
    useStripe,
  } from '@stripe/stripe-react-native';
import react, { useState } from 'react';
  
function PaymentScreen() {
    const [card, setCard] = useState();
    //const { confirmPayment, handleCardAction } = useStripe();
  
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
                }}
                onFocus={(focusedField) => {
                console.log('focusField', focusedField);
                }}
            />
        </View>
    );
}