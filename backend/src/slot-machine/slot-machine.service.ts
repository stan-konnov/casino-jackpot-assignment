import { Injectable, Logger } from '@nestjs/common';

import { DatabaseService } from '@src/database/database.service';
import { SlotSymbol } from '@src/slot-machine/helpers/slot-symbol.enum';
import { SlotMachineResponse } from '@src/slot-machine/dtos/slot-machine.response';
import { CheatingEngineService } from '@src/common/services/cheating-engine.service';
import { SlotSymbolRewardMap } from '@src/slot-machine/helpers/slot-symbol-reward.map';
import { InsufficientCreditsError, SessionDoesNotExistError } from '@src/slot-machine/errors';

@Injectable()
export class SlotMachineService {
  private readonly symbols: SlotSymbol[];

  private readonly logger = new Logger(SlotMachineService.name);

  constructor(private readonly databaseService: DatabaseService) {
    this.symbols = Object.values(SlotSymbol);
  }

  public async play(sessionId: string): Promise<SlotMachineResponse> {
    const session = await this.databaseService.session.findFirst({ where: { id: sessionId } });

    if (!session) {
      throw new SessionDoesNotExistError(`Session with ID ${sessionId} does not exist.`);
    }

    if (session.credits === 0) {
      throw new InsufficientCreditsError(`Session with ID ${sessionId} has insufficient credits.`);
    }

    await this.databaseService.session.update({
      where: { id: sessionId },
      data: { credits: { decrement: 1 } },
    });

    let slots = this.spinTheSlots();
    let isWin = slots.every((symbol) => symbol === slots[0]);

    let reward = 0;

    while (CheatingEngineService.shouldRerollSlotMachine(isWin, session.credits)) {
      this.logger.log(
        `Rerolling slots for session ${sessionId}. Current slots: ${slots.join(', ')}`,
      );

      slots = this.spinTheSlots();
      isWin = slots.every((symbol) => symbol === slots[0]);

      this.logger.log(`New slots after reroll: ${slots.join(', ')}.`);
    }

    if (isWin) {
      reward = SlotSymbolRewardMap[slots[0]];

      await this.databaseService.session.update({
        where: { id: sessionId },
        data: { credits: { increment: reward } },
      });
    }

    return {
      slots,
      credits: session.credits - 1 + reward,
    };
  }

  protected spinTheSlots(): [SlotSymbol, SlotSymbol, SlotSymbol] {
    return [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()];
  }

  private getRandomSymbol = (): SlotSymbol =>
    this.symbols[Math.floor(Math.random() * this.symbols.length)] as SlotSymbol;
}
