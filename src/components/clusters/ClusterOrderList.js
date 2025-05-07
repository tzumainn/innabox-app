import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

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
		const sortedResult = [...result.items];
		sortedResult.sort((a, b) => (a.metadata.creationTimestamp > b.metadata.creationTimestamp) ? -1 : 1);
		setClusterOrderData(sortedResult);
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
		<Loader text="Fetching cluster orders" />
	    ) : (
		<table className="list" width="1000">
		    <thead>
			<tr className="itemhead">
			    <th className="itemcell">ID</th>
			    <th className="itemcell">Template</th>
			    <th className="itemcell">Status</th>
			    <th className="itemcell">Cluster ID</th>			    
			</tr>
		    </thead>
		    <tbody>
			{clusterOrderData.map((clusterOrder) => (
			    <tr className="itemrow">
				<td className="itemcell">{clusterOrder.id}</td>
				<td className="itemcell">{clusterOrder.spec.templateId}</td>
				<td className="itemcell">{clusterOrder.status?.state}</td>
				<td className="itemcell">{clusterOrder.status?.clusterId}</td>
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	</div>
    )
}

export default ClusterOrderList;
