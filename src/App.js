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
import MainCrud from "./components/MainCrud/MainCrud";
import CreateVegetable from "./components/MainCrud/CrudVegetable/CreateVegetable";
import DeleteVegetable from "./components/MainCrud/CrudVegetable/DeleteVegetable";
import UpdateVegetable from "./components/MainCrud/CrudVegetable/UpdateVegetable";
import DeleteGarden from "./components/MainCrud/CrudGarden/DeleteGarden";
import CreateGarden from "./components/MainCrud/CrudGarden/CreateGarden";

export const columns = 3;
export const rows =3;

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
        setVegetablesList(data.sort(function(a,b){return a.name.localeCompare(b.name); }));
      });

      // TODO récupère les garden
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/vegetables-list"
              element={
                <GardenContext.Provider
                  value={{ garden: garden, setGarden: setGarden }}
                >
                  <IndexGardenContext.Provider
                    value={{
                      indexGarden: indexGarden,
                      setIndexGarden: setIndexGarden,
                    }}
                  >
                    <CompatibleContext.Provider
                      value={{
                        compatibleVegetables: compatibleVegetables,
                        setCompatibleVegetables: setCompatibleVegetables,
                      }}
                    >
                      <IncompatibleContext.Provider
                        value={{
                          incompatibleVegetables: incompatibleVegetables,
                          setIncompatibleVegetables: setIncompatibleVegetables,
                        }}
                      >
                        <MainVegetables vegetablesList={vegetablesList} />
                      </IncompatibleContext.Provider>
                    </CompatibleContext.Provider>
                  </IndexGardenContext.Provider>
                </GardenContext.Provider>
              }
            />
            <Route
              path="/vegetable-garden"
              element={
                <GardenContext.Provider value={{ garden: garden }}>
                  <IndexGardenContext.Provider
                    value={{ setIndexGarden: setIndexGarden }}
                  >
                    <CompatibleContext.Provider
                      value={{
                        setCompatibleVegetables: setCompatibleVegetables,
                      }}
                    >
                      <IncompatibleContext.Provider
                        value={{
                          setIncompatibleVegetables: setIncompatibleVegetables,
                        }}
                      >
                        <MainVegetableGarden vegetablesList={vegetablesList} />
                      </IncompatibleContext.Provider>
                    </CompatibleContext.Provider>
                  </IndexGardenContext.Provider>
                </GardenContext.Provider>
              }
            />
            <Route path="/vegetable-option" element={<MainCrud />} />
            <Route
              path="/vegetable-option-create"
              element={
                <CreateVegetable
                  vegetablesList={vegetablesList}
                  setVegetablesList={setVegetablesList}
                />
              }
            />
            <Route
              path="/vegetable-option-update"
              element={
                <UpdateVegetable
                  vegetablesList={vegetablesList}
                  setVegetablesList={setVegetablesList}
                />
              }
            />
            <Route
              path="/vegetable-option-delete"
              element={
                <DeleteVegetable
                  vegetablesList={vegetablesList}
                  setVegetablesList={setVegetablesList}
                />
              }
            />
            <Route
              path="/garden-option-create"
              element={
                <CreateGarden
                  
                />
              }
            />
            <Route
              path="/garden-option-delete"
              element={
                <DeleteGarden
                  
                />
              }
            />
          </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
