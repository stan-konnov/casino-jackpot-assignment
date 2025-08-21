import { Module } from '@nestjs/common';

import { SlotMachineController } from '@src/slot-machine/slot-machine.controller';

@Module({
  controllers: [SlotMachineController],
})
export class SlotMachineModule {}
