import { Outlet, Link } from "react-router-dom";


function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/clusters">Clusters</Link> | <Link to="/baremetal">Bare Metal</Link>
    </nav>
  );
}

export default Navigation
