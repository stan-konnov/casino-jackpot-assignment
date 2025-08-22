import { Module } from '@nestjs/common';

import { CashoutService } from '@src/cashout/cashout.service';
import { DatabaseModule } from '@src/database/database.module';
import { CashoutController } from '@src/cashout/cashout.controller';
import { DummyWalletService } from '@src/cashout/dummy-wallet.service';

@Module({
  imports: [DatabaseModule],
  providers: [CashoutService, DummyWalletService],
  controllers: [CashoutController],
})
export class CashoutModule {}
