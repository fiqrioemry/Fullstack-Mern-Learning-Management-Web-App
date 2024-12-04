import Header from "./Header";
import { Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div>
      <Header /> :
      <Outlet />
    </div>
  );
}

export default PageLayout;
