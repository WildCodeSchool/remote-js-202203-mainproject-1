import Vegetable from "./Vegetable";
import DisplayVegetablesList from "./DisplayVegetablesList";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MainVegetables = ({ vegetablesList }) => {
  /***** state frame-details*/
  const [openModal, setOpenModal] = useState(false);
  const [vegetable, setVegetable] = useState([]);
  const limitsList = vegetablesList.length;

  const handleModal = (vegetableId) => {
    vegetableId === -1
      ? (setOpenModal(false), setVegetable([]))
      : (setOpenModal(true),
        setVegetable(
          vegetablesList.filter((vegetable) => vegetable.id === vegetableId)[0]
        ));
  };

  return (
    <div>
      {openModal ? (
        <div>
          {
            <Vegetable
              handleModal={handleModal}
              openModal={openModal}
              vegetable={vegetable}
              limitsList={limitsList}
            />
          }
        </div>
      ) : null}
      <DisplayVegetablesList
        vegetablesList={vegetablesList}
        handleModal={handleModal}
      />
    </div>
  );
};

export default MainVegetables;
