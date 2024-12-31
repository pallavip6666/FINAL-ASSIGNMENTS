import { Outlet, useLocation } from "react-router-dom";
import Nav from "./nav";
import VisitorMessage from "./visitorMessage";

function App() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <Outlet />
      {location.pathname === "/" && <VisitorMessage />}
    </>
  );
}

export default App;