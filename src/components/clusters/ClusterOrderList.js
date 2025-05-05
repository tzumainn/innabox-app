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
		<table className="list">
		    <thead>
			<tr className="itemhead">
			    <th w className="itemcell">ID</th>
			    <th className="itemcell">Template</th>
			    <th className="itemcell">Status</th>
			    <th className="itemcell">Cluster ID</th>			    
			</tr>
		    </thead>
		    <tbody>
			{clusterOrderData.items.map((clusterOrder) => (
			    <tr className="itemrow">
				<td className="itemcell">{clusterOrder.id}</td>
				<td className="itemcell">{clusterOrder.spec.templateId}</td>
				<td className="itemcell">{clusterOrder.spec.state}</td>
				<td className="itemcell">{clusterOrder.status.clusterId}</td>				
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	</div>
    )
}

export default ClusterOrderList;
