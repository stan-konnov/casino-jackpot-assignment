import { SlotMachineService } from '@src/slot-machine/slot-machine.service';
import { DatabaseService } from '@src/database/database.service';

describe('SlotMachineService', () => {
  let service: SlotMachineService;
  let databaseService: Partial<DatabaseService>;

  beforeEach(() => {
    databaseService = {
      session: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as DatabaseService;

    service = new SlotMachineService(databaseService as DatabaseService);
  });

  it('should throw if session does not exist', async () => {
    (databaseService.session!.findFirst as jest.Mock).mockResolvedValue(null);
    await expect(service.play('session-id')).rejects.toThrow();
  });

  it('should throw if credits are zero', async () => {
    (databaseService.session!.findFirst as jest.Mock).mockResolvedValue({ credits: 0 });
    await expect(service.play('session-id')).rejects.toThrow();
  });

  it('should return slots and credits for valid session', async () => {
    (databaseService.session!.findFirst as jest.Mock).mockResolvedValue({
      id: 'session-id',
      credits: 10,
    });

    (databaseService.session!.update as jest.Mock).mockResolvedValue({});
    const result = await service.play('session-id');

    expect(result).toHaveProperty('slots');
    expect(Array.isArray(result.slots)).toBe(true);
    expect(result).toHaveProperty('credits');
    expect(typeof result.credits).toBe('number');
  });
});
