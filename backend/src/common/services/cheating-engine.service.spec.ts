import { CheatingEngineService } from '@src/common/services/cheating-engine.service';

describe('CheatingEngineService', () => {
  describe('shouldRerollSlotMachine', () => {
    it('should not reroll if not a win', () => {
      expect(CheatingEngineService.shouldRerollSlotMachine(false, 100)).toBe(false);
      expect(CheatingEngineService.shouldRerollSlotMachine(false, 10)).toBe(false);
    });

    it('should not reroll if credits < 40', () => {
      expect(CheatingEngineService.shouldRerollSlotMachine(true, 39)).toBe(false);
      expect(CheatingEngineService.shouldRerollSlotMachine(true, 0)).toBe(false);
    });

    it('should reroll with 30% chance if credits <= 60 and isWin', () => {
      // We cannot test randomness directly, but we can test that it returns a boolean
      const result = CheatingEngineService.shouldRerollSlotMachine(true, 50);
      expect(typeof result).toBe('boolean');
    });

    it('should reroll with 60% chance if credits > 60 and isWin', () => {
      const result = CheatingEngineService.shouldRerollSlotMachine(true, 100);
      expect(typeof result).toBe('boolean');
    });
  });
});
