import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default MainLayout;
