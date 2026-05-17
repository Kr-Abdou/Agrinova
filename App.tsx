import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Sensors from './components/Sensors';
import SensorDetail from './components/SensorDetail';
import Analysis from './components/Analysis';
import CropRecommendations from './components/CropRecommendations';
import Nutrients from './components/Nutrients';
import Disease from './components/Disease';
import Yield from './components/Yield';
import Reports from './components/Reports';
import Settings from './components/Settings';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="sensors/:id" element={<SensorDetail />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="crops" element={<CropRecommendations />} />
          <Route path="nutrients" element={<Nutrients />} />
          <Route path="diseases" element={<Disease />} />
          <Route path="yield" element={<Yield />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
