import {
  Controller,
  Get,
  Req,
  Version,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { API_VERSION_1 } from '@src/common/constants';
import { CashoutService } from '@src/cashout/cashout.service';
import { RequestWithSession } from '@src/common/types/request-with-session';
import { BaseApiResponseDto } from '@src/common/dtos/base-api-response.dto';

@Controller('cashout')
export class CashoutController {
  private readonly logger = new Logger(CashoutController.name);

  constructor(private readonly cashoutService: CashoutService) {}

  @Get()
  @Version(API_VERSION_1)
  @HttpCode(HttpStatus.OK)
  async cashout(@Req() request: RequestWithSession): Promise<BaseApiResponseDto> {
    try {
      await this.cashoutService.cashout(request.session.credits, request.session.id);

      return {
        success: true,
        message: `Successfully cashed out the credits.`,
      };
    } catch (error) {
      this.logger.error('Unexpected error:', error);

      throw new InternalServerErrorException({
        data: null,
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}
