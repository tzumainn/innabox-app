import React from 'react';
import BareMetalList from '../components/baremetal/BareMetalList';
import BareMetalOrderForm from '../components/baremetal/BareMetalOrderForm';

function BareMetal() {    
    return (
	<>
	    <div className="body">	
		<div className="form" align="center">
		    <h2>Bare Metal Order Form</h2>
		    <BareMetalOrderForm />
		</div>
		<BareMetalList />
	    </div>
	</>
    )
}

export default BareMetal;
