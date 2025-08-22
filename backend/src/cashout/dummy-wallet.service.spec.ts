import { DummyWalletService } from '@src/cashout/dummy-wallet.service';

describe('DummyWalletService', () => {
  let service: DummyWalletService;

  beforeEach(() => {
    service = new DummyWalletService();
  });

  it('should resolve transferToUserWallet', async () => {
    await expect(service.transferToUserWallet(100)).resolves.toBeUndefined();
  });
});
