import { Outlet, Link } from "react-router-dom";

function Header() {
    return (
	    <>
	    <div class="header">
	    <h1>Innabox</h1>
	    </div>
	    <div class="navigation">
	    <nav>
	    <Link to="/">Home</Link> | <Link to="/clusters">Clusters</Link> | <Link to="/baremetal">Bare Metal</Link>
	    </nav>
	    </div>
	    </>
    );
}

export default Header
