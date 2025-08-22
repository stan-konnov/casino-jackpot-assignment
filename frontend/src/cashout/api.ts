import { api } from '@src/api/axios';
import { BaseApiResponseDto } from '@src/common/dtos/base.api.response';

enum CashoutApiRoutes {
  // eslint-disable-next-line no-unused-vars
  CASHOUT = '/cashout',
}

export const cashoutRequest = async (): Promise<BaseApiResponseDto> => {
  return (await api.get(CashoutApiRoutes.CASHOUT)) as BaseApiResponseDto;
};
