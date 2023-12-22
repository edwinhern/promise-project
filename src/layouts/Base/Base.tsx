import { Outlet } from "react-router-dom";

export function Base() {
  return (
    <div className="mx-auto min-h-screen">
      <Outlet />
    </div>
  );
}
