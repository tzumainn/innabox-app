import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import BareMetalList from '../components/baremetal/BareMetalList';
import BareMetalOrderForm from '../components/baremetal/BareMetalOrderForm';

function BareMetal() {    
    return (
	<div>
	    <Navigation />
	    <h1>Leased Nodes</h1>
	    <BareMetalList />
	    <h2>Available Nodes</h2>
	    <BareMetalOrderForm />
	</div>
    )
}

export default BareMetal;
