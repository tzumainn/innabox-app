import React, { useState, useEffect } from 'react';

function ClusterOrderList() {
    const [clusterOrderData, setClusterOrderData] = useState([]);
    const [clusterOrderLoading, setClusterOrderLoading] = useState(true);
    
    useEffect(() => {
	const fetchClusterOrderData = async () => {
	    try {
		const response = await fetch(process.env.REACT_APP_FULFILLMENT_API_URL + '/api/fulfillment/v1/cluster_orders', {
		    headers: {
			Authorization: "Bearer " + process.env.REACT_APP_FULFILLMENT_API_TOKEN,
		    },
		});
		const result = await response.json();
		setClusterOrderData(result);
		setClusterOrderLoading(false);
	    } catch (error) {
		console.error('Error fetching cluster order data:', error);
		setClusterOrderData([{
		    id: "test-uuid",
		    spec: {templateId: "test-template", state: "depressed"},
		    status: {clusterId: "blah-blah-blah"}
		}])
		setClusterOrderLoading(false);
	    }
	};
	
	fetchClusterOrderData();
	const clusterOrderIntervalId = setInterval(fetchClusterOrderData, 60000);
	
	return () => clearInterval(clusterOrderIntervalId)
    }, []);
    
    return (
	<div>
	    {clusterOrderLoading ? (
		<p>Fetching cluster orders...</p>
	    ) : (
		<table class="list">
		    <thead>
			<tr>
			    <th>ID</th>
			    <th>Template</th>
			    <th>Status</th>
			    <th>Cluster ID</th>			    
			</tr>
		    </thead>
		    <tbody>
			{clusterOrderData.map((clusterOrder) => (
			    <tr class="listitem">
				<td>{clusterOrder.id}</td>
				<td>{clusterOrder.spec.templateId}</td>
				<td>{clusterOrder.spec.state}</td>
				<td>{clusterOrder.status.clusterId}</td>				
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	</div>
    )
}

export default ClusterOrderList;
