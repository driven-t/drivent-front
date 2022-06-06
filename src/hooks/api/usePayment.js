import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();
  const {
    loading: paymentLoading,
    error: paymentError,
    act: pay,
  } = useAsync((body) => paymentApi.confirmPayment(body, token), false);

  return {
    paymentLoading,
    paymentError,
    pay,
  };
}
