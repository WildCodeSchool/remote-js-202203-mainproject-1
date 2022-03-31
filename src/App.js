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
import GardenContext from "./components/Context/GardenContext";
import IndexGardenContext from "./components/Context/IndexGardenContext";
import CompatibleContext from "./components/Context/CompatibleContext";
import IncompatibleContext from "./components/Context/IncompatibleContext";

export const columns = 4;
export const rows = 4;

function App() {
  const [vegetablesList, setVegetablesList] = useState([]);

  const initialGarden = new Array(columns * rows).fill(-1);
  // const initialGarden = [2, 4, -1, 8, 10, -1, 12, 14, -1, 16, 18, -1, 20, 22, 26, 28];
  const [garden, setGarden] = useState(initialGarden);
  const [indexGarden, setIndexGarden] = useState(-1);

  const [compatibleVegetables, setCompatibleVegetables] = useState([]);
  const [incompatibleVegetables, setIncompatibleVegetables] = useState([]);

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
              element={
                <GardenContext.Provider value={{ garden: garden, setGarden: setGarden }}>
                  <IndexGardenContext.Provider value={{ indexGarden: indexGarden, setIndexGarden: setIndexGarden }}>
                  <CompatibleContext.Provider value={{ compatibleVegetables: compatibleVegetables, setCompatibleVegetables: setCompatibleVegetables }}>
                  <IncompatibleContext.Provider value={{ incompatibleVegetables: incompatibleVegetables, setIncompatibleVegetables: setIncompatibleVegetables }}>
                        <MainVegetables vegetablesList={vegetablesList} />
                      </IncompatibleContext.Provider>
                    </CompatibleContext.Provider>
                  </IndexGardenContext.Provider>
                </GardenContext.Provider>
              }
            />
            <Route path="/vegetable-garden" element={
              <GardenContext.Provider value={{ garden: garden }}>
                <IndexGardenContext.Provider value={{ setIndexGarden: setIndexGarden }}>
                  <CompatibleContext.Provider value={{ setCompatibleVegetables: setCompatibleVegetables }}>
                    <IncompatibleContext.Provider value={{ setIncompatibleVegetables: setIncompatibleVegetables }}>
                      <MainVegetableGarden vegetablesList={vegetablesList} />
                    </IncompatibleContext.Provider>
                  </CompatibleContext.Provider>
                </IndexGardenContext.Provider>
              </GardenContext.Provider>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
