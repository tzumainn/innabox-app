import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clusters from './pages/Clusters';
import BareMetal from './pages/BareMetal';
import './App.css';

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
