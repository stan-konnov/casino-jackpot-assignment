import { CreditsController } from './credits.controller';
import { RequestWithSession } from '@src/common/types/request-with-session';

describe('CreditsController', () => {
  let controller: CreditsController;

  beforeEach(() => {
    controller = new CreditsController();
  });

  it('should return credits from session', () => {
    const req = { session: { credits: 42 } } as RequestWithSession;
    const result = controller.getCredits(req);
    expect(result.success).toBe(true);
    expect(result.data).toBe(42);
    expect(result.message).toBe('Available credits.');
  });

  it('should return 0 credits if session is missing', () => {
    const req = { session: undefined } as unknown as RequestWithSession;
    const result = controller.getCredits(req);
    expect(result.success).toBe(true);
    expect(result.data).toBe(null);
    expect(result.message).toBe('Available credits.');
  });
});
