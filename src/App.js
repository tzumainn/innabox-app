import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Clusters from './Clusters';
import BareMetal from './BareMetal';

export default function App() {
    return (
	<BrowserRouter>
	    <Routes>
		<Route path="/" element={<Home />} />
		<Route path="/clusters" element={<Clusters />} />
		<Route path="/baremetal" element={<BareMetal />} />		
	    </Routes>
	</BrowserRouter>
    );}
