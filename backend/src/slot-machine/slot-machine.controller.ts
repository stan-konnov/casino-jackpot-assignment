import { Controller, Get, Req, Version } from '@nestjs/common';

import { API_VERSION_1 } from '@src/common/constants';
import { RequestWithSession } from '@src/common/types/request.with.session';
import { SlotMachineService } from '@src/slot-machine/slot-machine.service';

@Controller('slot-machine')
export class SlotMachineController {
  constructor(private readonly slotMachineService: SlotMachineService) {}

  @Get('test-session')
  @Version(API_VERSION_1)
  testSession(@Req() request: RequestWithSession): { session: RequestWithSession['session'] } {
    return { session: request.session };
  }
}
