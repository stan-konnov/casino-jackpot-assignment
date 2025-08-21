import { Injectable } from '@nestjs/common';

import { SlotSymbol } from '@src/slot-machine/slot-symbol.enum';
import { SlotSymbolRewardMap } from '@src/slot-machine/slot-symbol-reward.map';
import { DatabaseService } from '@src/database/database.service';
import { InsufficientCreditsError, SessionDoesNotExistError } from '@src/slot-machine/errors';

@Injectable()
export class SlotMachineService {
  private readonly symbols: SlotSymbol[];

  constructor(private readonly databaseService: DatabaseService) {
    this.symbols = Object.values(SlotSymbol);
  }

  public async play(sessionId: string): Promise<[SlotSymbol, SlotSymbol, SlotSymbol, SlotSymbol]> {
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

    const slots = this.spinTheSlots();

    const win = slots.every((symbol) => symbol === slots[0]);
    let reward = 0;

    if (win) {
      reward = SlotSymbolRewardMap[slots[0]];

      await this.databaseService.session.update({
        where: { id: sessionId },
        data: { credits: { increment: reward } },
      });
    }

    return slots;
  }

  private spinTheSlots(): [SlotSymbol, SlotSymbol, SlotSymbol, SlotSymbol] {
    return [
      this.getRandomSymbol(),
      this.getRandomSymbol(),
      this.getRandomSymbol(),
      this.getRandomSymbol(),
    ];
  }

  private getRandomSymbol = (): SlotSymbol =>
    this.symbols[Math.floor(Math.random() * this.symbols.length)] as SlotSymbol;
}
