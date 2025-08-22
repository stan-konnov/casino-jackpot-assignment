import { Injectable } from '@nestjs/common';

import { DummyWalletService } from '@src/cashout/dummy-wallet.service';

@Injectable()
export class CashoutService {
  constructor(private readonly dummyWalletService: DummyWalletService) {}
}
