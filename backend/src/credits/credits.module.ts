import { Module } from '@nestjs/common';

import { CreditsController } from '@src/credits/credits.controller';

@Module({
  controllers: [CreditsController],
})
export class CreditsModule {}
