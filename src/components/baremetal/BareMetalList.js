import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from '../Loader';

function BareMetalList() {
  const [bareMetalData, setBareMetalData] = useState([]);
  const [bareMetalLoading, setBareMetalLoading] = useState(true);

  useEffect(() => {
    const fetchBareMetalData = async () => {
	try {
            //const response = await fetch(process.env.REACT_APP_ESI_API_URL + '/api/v1/nodes/list');
            //const result = await response.json();
	    //const sortedResult = [...result];
	    //sortedResult.sort((a, b) => (a.lease_info[0].start_time > b.lease_info[0].start_time) ? -1 : 1);
	    const result = [
		{"lease_info":[{"end_time":"2025-05-15T04:19:41.574483","expire_time":null,"fulfill_time":"2025-05-14T04:19:48.351314","id":"3b5222ba-4fa3-40ab-b2b1-682860c12a76","location":{"cloud":"openstack","project":{"domain_id":null,"domain_name":null,"id":"14e4c3e738674568ad8098dae998fac7","name":null},"region_name":"regionOne","zone":null},"name":null,"node_type":"ironic_node","offer_uuid":"4fd01dd7-6147-4668-b412-b4c75241ed41","owner":"admin","owner_id":"ce54871194264a1dafd508058c0b8614","parent_lease_uuid":null,"project":"uitest","project_id":"14e4c3e738674568ad8098dae998fac7","properties":{},"purpose":null,"resource_class":"fc430","resource_name":"MOC-R4PAC22U33-S1D","resource_properties":{"cpu_arch":"x86_64","cpu_frequency":"3400.0000","cpu_model_name":"Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz","cpus":"40","local_gb":"185","memory_mb":"131072","vendor":"dell inc"},"resource_uuid":"b277a887-54e9-471d-8a5d-34256a0d4c18","start_time":"2025-05-14T04:19:41.574483","status":"active","timestamp":null,"uuid":"3b5222ba-4fa3-40ab-b2b1-682860c12a76"}],"network_info":[{"fixed_ip":"192.168.77.29","floating_ip":"128.31.20.56","mac_address":"a8:99:69:ae:dd:67","network":"unity-demo","provider_segmentation_id":564},{"mac_address":"a8:99:69:ae:dd:6a"}],"node":{"future_leases":[],"future_offers":[],"id":"b277a887-54e9-471d-8a5d-34256a0d4c18","lease_uuid":"3b5222ba-4fa3-40ab-b2b1-682860c12a76","lessee":"uitest","location":{"cloud":"openstack","project":{"domain_id":null,"domain_name":null,"id":"14e4c3e738674568ad8098dae998fac7","name":null},"region_name":"regionOne","zone":null},"maintenance":"False","name":"MOC-R4PAC22U33-S1D","offer_uuid":"4fd01dd7-6147-4668-b412-b4c75241ed41","owner":"","power_state":"power on","properties":{"cpu_arch":"x86_64","cpu_frequency":"3400.0000","cpu_model_name":"Intel(R) Xeon(R) CPU E5-2640 v4 @ 2.40GHz","cpus":"40","local_gb":"185","memory_mb":"131072","vendor":"dell inc"},"provision_state":"active","resource_class":"fc430","target_power_state":null,"target_provision_state":null,"timestamp":null,"uuid":"b277a887-54e9-471d-8a5d-34256a0d4c18"}}
	    ]
            setBareMetalData(result);
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
