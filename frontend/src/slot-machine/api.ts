/* eslint-disable no-unused-vars */

import { api } from '@src/api/axios';
import { DataApiResponseDto } from '@src/common/dtos/data.api.response';
import { SlotMachineResponse } from '@src/slot-machine/dtos/slot-machine.response';

const SLOT_MACHINE_API_BASE_URL = '/slot-machine';

enum SlotMachineApiRoutes {
  PLAY = `${SLOT_MACHINE_API_BASE_URL}/play`,
}

export const playSlotMachineRequest = async (): Promise<
  DataApiResponseDto<SlotMachineResponse>
> => {
  return (await api.get(SlotMachineApiRoutes.PLAY)) as DataApiResponseDto<SlotMachineResponse>;
};
