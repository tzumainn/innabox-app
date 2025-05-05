import React, { useState, useEffect } from 'react';

function BareMetalList() {
  const [bareMetalData, setBareMetalData] = useState([]);
  const [bareMetalLoading, setBareMetalLoading] = useState(true);

  useEffect(() => {
    const fetchBareMetalData = async () => {
	try {
            const response = await fetch(process.env.REACT_APP_ESI_API_URL + '/api/v1/nodes/list');
            const result = await response.json();
            setBareMetalData(result);
            setBareMetalLoading(false);
	} catch (error) {
            console.error('Error fetching bare metal data:', error);
	    setBareMetalLoading(false);
	}
    };

      fetchBareMetalData();
      const bareMetalIntervalId = setInterval(fetchBareMetalData, 60000);

      return () => clearInterval(bareMetalIntervalId)
  }, []);

    return (
	<div>
	    {bareMetalLoading ? (
		<p>Fetching leased nodes...</p>
	    ) : (
		<table className="list">
		    <thead>
			<tr className="listitem">
			    <th>Name</th>
			    <th>Resource Class</th>
			    <th>Provision State</th>
			    <th>Power State</th>
			    <th>Network Info</th>
			</tr>
		    </thead>
		    <tbody>
			{bareMetalData.map((bareMetal) => (
			    <tr className="listitem">
				<td>{bareMetal.node.name}</td>
				<td>{bareMetal.node.resource_class}</td>
				<td>{bareMetal.node.provision_state}</td>
				<td>{bareMetal.node.power_state}</td>
				<td>{bareMetal.network_info}</td>
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	</div>
    )
}

export default BareMetalList;
