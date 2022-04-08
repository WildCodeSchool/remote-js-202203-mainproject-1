import React, { useState, useEffect } from "react";


const DisplayVegetablesList = ({ vegetablesList,searchResults, displayResults,displayPaging, handleModal, indexGarden, handleAddToGarden }) => {
  const displayVegetables = displayResults ? searchResults : vegetablesList;
  const display = displayVegetables.map((vegetable) => (
    <div className="card-vegetable" key={vegetable.id}>
      {/* <img className="card-picture" alt="card picture"></img> */}
      <h2>{vegetable.name}</h2>
      <button className="btn-details cursor-pointer" onClick={() => handleModal(vegetable.id)}>Détails</button>
      {(indexGarden !== -1) ? (
        <button className="cursor-pointer btn-add-vegetable" onClick={() => handleAddToGarden(vegetable.id)}>Ajouter au potager</button>
      ) : null}
    </div>
  ));
  return (
    <div>
      <h1 className="title-list">Liste des légumes</h1>
      <ul className="container-card">
      {displayVegetables.length === 0 && !displayPaging ? <p className="no-find">Aucun légume ne correspond à votre recherche</p> : (
          display
        )}

      </ul>

    </div>
  );
};

export default DisplayVegetablesList;
