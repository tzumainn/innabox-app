import { Link } from "react-router-dom";

function Navigation() {
    return (
	    <div className="navigation">
	    <nav>
	    <Link to="/">Home</Link> | <Link to="/clusters">Clusters</Link> | <Link to="/baremetal">Bare Metal</Link>
	    </nav>
	    </div>
    );
}

export default Navigation
