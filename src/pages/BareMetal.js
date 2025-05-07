import React from 'react';
import BareMetalList from '../components/baremetal/BareMetalList';
import BareMetalOrderForm from '../components/baremetal/BareMetalOrderForm';

function BareMetal() {    
    return (
	<>
	    <div className="body">
  		<div className="form" align="center">
		    <BareMetalOrderForm />
		</div>
		<BareMetalList />
	    </div>
	</>
    )
}

export default BareMetal;
