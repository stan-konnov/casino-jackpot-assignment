import { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';

import { playSlotMachineRequest } from '@src/slot-machine/api';

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
    <div className="flex flex-row items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <table className="border border-gray-300">
          <tbody>
            <tr>
              {blocks.map((block, idx) => (
                <td key={idx} className="w-16 h-16 text-3xl text-center border border-gray-300">
                  {block}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleSpin}
          disabled={spinning}
        >
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold">Credits</span>
        <span className="text-2xl">{credits !== null ? credits : '-'}</span>
      </div>
    </div>
  );
};
