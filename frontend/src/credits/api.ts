import { api } from '@src/api/axios';
import { DataApiResponseDto } from '@src/common/dtos/data.api.response';

enum CreditsApiRoutes {
  // eslint-disable-next-line no-unused-vars
  CREDITS = '/credits',
}

export const creditsRequest = async (): Promise<DataApiResponseDto<number>> => {
  return (await api.get(CreditsApiRoutes.CREDITS)) as DataApiResponseDto<number>;
};
