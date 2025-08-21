import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
3
import { SlotMachinePage } from '@src/pages/SlotMachinePage';
import { AppRoutes } from '@src/common/routes';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.ROOT} element={<Navigate to={AppRoutes.SLOT_MACHINE} replace />} />
        <Route path={AppRoutes.SLOT_MACHINE} element={<SlotMachinePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
