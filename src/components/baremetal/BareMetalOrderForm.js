import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

function BareMetalOrderForm() {
  const [offerData, setOfferData] = useState([]);
  const [offerLoading, setOfferLoading] = useState(true);

  useEffect(() => {
      const fetchOfferData = async () => {
	  try {
              const response = await fetch(process.env.REACT_APP_ESI_API_URL + '/api/v1/offers/list');
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
              const response = await fetch(process.env.REACT_APP_ESI_API_URL + '/api/v1/networks/list');
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
    const [imageId, setImageId] = useState("");
    const [sshKey, setSSHKey] = useState("");

    const [fulfillWorking, setFulfillWorking] = useState(false);
    const handleBareMetalOrderFulfillSubmit = (event) => {
	event.preventDefault();
	const bareMetalOrderInfo = {
	    order_id: "1",
	    network_id: networkId,
	    nodes: Array.from(nodes).map((node) => ({resource_class: node[0], number: parseInt(node[1], 10)})),
	};
	if (imageId.trim() !== "") {
	    bareMetalOrderInfo['image'] = imageId;
	}
	if (sshKey.trim() !== "") {
	    bareMetalOrderInfo['ssh_keys'] = [sshKey];
	}

	try {
	    fetch(process.env.REACT_APP_ESI_API_URL + '/api/v1/baremetal-order/fulfill', {
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

    const imageData = ['centos9-stream', 'fedora40', 'ubuntu-22.04']

    return (
	<div>
	    {(offerLoading || networkLoading) ? (
		<Loader text="Fetching available node information" />
	    ) : (
		<>
		<table className="list">
		    <thead>
			<tr className="itemhead">
			    <th className="itemcell">Resource Class</th>
			    <th className="itemcell">Number Available</th>
			</tr>
		    </thead>
		    <tbody>
			{offerData.map((offer) => (
			    <tr className="itemrow">
				<td className="itemcell">{offer.resource_class}</td>
				<td className="itemcell">{offer.count}</td>
			    </tr>
			))}
		    </tbody>
		</table>
		    {fulfillWorking ? (
			<Loader text="Fulfilling bare metal order" />
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
			    <select name="networkId" onChange={(event) => setNetworkId(event.target.value)}>
				<option value="">Select a network</option>
				{networkData.map((network) => (
				    <option value={network.id}>
					{network.name}
				    </option>
				))}
			    </select>
			    <select name="imageId" onChange={(event) => setImageId(event.target.value)}>
				<option value="">(Optional) Select an image</option>
				{imageData.map((image) => (
				    <option value={image}>
					{image}
				    </option>
				))}
			    </select>
			    <textarea
				name="sshKey"
				placeholder="(Optional) SSH key if provisioning with an image"
				rows="5"
				cols="50"
				onChange={(event => setSSHKey(event.target.value))}
			    />
			    <button>Create Bare Metal Order</button>
			</form>
		    )}
		</>
	    )}
	</div>
    )
}

export default BareMetalOrderForm;
