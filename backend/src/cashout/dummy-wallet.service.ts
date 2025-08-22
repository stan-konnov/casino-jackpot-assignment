import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DummyWalletService {
  private logger = new Logger(DummyWalletService.name);

  async transferToUserWallet(amount: number): Promise<void> {
    this.logger.log(`Transferring ${amount} to user wallet.`);

    // Simulate communication with external transaction service
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
