import { Module } from '@nestjs/common';

import { CashoutService } from '@src/cashout/cashout.service';
import { DatabaseModule } from '@src/database/database.module';
import { CashoutController } from '@src/cashout/cashout.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CashoutService],
  controllers: [CashoutController],
})
export class CashoutModule {}
