import { SlotSymbol } from '@src/slot-machine/helpers/slot-symbol.enum';

export const SlotSymbolRewardMap: Record<SlotSymbol, number> = {
  [SlotSymbol.CHERRY]: 10,
  [SlotSymbol.LEMON]: 20,
  [SlotSymbol.ORANGE]: 30,
  [SlotSymbol.WATERMELON]: 40,
};
