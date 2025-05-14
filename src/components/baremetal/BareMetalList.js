import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from '../Loader';

function BareMetalList() {
  const [bareMetalData, setBareMetalData] = useState([]);
  const [bareMetalLoading, setBareMetalLoading] = useState(true);

  useEffect(() => {
    const fetchBareMetalData = async () => {
	try {
            const response = await fetch(process.env.REACT_APP_ESI_API_URL + '/api/v1/nodes/list');
            const result = await response.json();
	    const sortedResult = [...result];
	    sortedResult.sort((a, b) => (a.lease_info[0].start_time > b.lease_info[0].start_time) ? -1 : 1);
            setBareMetalData(sortedResult);
            setBareMetalLoading(false);
	} catch (error) {
            console.error('Error fetching bare metal data:', error);
	    setBareMetalLoading(false);
	}
    };

      fetchBareMetalData();
      const bareMetalIntervalId = setInterval(fetchBareMetalData, 15000);

      return () => clearInterval(bareMetalIntervalId)
  }, []);

    const [nodeExpanded, setNodeExpanded] = useState([]);

    return (
	<div>
	    {bareMetalLoading ? (
		<Loader text="Fetching leased nodes" />
	    ) : (
		<table className="list" width="1050">
		    <thead>
			<tr className="itemhead">
			    <td className="itemcell"></td>
			    <th className="itemcell">Bare Metal Machine</th>
			    <th className="itemcell">Resource Class</th>
			    <th className="itemcell">Provision State</th>
			    <th className="itemcell">Power State</th>
			    <th className="itemcell">Lease Date</th>
			</tr>
		    </thead>
		    {bareMetalData.map((bareMetal) => (
			<tbody>
			    <tr className="itemrow">
				<td className="itemcell" width="10">
				    { nodeExpanded.includes(bareMetal.node.uuid) ? (
					<Link
					    className="expandedlink"
					    onClick={() => setNodeExpanded(nodeExpanded.filter(uuid => uuid !== bareMetal.node.uuid))}>
					    -
					</Link>
				    ) : (
					<Link
					    className="expandedlink"
					    onClick={() => setNodeExpanded(nodeExpanded => [...nodeExpanded, bareMetal.node.uuid])}>
					    +
					</Link>
				    )}
				</td>
				<td className="itemcell" width="250">{bareMetal.node.name}</td>
				<td className="itemcell" width="150">{bareMetal.node.resource_class}</td>
				<td className="itemcell" width="150">{bareMetal.node.provision_state}</td>
				<td className="itemcell" width="125">{bareMetal.node.power_state}</td>
				<td className="itemcell" width="365">{new Date(bareMetal.lease_info[0]?.start_time).toUTCString()}</td>
			    </tr>
			    { (nodeExpanded.includes(bareMetal.node.uuid)) &&
			      <tr className="subitemrow">
				  <td></td>
			    	  <td className="itemcell" colSpan="2">
				      <table>
					  <tbody>
					      {Object.keys(bareMetal.node.properties).map((key, index) => (
						  <tr>
						      <td className="subitemcell"><b>{key}</b></td>
						      <td className="subitemcell">{JSON.stringify(bareMetal.node.properties[key])}</td>
						  </tr>
					      ))}
					  </tbody>
				      </table>
				  </td>
				  <td className="itemcell" colSpan="3">
				      <table>
					  <thead>
					      <tr>
						  <th className="subitemcell">Port</th>
						  <th className="subitemcell">Network</th>
						  <th className="subitemcell">Fixed IP</th>
						  <th className="subitemcell">Floating IP</th>
					      </tr>
					  </thead>
					  <tbody>
					      {bareMetal.network_info.map(network => (
						  <tr>
						      <td className="subitemcell">
							  {network.mac_address}
						      </td>
						      <td className="subitemcell">
							  {(network.network) &&
							   <>{network.network + '(' + network.provider_segmentation_id + ')'}</>
							  }
						      </td>
						       <td className="subitemcell">
							   {(network.fixed_ip) &&
							    <>{network.fixed_ip}</>
							   }
						       </td>
						       <td className="subitemcell">
							   {(network.floating_ip) &&
							    <>{network.floating_ip}</>
							   }
						       </td>
						  </tr>
					      ))}
					  </tbody>
				      </table>
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

export default BareMetalList;
