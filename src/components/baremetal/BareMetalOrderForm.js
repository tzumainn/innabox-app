import React, { useState, useEffect } from 'react';

function BareMetalOrderForm() {
  const [offerData, setOfferData] = useState([]);
  const [offerLoading, setOfferLoading] = useState(true);

  useEffect(() => {
      const fetchOfferData = async () => {
	  try {
              const response = await fetch('http://localhost:8081/api/v1/offers/list');
              const result = await response.json();
              setOfferData(result);
              setOfferLoading(false);
	  } catch (error) {
              console.error('Error fetching offer data:', error);
	      setOfferLoading(false);
	  }
      };

      fetchOfferData();
      const offerIntervalId = setInterval(fetchOfferData, 60000);

      return () => clearInterval(offerIntervalId)
  }, []);

  const [networkData, setNetworkData] = useState([]);
  const [networkLoading, setNetworkLoading] = useState(true);

  useEffect(() => {
      const fetchNetworkData = async () => {
	  try {
              const response = await fetch('http://localhost:8081/api/v1/networks/list');
              const result = await response.json();
              setNetworkData(result);
              setNetworkLoading(false);
	  } catch (error) {
              console.error('Error fetching network data:', error);
	      setNetworkLoading(false);
	  }
      };

      fetchNetworkData();
  }, []);

    const [networkId, setNetworkId] = useState("");
    const [nodes, setNodes] = useState(new Map());

    const [fulfillWorking, setFulfillWorking] = useState(false);
    const handleBareMetalOrderFulfillSubmit = (event) => {
	event.preventDefault();
	const bareMetalOrderInfo = {
	    order_id: "1",
	    network_id: networkId,
	    nodes: Array.from(nodes).map((node) => ({resource_class: node[0], number: parseInt(node[1], 10)}))
	};
	try {
	    fetch('http://localhost:8081/api/v1/baremetal-order/fulfill', {
		method: "POST",
		headers: {
		    "Content-Type": "application/json",
		},
		body: JSON.stringify(bareMetalOrderInfo),
	    })
            setFulfillWorking(true);
	    setTimeout(() => {
		setFulfillWorking(false);
	    }, 120000);
	  } catch (error) {
              console.error('Error creating bare metal order:', error);
	  }
    };
    
    return (
	<div>
	    {offerLoading ? (
		<p>Fetching available nodes...</p>
	    ) : (
		<table>
		    <thead>
			<tr>
			    <th>Resource Class</th>
			    <th>Number Available</th>
			</tr>
		    </thead>
		    <tbody>
			{offerData.map((offer) => (
			    <tr>
				<td>{offer.resource_class}</td>
				<td>{offer.count}</td>
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	    {(networkLoading) || (offerLoading) ? (
		<p>Fetching available node information...</p>
	    ) : (
		<>
		    {fulfillWorking ? (
			<p>Fulfilling Bare Metal Order...</p>
		    ) : (
			<form onSubmit={handleBareMetalOrderFulfillSubmit}>
			    {offerData.map((offer) => (
				<input
				    type="number"
				    placeholder={offer.resource_class}
				    id={offer.resource_class}
				    name={offer.resource_class}
				    default="0"
				    min="0"
				    max={offer.count}
				    onChange={(event) => nodes.set(offer.resource_class, event.target.value)}
				/>
			    ))}
			    <select name="networkId" value={networkId} onChange={(event) => setNetworkId(event.target.value)}>
				<option value="">Select a network</option>
				{networkData.map((network) => (
				    <option value={network.id}>
					{network.name}
				    </option>
				))}
			    </select>
			    <button>Create Bare Metal Order</button>
			</form>
		    )}
		</>
	    )}
	</div>
    )
}

export default BareMetalOrderForm;
