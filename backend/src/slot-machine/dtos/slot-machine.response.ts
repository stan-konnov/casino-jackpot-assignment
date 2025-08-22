import { SlotSymbol } from '@src/slot-machine/helpers/slot-symbol.enum';

export type SlotMachineResponse = {
  slots: [SlotSymbol, SlotSymbol, SlotSymbol];
  credits: number;
};
