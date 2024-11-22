import api from './api';

export const getAuthUserSubscriptions = async (): Promise<unknown> => {
  const response = await api.get(`subscriptions`);
  const data = await response.data;
  return data;
};

// Starts credit purchase process by making a POST request with phone number and amount
export const startCreditPurchase = async (
  plan_name: string,
  payment_info: string,
  method: string
) => {
  try {
    const response = await api.post(`subscriptions/`, {
      plan_name: plan_name,
      payment_info: payment_info,
      method: method,
    });

    console.log(
      'Credit purchase initiated, follow mobile payment instructions',
      response
    );
  } catch (error) {
    console.error('Credit purchase error:', error);
  }
};
