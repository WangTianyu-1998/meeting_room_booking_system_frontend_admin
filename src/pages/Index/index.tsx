import React, { type FC } from "react";
import { Outlet } from "react-router-dom";
const Index: FC = () => {
  return (
    <div>
      Index
      <Outlet />
    </div>
  );
};
export default Index;
