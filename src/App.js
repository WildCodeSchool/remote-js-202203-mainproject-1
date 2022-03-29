//import logo from './logo.svg';
import "./App.css";

import Header from "./components/LayoutApp/Header";
import Footer from "./components/LayoutApp/Footer";
import Home from "./components/LayoutApp/Home";
import MainVegetableGarden from "./components/MainGarden/MainVegetableGarden";
import MainVegetables from "./components/MainVegetableList/MainVegetables";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [vegetablesList, setVegetablesList] = useState([]);

  useEffect(() => {
    Axios.get("https://potager-compatible-api.herokuapp.com/api/vegetables")
      .then((response) => response.data)
      .then((data) => {
        setVegetablesList(data);
      });
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/vegetables-list"
              element={<MainVegetables vegetablesList={vegetablesList} />}
            />
            <Route path="/vegetable-garden" element={<MainVegetableGarden vegetablesList={vegetablesList} />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
