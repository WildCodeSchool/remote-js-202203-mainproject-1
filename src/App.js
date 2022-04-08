//import logo from './logo.svg';
import "./App.css";
//import { useNavigate } from "react-router-dom";

import Header from "./components/LayoutApp/Header";
import Footer from "./components/LayoutApp/Footer";
import Home from "./components/LayoutApp/Home";
import MainVegetableGarden from "./components/MainGarden/MainVegetableGarden";
import MainVegetables from "./components/MainVegetableList/MainVegetables";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from "axios";
import React, { useEffect, useState } from "react";
/******* CONTEXT ************/
import GardenContext from "./components/Context/GardenContext";
import IdGardenContext from "./components/Context/IdGardenContext";
import IndexGardenContext from "./components/Context/IndexGardenContext";
import CompatibleContext from "./components/Context/CompatibleContext";
import IncompatibleContext from "./components/Context/IncompatibleContext";
import RowsGardenContext from "./components/Context/RowsGardenContext";
import ColumnsGardenContext from "./components/Context/ColumnsGardenContext";
/******* CRUD */
import MainCrud from "./components/MainCrud/MainCrud";
import CreateVegetable from "./components/MainCrud/CrudVegetable/CreateVegetable";
import DeleteVegetable from "./components/MainCrud/CrudVegetable/DeleteVegetable";
import UpdateVegetable from "./components/MainCrud/CrudVegetable/UpdateVegetable";
import DeleteGarden from "./components/MainCrud/CrudGarden/DeleteGarden";
import CreateGarden from "./components/MainCrud/CrudGarden/CreateGarden";
import ShowVegetable from "./components/MainCrud/CrudVegetable/ShowVegetable";

function App() {
  //let navigate = useNavigate();

  const [vegetablesList, setVegetablesList] = useState([]);
  const [GardenList, setGardenList] = useState([]);

  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);

  const [garden, setGarden] = useState([]);
  const [idGarden, setIdGarden] = useState(0);
  const [indexGarden, setIndexGarden] = useState(-1);

  const [compatibleVegetables, setCompatibleVegetables] = useState([]);
  const [incompatibleVegetables, setIncompatibleVegetables] = useState([]);

  useEffect(() => {
    Axios.get("https://potager-compatible-api.herokuapp.com/api/vegetables")
      .then((response) => response.data)
      .then((data) => {
        // supprime le légume fantôme + tri des légumes
        const sortedList = data.filter(vegetable => vegetable.id !== -1).sort(function (a, b) { return a.name.localeCompare(b.name); });
        setVegetablesList(sortedList);
      });
    // initialise un potager vide => -1 au cas où pas de potager dans l'api
    const initialGarden = new Array(columns * rows).fill(-1);
    Axios.get("https://potager-compatible-api.herokuapp.com/api/parcels")
      .then((response) => response.data)
      .then((data) => {
        (data.length > 0) ? (
          setGardenList(data),
          // => il faut définir maintenant la colonne et la largeur rows et columns
          setIdGarden(data[data.length - 1].id),
          setGarden(data[data.length - 1].vegetableIds),
          setColumns(data[data.length - 1].width),
          setRows(data[data.length - 1].height)
        )
          : (
            //navigate("/vegetable-option")
            setGarden(initialGarden),
            setIdGarden(-1)
          );
      });
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
              <ColumnsGardenContext.Provider
                value={{ columns: columns, setColumns: setColumns }}>
                <RowsGardenContext.Provider
                  value={{ rows: rows, setRows: setRows }}
                >
                  <GardenContext.Provider
                    value={{ garden: garden, setGarden: setGarden }}
                  >
                    <IndexGardenContext.Provider
                      value={{
                        indexGarden: indexGarden,
                        setIndexGarden: setIndexGarden,
                      }}
                    >
                      <IdGardenContext.Provider
                        value={{ idGarden: idGarden }}
                      >
                        <CompatibleContext.Provider
                          value={{
                            compatibleVegetables: compatibleVegetables,
                            setCompatibleVegetables: setCompatibleVegetables
                          }}
                        >
                          <IncompatibleContext.Provider
                            value={{
                              incompatibleVegetables: incompatibleVegetables,
                              setIncompatibleVegetables: setIncompatibleVegetables
                            }}
                          >
                            <MainVegetables vegetablesList={vegetablesList} />
                          </IncompatibleContext.Provider>
                        </CompatibleContext.Provider>
                      </IdGardenContext.Provider>
                    </IndexGardenContext.Provider>
                  </GardenContext.Provider>
                </RowsGardenContext.Provider>
              </ColumnsGardenContext.Provider>
            }
          />
          <Route
            path="/vegetable-garden"
            element={
              <ColumnsGardenContext.Provider
                value={{ columns: columns, setColumns: setColumns }}>
                <RowsGardenContext.Provider
                  value={{ rows: rows, setRows: setRows }}
                >
                  <GardenContext.Provider value={{ garden: garden }}>
                    <IndexGardenContext.Provider
                      value={{ setIndexGarden: setIndexGarden }}
                    >
                      <IdGardenContext.Provider
                        value={{ idGarden: idGarden }}
                      >
                        <CompatibleContext.Provider
                          value={{ setCompatibleVegetables: setCompatibleVegetables, }}
                        >
                          <IncompatibleContext.Provider
                            value={{ setIncompatibleVegetables: setIncompatibleVegetables, }}
                          >
                            <MainVegetableGarden vegetablesList={vegetablesList} />
                          </IncompatibleContext.Provider>
                        </CompatibleContext.Provider>
                      </IdGardenContext.Provider>
                    </IndexGardenContext.Provider>
                  </GardenContext.Provider>
                </RowsGardenContext.Provider>
              </ColumnsGardenContext.Provider>}
          />
          <Route path="/vegetable-option" element={
            <ColumnsGardenContext.Provider value={{ setColumns: setColumns }}>
              <RowsGardenContext.Provider value={{ setRows: setRows }}>
                <GardenContext.Provider value={{ garden: garden, setGarden: setGarden }}>
                  <IdGardenContext.Provider value={{ idGarden: idGarden, setIdGarden: setIdGarden }}>
                    <MainCrud GardenList={GardenList} />
                  </IdGardenContext.Provider>
                </GardenContext.Provider>
              </RowsGardenContext.Provider>
            </ColumnsGardenContext.Provider>}
          />
          <Route
            path="/vegetable-option-create"
            element={<CreateVegetable
              vegetablesList={vegetablesList}
              setVegetablesList={setVegetablesList} />}
          />
          <Route
            path="/vegetable-option-update"
            element={<UpdateVegetable
              vegetablesList={vegetablesList}
              setVegetablesList={setVegetablesList} />}
          />
          <Route
            path="/vegetable-option-delete"
            element={<DeleteVegetable
              vegetablesList={vegetablesList}
              setVegetablesList={setVegetablesList} />}
          />
          <Route
            path="/garden-option-create"
            element={<CreateGarden />}
          />
          <Route
            path="/garden-option-delete"
            element={<DeleteGarden />}
          />
          <Route
            path="/vegetable-option/:idSearch"
            element={<ShowVegetable vegetablesList={vegetablesList} />}
          />
        </Routes>
      </Router>
      <Footer />
    </div >
  );
}

export default App;
