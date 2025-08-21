import { Injectable } from '@nestjs/common';

@Injectable()
export class CheatingEngineService {
  static shouldRerollSlotMachine(credits: number, isWin: boolean): boolean {
    // Reroll only on the winning spins
    if (!isWin) {
      return false;
    }

    // Reroll only above 40 credits
    if (credits < 40) {
      return false;
    }

    /**
     * Reroll with a probability based on the current credits:
     * 30% chance if credits are less than or equal to 60
     * 60% chance if credits are above 60
     */
    return Math.random() < (credits <= 60 ? 0.3 : 0.6);
  }
}
