import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

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
		<Loader text="Fetching leased nodes" />
	    ) : (
		<table className="list">
		    <thead>
			<tr className="itemhead">
			    <th className="itemcell">Name</th>
			    <th className="itemcell">Resource Class</th>
			    <th className="itemcell">Provision State</th>
			    <th className="itemcell">Power State</th>
			    <th className="itemcell">Network Info</th>
			</tr>
		    </thead>
		    <tbody>
			{bareMetalData.map((bareMetal) => (
			    <tr className="itemrow">
				<td className="itemcell">{bareMetal.node.name}</td>
				<td className="itemcell">{bareMetal.node.resource_class}</td>
				<td className="itemcell">{bareMetal.node.provision_state}</td>
				<td className="itemcell">{bareMetal.node.power_state}</td>
				<td className="itemcell">{bareMetal.network_info}</td>
			    </tr>
			))}
		    </tbody>
		</table>
	    )}
	</div>
    )
}

export default BareMetalList;
