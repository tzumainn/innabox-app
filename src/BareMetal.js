import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';

function BareMetal() {
  const [bareMetalData, setBareMetalData] = useState([]);
  const [bareMetalLoading, setBareMetalLoading] = useState(true);

  useEffect(() => {
    const fetchBareMetalData = async () => {
	try {
            const response = await fetch('http://localhost:8081/api/v1/nodes/list');
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

    return (
	<div>
	    <Navigation />
	    <h1>Leased Nodes</h1>
	          {bareMetalLoading ? (
        <p>Fetching leased nodes...</p>
      ) : (
          <table>
	      <thead>
		  <tr>
		      <th>Name</th>
		      <th>Resource Class</th>
		      <th>Provision State</th>
		      <th>Power State</th>
		  </tr>
	      </thead>
	      <tbody>
              {bareMetalData.map((item) => (
		  <tr>
		      <td>{item.node.name}</td>
		      <td>{item.node.resource_class}</td>
		      <td>{item.node.provision_state}</td>
		      <td>{item.node.power_state}</td>		      
		  </tr>
              ))}
	      </tbody>
          </table>
      )}
	    <h2>Available Nodes</h2>
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
              {offerData.map((item) => (
		  <tr>
		      <td>{item.resource_class}</td>
		      <td>{item.count}</td>
		  </tr>
              ))}
	      </tbody>
          </table>
      )}
	</div>
    )
}

export default BareMetal;
