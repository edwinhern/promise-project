import { Outlet } from 'react-router-dom';

const Base = () => {
  return (
    <div className="h-screen">
      {/* Navbar to change background colors or themes */}
      <Outlet />
    </div>
  );
};

export default Base;
