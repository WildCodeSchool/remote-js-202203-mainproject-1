//import logo from './logo.svg';
import './App.css';

import Header from './components/LayoutApp/Header';
import Footer from './components/LayoutApp/Footer';
import Home from './components/LayoutApp/Home';
import VegetableGarden from './components/Main/VegetableGarden';
import VegetablesList from './components/Main/VegetablesList';
import Vegetable from './components/Main/Vegetable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [vegetablesList, setVegetablesList] = useState([]);
  useEffect(() => {
    Axios
      .get('https://potager-compatible-api.herokuapp.com/api/vegetables')
      .then((response) => response.data)
      .then(data => {
        console.log(data);
        setVegetablesList(data);
      });
  }, []);
  return (
    <div className='App'>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vegetables-list" element={<VegetablesList vegetablesList={vegetablesList} />} />
            <Route path="/vegetable-garden" element={<VegetableGarden />} />
            <Route path="/vegetable" element={<Vegetable />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
