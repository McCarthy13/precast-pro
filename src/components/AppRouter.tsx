
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FreshConcreteTestFormPage from '@/pages/FreshConcreteTestFormPage';
import MoistureTestForm from '@/components/templates/MoistureTestForm';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/templates/fresh-concrete-test" element={<FreshConcreteTestFormPage />} />
      <Route path="/templates/moisture-test" element={<MoistureTestForm />} />
    </Routes>
  );
};

export default AppRouter;
