import { Controller, Get, Req, Version, Logger, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { API_VERSION_1 } from '@src/common/constants';
import { RequestWithSession } from '@src/common/types/request-with-session';
import { SlotMachineService } from '@src/slot-machine/slot-machine.service';
import { DataApiResponseDto } from '@src/common/dtos/data-api-response.dto';
import { SlotMachineResponse } from '@src/slot-machine/types';
import { InsufficientCreditsError, SessionDoesNotExistError } from '@src/slot-machine/errors';

@Controller('slot-machine')
export class SlotMachineController {
  private readonly logger = new Logger(SlotMachineController.name);

  constructor(private readonly slotMachineService: SlotMachineService) {}

  @Get('play')
  @Version(API_VERSION_1)
  async play(
    @Req() request: RequestWithSession,
    @Res() response: Response,
  ): Promise<DataApiResponseDto<SlotMachineResponse> | void> {
    try {
      const slots = await this.slotMachineService.play(request.session.id);

      const dto: DataApiResponseDto<SlotMachineResponse> = {
        data: slots,
        success: true,
        message: 'Slots spun successfully.',
      };

      response.status(HttpStatus.OK);
      return dto;
    } catch (error) {
      if (error instanceof InsufficientCreditsError) {
        const dto: DataApiResponseDto<SlotMachineResponse> = {
          data: null,
          success: false,
          message: error.message,
        };

        response.status(HttpStatus.BAD_REQUEST);
        return dto;
      }

      if (error instanceof SessionDoesNotExistError) {
        this.logger.error('Session middleware issue:', error);

        const dto: DataApiResponseDto<SlotMachineResponse> = {
          data: null,
          success: false,
          message: 'Internal server error.',
        };

        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        return dto;
      }
    }
  }
}
