import axios from "axios";
import Vegetable from "./Vegetable";
import DisplayVegetablesList from "./DisplayVegetablesList";
import Paging from "./Paging";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IndexGardenContext from "../../components/Context/IndexGardenContext";
import GardenContext from "../../components/Context/GardenContext";
import IdGardenContext from "../../components/Context/IdGardenContext";
import CompatibleContext from "../../components/Context/CompatibleContext";
import IncompatibleContext from "../../components/Context/IncompatibleContext";
import ColumnsGardenContext from "../../components/Context/ColumnsGardenContext";
import RowsGardenContext from "../../components/Context/RowsGardenContext";
import DisplayCompatibility from "../MainGarden/DisplayCompatibility";
import DisplayIncompatibility from "../MainGarden/DisplayIncompatibility";

import Search from './Search';


const MainVegetables = ({ vegetablesList }) => {
  let navigate = useNavigate();
  const { garden } = useContext(GardenContext);
  const { idGarden } = useContext(IdGardenContext);
  const { columns } = useContext(ColumnsGardenContext);
  const { rows } = useContext(RowsGardenContext);
  const { indexGarden, setIndexGarden } = useContext(IndexGardenContext);
  const { compatibleVegetables, setCompatibleVegetables } = useContext(CompatibleContext);
  const { incompatibleVegetables, setIncompatibleVegetables } = useContext(IncompatibleContext);



  /***** pagination*/
  const [page, setPage] = useState(1);
  const [vegetablesPaged, setVegetablesPaged] = useState([]);
  const [displayPaging, setDisplayPaging] = useState(true);
  const vegetablesNumber = vegetablesList.length;
  const vegetablesPerPage = 10;
  const numberOfPages = Math.ceil(vegetablesNumber / vegetablesPerPage);
  const pagingButtons = Array(numberOfPages)
    .fill(0)
    .map((el, index) => (
      <button className="pointer"
        disabled={page === index + 1}
        key={index}
        onClick={() => handlePage(index + 1)}
      >
        {index + 1}
      </button>
    ));


  function handlePage(value) {
    setPage(value);
  }

  useEffect(() => {
    // indice de début, le premier indice est pris en compte
    const firstMarker = (page - 1) * vegetablesPerPage;
    // indice de fin, le dernier élément n'est pas pris en compte
    const lastMarker = page * vegetablesPerPage;
    setVegetablesPaged(vegetablesList.slice(firstMarker, lastMarker));
  }, [page, vegetablesList]);

  //Search
  const [searchTerm, setSearchTerm] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const handleEscape = (event) => {
    if (event.keyCode === 27) {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    let results = [];
    (searchTerm.length >= 1) ? (results = vegetablesList.filter(vegetable => vegetable.name.toLowerCase().includes(searchTerm)), setDisplayPaging(false), setDisplayResults(true)) : (setSearchResults(vegetablesPaged), setDisplayPaging(true), setDisplayResults(false));
    // const results = vegetablesList.filter(vegetable => vegetable.name.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm, vegetablesList]);


  /***** state frame-details*/
  const [openModal, setOpenModal] = useState(false);
  const [vegetable, setVegetable] = useState([]);
  const limitsList = vegetablesList.length;

  const handleAddToGarden = (id) => {
    garden.splice(indexGarden, 1, id);
    
    // update API
    axios.put("https://potager-compatible-api.herokuapp.com/api/parcels", {
      "id": idGarden,
      "width": columns,
      "height": rows,
      "vegetableIds": garden
    });

    setCompatibleVegetables([]);
    setIncompatibleVegetables([]);
    setIndexGarden(-1);
    navigate('/vegetable-garden');

  };

  const handleModal = (vegetableId) => {
    vegetableId === -1
      ? (setOpenModal(false), setVegetable([]))
      : (setOpenModal(true),
        setVegetable(
          vegetablesList.find((vegetable) => vegetable.id === vegetableId)
        ));
  };

  console.log(vegetablesPaged);

  return (
    <div id="vegetables-list">
      {(compatibleVegetables.length !== 0 || incompatibleVegetables.length !== 0) ? (
        <div id="compatibilities">
          <h2>Nos conseils d&#39;associations de légumes pour votre potager</h2>
          {compatibleVegetables.length !== 0 ? <DisplayCompatibility compatibleVegetables={compatibleVegetables} handleAddToGarden={handleAddToGarden} indexGarden={indexGarden} /> : null}
          {incompatibleVegetables.length !== 0 ? <DisplayIncompatibility incompatibleVegetables={incompatibleVegetables} /> : null}
        </div>) : null}
      {openModal ? (
        <div>
          {
            <Vegetable
              handleModal={handleModal}
              openModal={openModal}
              vegetable={vegetable}
              limitsList={limitsList}
              indexGarden={indexGarden}
              handleAddToGarden={handleAddToGarden}
            />
          }
        </div>
      ) : null}
      <Search searchTerm={searchTerm} handleSearch={handleSearch} handleEscape={handleEscape} />
      {/* {searchResults.length !== 0 ?
        <DisplayVegetablesList
          vegetablesList={searchResults}
          handleModal={handleModal}
          indexGarden={indexGarden}
          handleAddToGarden={handleAddToGarden} />
        :
        <DisplayVegetablesList
        vegetablesList={vegetablesPaged}
          handleModal={handleModal}
          indexGarden={indexGarden}
          handleAddToGarden={handleAddToGarden}
        />
      } */}
      <DisplayVegetablesList
        vegetablesList={vegetablesPaged}
        searchResults={searchResults}
        displayResults={displayResults}
        displayPaging={displayPaging}
        handleModal={handleModal}
        indexGarden={indexGarden}
        handleAddToGarden={handleAddToGarden} />
      {displayPaging ?
        <Paging page={page} handlePage={handlePage} vegetablesList={vegetablesList} numberOfPages={numberOfPages} pagingButtons={pagingButtons} />
        : null
      }

    </div>
  );
};

export default MainVegetables;
