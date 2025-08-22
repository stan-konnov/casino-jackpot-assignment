import { Controller, Get, Req, Version } from '@nestjs/common';

import { API_VERSION_1 } from '@src/common/constants';
import { DataApiResponseDto } from '@src/common/dtos/data-api-response.dto';
import { RequestWithSession } from '@src/common/types/request-with-session';

@Controller('credits')
export class CreditsController {
  @Get()
  @Version(API_VERSION_1)
  getCredits(@Req() request: RequestWithSession): DataApiResponseDto<number | null> {
    return {
      success: true,
      message: 'Available credits.',
      data: request.session?.credits ?? null,
    };
  }
}
