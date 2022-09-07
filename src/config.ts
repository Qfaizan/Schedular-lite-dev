/* eslint-disable import/no-anonymous-default-export */
export default {
    baseURL: 'https://us-central1-wsl-multitenancy-dev-ac13b.cloudfunctions.net/',
    otpEndpoint: {
        sendOtp : 'sendOtp',
        validateOTP: 'verifyOTP',
        createPaymentIntent: 'createPaymentIntent'
    },
    currency: 'usd',
    apiEndPoints:{
        location:{
            get:'getLocation'
        },
        logo:{
            get:'getCpartnerLogo'
        },
        stripe:{
            createPaymentIntent:'createPaymentIntent'
        },
        appointments:{
            create:'createAppointmentDatailswithTask'
        },
        hippa:{
            get:'getAllClientPartner'
        },
        Postalcodes:{
            get:'getPostalcodes'
        }
    },
    termsAndConditions : 'https://worksitelabs.com/terms-conditions/',
    firebase: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: 'wsl-multitenancy-dev-ac13b.appspot.com',
    },
    CreditCardImage: 'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/sample_payment_card.jpg?alt=media&token=1d52a1d3-9813-4262-a512-a26567fe5ec4',
    GovtProofImage:'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/driving_license.jpg?alt=media&token=47195e45-d072-4415-ad1a-0ee7c41e89cb',
    PaymentModalImage : 'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/paymentLogo.png?alt=media&token=124acc06-3f16-4c2d-b752-818f95df1951',
    dateFormat:'LL/dd/yyyy',
}