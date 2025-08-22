import { CashoutService } from '@src/cashout/cashout.service';
import { DatabaseService } from '@src/database/database.service';
import { DummyWalletService } from '@src/cashout/dummy-wallet.service';

describe('CashoutService', () => {
  let service: CashoutService;
  let databaseService: Partial<DatabaseService>;
  let dummyWalletService: Partial<DummyWalletService>;

  beforeEach(() => {
    databaseService = {
      session: {
        delete: jest.fn(),
      },
    } as unknown as DatabaseService;

    dummyWalletService = {
      transferToUserWallet: jest.fn().mockResolvedValue(undefined),
    };

    service = new CashoutService(
      databaseService as DatabaseService,
      dummyWalletService as DummyWalletService,
    );
  });

  it('should transfer credits and delete session', async () => {
    await service.cashout(100, 'session-id');
    expect(dummyWalletService.transferToUserWallet).toHaveBeenCalledWith(100);
    expect(databaseService.session!.delete).toHaveBeenCalledWith({ where: { id: 'session-id' } });
  });
});
