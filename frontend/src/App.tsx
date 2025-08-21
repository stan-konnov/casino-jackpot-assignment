import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SlotMachinePage } from '@src/pages/SlotMachinePage';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/slot-machine" replace />} />
        <Route path="/slot-machine" element={<SlotMachinePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
