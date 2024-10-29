import { Outlet, Link } from "react-router-dom";
import "../src/App.css";

const Layout = () => {
  return (
    <>
      <nav>
        {/* ... */}
        <Link to="/">Home</Link>
        {/* ... */}
      </nav>
      <Outlet /> {/* Where the child routes are rendered */}
    </>
  );
};

export default Layout;
