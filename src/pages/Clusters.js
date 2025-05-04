import React from 'react';
import Header from '../components/Header';
import ClusterOrderList from '../components/clusters/ClusterOrderList';
import ClusterOrderForm from '../components/clusters/ClusterOrderForm';

function Clusters() {
    return (
	<>
	    <Header />
	    <div class="body">
		<div class="form">
		    <h2>Cluster Order Form</h2>
		    <ClusterOrderForm />
		</div>
		<ClusterOrderList />
	    </div>
	</>
    )
}

export default Clusters;
