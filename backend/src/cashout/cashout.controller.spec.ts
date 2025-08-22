import { CashoutController } from '@src/cashout/cashout.controller';
import { CashoutService } from '@src/cashout/cashout.service';
import { RequestWithSession } from '@src/common/types/request-with-session';

describe('CashoutController', () => {
  let controller: CashoutController;
  let cashoutService: Partial<CashoutService>;

  beforeEach(() => {
    cashoutService = {
      cashout: jest.fn().mockResolvedValue(undefined),
    };
    controller = new CashoutController(cashoutService as CashoutService);
  });

  it('should cashout and return success', async () => {
    const req = { session: { credits: 100, id: 'session-id' } } as RequestWithSession;
    const result = await controller.cashout(req);
    expect(cashoutService.cashout).toHaveBeenCalledWith(100, 'session-id');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully cashed out the credits.');
  });

  it('should return success with message if session is missing', async () => {
    const req = { session: undefined } as unknown as RequestWithSession;
    const result = await controller.cashout(req);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Cashout already happened or session does not exist.');
  });
});
