import { SlotSymbol } from '@src/slot-machine/slot-symbol.enum';

export type SlotMachineResponse = {
  slots: [SlotSymbol, SlotSymbol, SlotSymbol, SlotSymbol];
  credits: number;
};
