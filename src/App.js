import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clusters from './pages/Clusters';
import BareMetal from './pages/BareMetal';
import Header from './components/Header';
import Navigation from './components/Navigation';
import './App.css';

export default function App() {
    return (
	<BrowserRouter>
	    <Header />
	    <Navigation />
	    <Routes>
		<Route path="/" element={<Home />} />
		<Route path="/clusters" element={<Clusters />} />
		<Route path="/baremetal" element={<BareMetal />} />		
	    </Routes>
	</BrowserRouter>
    );}
