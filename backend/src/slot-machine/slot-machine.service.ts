import { Injectable } from '@nestjs/common';

import { SlotSymbol } from '@src/slot-machine/slot-symbol.enum';
import { DatabaseService } from '@src/database/database.service';

@Injectable()
export class SlotMachineService {
  private readonly symbols: SlotSymbol[];

  constructor(private readonly databaseService: DatabaseService) {
    this.symbols = Object.values(SlotSymbol);
  }

  private spin(): [SlotSymbol, SlotSymbol, SlotSymbol, SlotSymbol] {
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
