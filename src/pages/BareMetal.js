import BareMetalList from '../components/baremetal/BareMetalList';
import BareMetalOrderForm from '../components/baremetal/BareMetalOrderForm';

function BareMetal() {    
    return (
	<>
	    <div className="form">
		<h2>Bare Metal Order Form</h2>
		<BareMetalOrderForm />
	    </div>
	    <div className="body">	
		<BareMetalList />
	    </div>
	</>
    )
}

export default BareMetal;
