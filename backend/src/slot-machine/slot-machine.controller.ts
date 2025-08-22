import {
  Controller,
  Get,
  Req,
  Version,
  Logger,
  HttpCode,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { API_VERSION_1 } from '@src/common/constants';
import { RequestWithSession } from '@src/common/types/request-with-session';
import { SlotMachineService } from '@src/slot-machine/slot-machine.service';
import { DataApiResponseDto } from '@src/common/dtos/data-api-response.dto';
import { SlotMachineResponse } from '@src/slot-machine/dtos/slot-machine.response';
import { InsufficientCreditsError, SessionDoesNotExistError } from '@src/slot-machine/errors';

@Controller('slot-machine')
export class SlotMachineController {
  private readonly logger = new Logger(SlotMachineController.name);

  constructor(private readonly slotMachineService: SlotMachineService) {}

  @Get('play')
  @Version(API_VERSION_1)
  @HttpCode(HttpStatus.OK)
  async play(@Req() request: RequestWithSession): Promise<DataApiResponseDto<SlotMachineResponse>> {
    try {
      /**
       * NOTE: We are certain that session exists at this point
       * due to the session middleware creating one for this route
       */
      const slots = await this.slotMachineService.play(request.session!.id);

      return {
        data: slots,
        success: true,
        message: 'Slots spun successfully.',
      };
    } catch (error) {
      if (error instanceof InsufficientCreditsError) {
        throw new BadRequestException({
          data: null,
          success: false,
          message: error.message,
        });
      }

      if (error instanceof SessionDoesNotExistError) {
        /**
         * Nevertheless, we still check if the session does not exist.
         * Naturally, this should never happen, but if it does,
         * we log and return a generic error message
         * to not to expose any sensitivities.
         */
        this.logger.error('Session middleware issue:', error);
        throw new InternalServerErrorException({
          data: null,
          success: false,
          message: 'Internal server error.',
        });
      }

      this.logger.error('Unexpected error:', error);
      throw new InternalServerErrorException({
        data: null,
        success: false,
        message: 'Internal server error.',
      });
    }
  }
}
