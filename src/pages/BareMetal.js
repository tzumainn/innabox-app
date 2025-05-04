import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BareMetalList from '../components/baremetal/BareMetalList';
import BareMetalOrderForm from '../components/baremetal/BareMetalOrderForm';

function BareMetal() {    
    return (
	<>
	    <Header />
	    <div class="body">
		<div class="form">
		    <h2>Bare Metal Order Form</h2>
		    <BareMetalOrderForm />
		</div>
		<BareMetalList />
	    </div>
	</>
    )
}

export default BareMetal;
