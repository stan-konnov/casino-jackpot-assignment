import { ReactElement, useState } from 'react';
import { toast } from 'react-hot-toast';

import { cashoutRequest } from '@src/cashout/api';

import 'src/styles/toast.css';
import '@src/cashout/styles/index.css';

type CashoutButtonProps = {
  onCashout: () => void;
  disabled?: boolean;
};

export const CashoutButton = ({ onCashout, disabled }: CashoutButtonProps): ReactElement => {
  const [loading, setLoading] = useState(false);

  const handleCashout = async (): Promise<void> => {
    setLoading(true);
    onCashout();
    try {
      const response = await cashoutRequest();
      if (response.success) {
        toast.success(response.message || 'Cashout successful!', {
          className: 'custom-toast-base custom-toast-success',
          icon: null,
        });
      } else {
        toast.error(response.message || 'Cashout failed.', {
          className: 'custom-toast-base custom-toast-error',
          icon: null,
        });
      }
    } catch {
      toast.error('Cashout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="cashoutButton"
      onClick={handleCashout}
      disabled={loading || disabled}
      type="button"
    >
      {loading ? 'Processing...' : 'Cash Out'}
    </button>
  );
};
