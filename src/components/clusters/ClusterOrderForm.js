import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

function ClusterOrderForm() {
    const [templateData, setTemplateData] = useState([]);
    const [templateLoading, setTemplateLoading] = useState(true);
    
    useEffect(() => {
	const fetchTemplateData = async () => {
	    try {
		const response = await fetch(process.env.REACT_APP_FULFILLMENT_API_URL + '/api/fulfillment/v1/cluster_templates', {
		    headers: {
			Authorization: "Bearer " + process.env.REACT_APP_FULFILLMENT_API_TOKEN,
		    },
		});
		const result = await response.json();
		const filteredResult = [...result.items.filter(template => template.metadata.deletionTimestamp === null)];
		setTemplateData(filteredResult);
		setTemplateLoading(false);
	    } catch (error) {
		console.error('Error fetching cluster templates:', error);
		setTemplateLoading(false);
	    }
	};
	
	fetchTemplateData();
    }, []);

    const [templateId, setTemplateId] = useState("");

    const [fulfillWorking, setFulfillWorking] = useState(false);
    const handleClusterOrderFulfillSubmit = (event) => {
	event.preventDefault();
	const clusterOrderInfo = {
	    spec: {
		templateId: templateId
	    }
	};
	try {
	    fetch(process.env.REACT_APP_FULFILLMENT_API_URL + '/api/fulfillment/v1/cluster_orders', {
		method: "POST",
		headers: {
		    "Content-Type": "application/json",
		    Authorization: "Bearer " + process.env.REACT_APP_FULFILLMENT_API_TOKEN,
		},
		body: JSON.stringify(clusterOrderInfo),
	    })
            setFulfillWorking(true);
	    setTemplateId("");
	    setTimeout(() => {
		setFulfillWorking(false);
	    }, 10000);
	} catch (error) {
            console.error('Error creating cluster order:', error);
	}
    };
    
    return (
	<div>
	    {(templateLoading) ? (
		<Loader text="Fetching available template information" />
	    ) : (
		<>
		    {fulfillWorking ? (
			<Loader text="Fulfilling cluster order" />
		    ) : (
			<form onSubmit={handleClusterOrderFulfillSubmit}>
			    <select name="templateId" onChange={(event) => setTemplateId(event.target.value)}>
				<option value="">Select a template</option>
				{templateData.map((template) => (
				    <option value={template.id}>
					{template.title}
				    </option>
				))}
			    </select>
			    <button>Create OpenShift Cluster Order</button>
			</form>
		    )}
		</>
	    )}
	</div>
    )
}

export default ClusterOrderForm;
