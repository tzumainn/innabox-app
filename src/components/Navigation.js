import React from 'react';
import { Link } from "react-router-dom";

function Navigation() {
    return (
	<div className="navigation">
	    <nav>
		<Link className="navigationlink" to="/">Home</Link>
		<Link className="navigationlink" to="/clusters">OpenShift Clusters</Link>
		<Link className="navigationlink" to="/baremetal">Bare Metal</Link>
	    </nav>
	</div>
    );
}

export default Navigation
