import { Module } from '@nestjs/common';

import { DatabaseModule } from '@src/database/database.module';
import { SlotMachineService } from '@src/slot-machine/slot-machine.service';
import { SlotMachineController } from '@src/slot-machine/slot-machine.controller';

@Module({
  imports: [DatabaseModule],
  providers: [SlotMachineService],
  controllers: [SlotMachineController],
})
export class SlotMachineModule {}
