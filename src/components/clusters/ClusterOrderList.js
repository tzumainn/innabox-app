import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
		const sortedResult = [...result.items.filter(order => order.metadata.deletionTimestamp === null)];
		sortedResult.sort((a, b) => (a.metadata.creationTimestamp > b.metadata.creationTimestamp) ? -1 : 1);
		setClusterOrderData(sortedResult);
		setClusterOrderLoading(false);
	    } catch (error) {
		console.error('Error fetching cluster order data:', error);
		setClusterOrderLoading(false);
	    }
	};
	
	fetchClusterOrderData();
	const clusterOrderIntervalId = setInterval(fetchClusterOrderData, 15000);
	
	return () => clearInterval(clusterOrderIntervalId)
    }, []);

    const [clusterOrderExpanded, setClusterOrderExpanded] = useState([]);

    return (
	<div>
	    {clusterOrderLoading ? (
		<Loader text="Fetching cluster orders" />
	    ) : (
		<table className="list" width="1050">
		    <thead>
			<tr className="itemhead">
			    <td className="itemcell"></td>
			    <th className="itemcell">OpenShift Cluster Order ID</th>
			    <th className="itemcell">Template</th>
			    <th className="itemcell">Status</th>
			    <th className="itemcell">Created</th>
			</tr>
		    </thead>
		    {clusterOrderData.map((clusterOrder) => (
			<tbody>
			    <tr className="itemrow">
				<td className="itemcell" width="10">
				    { !(clusterOrder.status?.clusterId)
				      ? <></>
				      : <>
					    { clusterOrderExpanded.includes(clusterOrder.id) ? (
						<Link
						    className="expandedlink"
						    onClick={() => setClusterOrderExpanded(clusterOrderExpanded.filter(id => id !== clusterOrder.id))}>
						    -
						</Link>
					    ) : (
						<Link
						    className="expandedlink"
						    onClick={() => setClusterOrderExpanded(clusterOrderExpanded => [...clusterOrderExpanded, clusterOrder.id])}>
						    +
						</Link>
					    )}
					</>
				    }
				</td>
				<td className="itemcell" width="425">{clusterOrder.id}</td>
				<td className="itemcell" width="125">{clusterOrder.spec.templateId}</td>
				<td className="itemcell" width="125">{clusterOrder.status?.state.replace("CLUSTER_ORDER_STATE_","")}</td>
				<td className="itemcell" width="365">{new Date(clusterOrder.metadata?.creationTimestamp).toUTCString()}</td>
			    </tr>
			    { (clusterOrderExpanded.includes(clusterOrder.id)) &&
			      <tr className="subitemrow">
				  <td></td>
				  <td className="itemcell" colSpan="2">
				      CONSOLE URL PLACEHOLDER
				  </td>
				  <td className="itemcell" colSpan="2">
				      KUBECONFIG PLACEHOLDER
				  </td>
			      </tr>
			    }
			</tbody>
		    ))}
		</table>
	    )}
	</div>
    )
}

export default ClusterOrderList;
