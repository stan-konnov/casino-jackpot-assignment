import { SlotMachineController } from '@src/slot-machine/slot-machine.controller';
import { SlotMachineService } from '@src/slot-machine/slot-machine.service';
import { RequestWithSession } from '@src/common/types/request-with-session';
import { InsufficientCreditsError } from '@src/slot-machine/errors';

describe('SlotMachineController', () => {
  let controller: SlotMachineController;
  let slotMachineService: Partial<SlotMachineService>;

  beforeEach(() => {
    slotMachineService = {
      play: jest.fn().mockResolvedValue({ slots: ['A', 'A', 'A'], credits: 10 }),
    };

    controller = new SlotMachineController(slotMachineService as SlotMachineService);
  });

  it('should return slot machine response for valid session', async () => {
    const req = { session: { id: 'session-id' } } as RequestWithSession;
    const result = await controller.play(req);

    expect(slotMachineService.play).toHaveBeenCalledWith('session-id');
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ slots: ['A', 'A', 'A'], credits: 10 });
  });

  it('should return BadRequestException for insufficient credits', async () => {
    const sessionId = 'session-id';

    slotMachineService.play = jest.fn().mockImplementation(() => {
      throw new InsufficientCreditsError(`Session with ID ${sessionId} has insufficient credits.`);
    });

    const req = { session: { id: sessionId } } as RequestWithSession;

    await expect(controller.play(req)).rejects.toMatchObject({
      response: {
        data: null,
        success: false,
        message: `Session with ID ${sessionId} has insufficient credits.`,
      },
      status: 400,
    });
  });
});
