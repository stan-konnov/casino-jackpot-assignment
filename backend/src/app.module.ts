import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@src/database/database.module';
import { SlotMachineModule } from '@src/slot-machine/slot-machine.module';
import { SessionMiddleware } from '@src/common/middleware/session.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, SlotMachineModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
