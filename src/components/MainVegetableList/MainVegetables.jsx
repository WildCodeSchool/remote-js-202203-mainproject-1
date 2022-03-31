import Vegetable from "./Vegetable";
import DisplayVegetablesList from "./DisplayVegetablesList";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndexGardenContext from "../../components/Context/IndexGardenContext";
import GardenContext from "../../components/Context/GardenContext";
import CompatibleContext from "../../components/Context/CompatibleContext";
import IncompatibleContext from "../../components/Context/IncompatibleContext";
import DisplayCompatibility from "../MainGarden/DisplayCompatibility";
import DisplayIncompatibility from "../MainGarden/DisplayIncompatibility";

const MainVegetables = ({ vegetablesList }) => {
  let navigate = useNavigate();
  const { garden } = useContext(GardenContext);
  const { indexGarden, setIndexGarden } = useContext(IndexGardenContext);
  const { compatibleVegetables, setCompatibleVegetables } = useContext(CompatibleContext);
  const { incompatibleVegetables, setIncompatibleVegetables } = useContext(IncompatibleContext);


  /***** state frame-details*/
  const [openModal, setOpenModal] = useState(false);
  const [vegetable, setVegetable] = useState([]);
  const limitsList = vegetablesList.length;

  const handleAddToGarden = (id) => {
    garden.splice(indexGarden, 1, id);
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

  return (
    <div id="vegetables-list">
      {compatibleVegetables.length !== 0 ? <DisplayCompatibility compatibleVegetables={compatibleVegetables} /> : ""}
      {incompatibleVegetables.length !== 0 ? <DisplayIncompatibility incompatibleVegetables={incompatibleVegetables} /> : ""}

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
      <DisplayVegetablesList
        vegetablesList={vegetablesList}
        handleModal={handleModal}
        indexGarden={indexGarden}
        handleAddToGarden={handleAddToGarden}
      />
    </div>
  );
};

export default MainVegetables;
