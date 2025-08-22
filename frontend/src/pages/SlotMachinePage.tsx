import { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';

import { SlotMachine } from '@src/slot-machine/components/SlotMachine';

export const SlotMachinePage = (): ReactElement => {
  return (
    <>
      <SlotMachine />
      <Toaster position="bottom-center" />
    </>
  );
};
