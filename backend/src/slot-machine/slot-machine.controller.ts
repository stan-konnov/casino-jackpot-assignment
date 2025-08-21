import { Controller, Get, Req, Version } from '@nestjs/common';

import { API_VERSION_1 } from '@src/common/constants';
import { RequestWithSession } from '@src/common/types/request.with.session';

@Controller('slot-machine')
export class SlotMachineController {
  @Get('test-session')
  @Version(API_VERSION_1)
  testSession(@Req() request: RequestWithSession): { session: RequestWithSession['session'] } {
    return { session: request.session };
  }
}
