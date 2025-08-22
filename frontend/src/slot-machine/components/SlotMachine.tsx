import { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';

import { playSlotMachineRequest } from '@src/slot-machine/api';

import '@src/slot-machine/styles/index.css';

export const SlotMachine = (): ReactElement => {
  const INITIAL_BLOCKS = ['X', 'X', 'X'];

  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  const handleSpin = async (): Promise<void> => {
    setSpinning(true);
    setBlocks(INITIAL_BLOCKS);

    try {
      const { data } = await playSlotMachineRequest();

      setCredits(data?.credits!);

      setTimeout(() => setBlocks([data?.slots[0]!, 'X', 'X']), 1000);

      setTimeout(() => setBlocks([data?.slots[0]!, data?.slots[1]!, 'X']), 2000);

      setTimeout(() => {
        setBlocks([data?.slots[0]!, data?.slots[1]!, data?.slots[2]!]);
        setSpinning(false);
      }, 3000);
    } catch (error) {
      setSpinning(false);
      toast.error(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="slot-machine-container">
      <table className="slot-machine-table">
        <tbody>
          <tr>
            {blocks.map((block, idx) => (
              <td key={idx} className="slot-machine-block">
                {block}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <button className="slot-machine-spin-btn" onClick={handleSpin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
      <div className="slot-machine-credits-label">Remaining Credits</div>
      <div className="slot-machine-credits">{credits !== null ? credits : '-'}</div>
    </div>
  );
};
