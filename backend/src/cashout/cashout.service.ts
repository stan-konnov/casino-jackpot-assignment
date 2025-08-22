import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@src/database/database.service';
import { DummyWalletService } from '@src/cashout/dummy-wallet.service';

@Injectable()
export class CashoutService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly dummyWalletService: DummyWalletService,
  ) {}

  async cashout(amount: number, sessionId: string): Promise<void> {
    await this.dummyWalletService.transferToUserWallet(amount);
    await this.databaseService.session.delete({ where: { id: sessionId } });
  }
}
