import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CashoutModule } from '@src/cashout/cashout.module';
import { CreditsModule } from '@src/credits/credits.module';
import { DatabaseModule } from '@src/database/database.module';
import { SlotMachineModule } from '@src/slot-machine/slot-machine.module';
import { SessionMiddleware } from '@src/common/middleware/session.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CashoutModule,
    CreditsModule,
    DatabaseModule,
    SlotMachineModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
