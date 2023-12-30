import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';

const Base = () => {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Base;
