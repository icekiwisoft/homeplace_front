export const getAuthUserSubscriptions = async (): Promise<Subscription> => {
  const response = await axios.get(`subscriptions`);
  const data = await response.data;
  return data;
};

//get subscription info by id
export const getSubscriptionById = async (
  id: number
): Promise<Subscription> => {
  const response = await axios.get(`subscriptions/${id}`);
  const data = await response.data;
  return data;
};

//create subscription using payment method and plan name
export const createSubscription = async (
  subscription: Subscription
): Promise<Subscription> => {
  const response = await axios.post(`subscriptions`, subscription);
  const data = await response.data;
  return data;
};
