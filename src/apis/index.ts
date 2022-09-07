/* eslint-disable import/no-anonymous-default-export */
import * as OTP from './OTP';
import * as hippa from './hippa';
import * as payment from './payment';
import * as location from './location';
import * as appointment from './appointment';
import * as getPostalcodes from './getPostalcodes';

export default {
  sendOtp: OTP.sendOtp,
  verifyOTP: OTP.verifyOTP,
  getHippaContent: hippa.getHippaContent,
  getPaymentIntentId: payment.getPaymentIntentId,
  getLocation: location.getLocation,
  createAppointment: appointment.createAppointment,
  getPostalcodes:getPostalcodes.getPostalcodes
};
