import React from 'react';
import Navigation from '../components/Navigation';
import ClusterOrderList from '../components/clusters/ClusterOrderList';
import ClusterOrderForm from '../components/clusters/ClusterOrderForm';

function Clusters() {
    return (
	<div>
	    <Navigation />
	    <h1>Cluster Orders</h1>
	    <ClusterOrderList />
	    <h2>Cluster Order Form</h2>
	    <ClusterOrderForm />
	</div>
    )
}

export default Clusters;
