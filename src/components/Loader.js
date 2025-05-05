import React from 'react';
import { DotLoader } from 'react-spinners';

function Loader(props) {
    return (
	<div className="loader">
	    <DotLoader size="10px" />
	    <span style={{ marginLeft: '5px' }}><i>{props.text}</i></span>
	</div>
    );
}

export default Loader
