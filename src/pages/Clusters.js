import React from 'react';
import ClusterOrderList from '../components/clusters/ClusterOrderList';
import ClusterOrderForm from '../components/clusters/ClusterOrderForm';

function Clusters() {
    return (
	<>
	    <div className="body">
  		<div className="form" align="center">
		    <ClusterOrderForm />
		</div>
		<ClusterOrderList />
	    </div>
	</>
    )
}

export default Clusters;
