import { Outlet } from 'react-router-dom';

export function Base() {
  return (
    <div className="mx-auto h-screen min-h-screen w-full">
      <Outlet />
    </div>
  );
}
