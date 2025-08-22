import { SlotMachineController } from '@src/slot-machine/slot-machine.controller';
import { SlotMachineService } from '@src/slot-machine/slot-machine.service';
import { RequestWithSession } from '@src/common/types/request-with-session';

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
    expect(result.data).toHaveProperty('slots');
    expect(result.data).toHaveProperty('credits');
  });

  // Should never happen, but never hurts to double check
  it('should return error if session is missing', async () => {
    const req = { session: undefined } as unknown as RequestWithSession;
    await expect(controller.play(req)).rejects.toThrow();
  });
});
