import { Outlet, useLocation } from "react-router-dom";
import Nav from "./nav";
import Posts from "./posts";
import VisitorMessage from "./visitorMessage";

function App() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <Outlet />
      {location.pathname === "/" && <VisitorMessage />}
      {location.pathname === "/" && <Posts />}
    </>
  );
}

export default App;