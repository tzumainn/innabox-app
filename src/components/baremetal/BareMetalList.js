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

    const [nodeExpanded, setNodeExpanded] = useState([]);

    return (
	<div>
	    {bareMetalLoading ? (
		<Loader text="Fetching leased nodes" />
	    ) : (
		<table className="list">
		    <thead>
			<tr className="itemhead">
			    <td className="itemcell"></td>
			    <th className="itemcell">Name</th>
			    <th className="itemcell">Resource Class</th>
			    <th className="itemcell">Provision State</th>
			    <th className="itemcell">Power State</th>
			</tr>
		    </thead>
		    {bareMetalData.map((bareMetal) => (
			<tbody>
			    <tr className="itemrow">
				<td className="itemcell">
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
				<td className="itemcell">{bareMetal.node.name}</td>
				<td className="itemcell">{bareMetal.node.resource_class}</td>
				<td className="itemcell">{bareMetal.node.provision_state}</td>
				<td className="itemcell">{bareMetal.node.power_state}</td>
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
			    	  <td className="itemcell" colSpan="2">
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
							  {network.baremetal_port.address}
						      </td>
						      <td className="subitemcell">
							  {(network.network) &&
							   <>{network.network.name + '(' + network.network.provider_segmentation_id + ')'}</>
							  }
						      </td>
						       <td className="subitemcell">
							   {(network.network_ports[0]?.fixed_ips.length > 0) &&
							    <>{network.network_ports[0].fixed_ips[0].ip_address}</>
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
