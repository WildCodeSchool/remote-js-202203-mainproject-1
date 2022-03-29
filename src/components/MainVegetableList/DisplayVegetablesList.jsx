import React, { useState, useEffect } from "react";

const DisplayVegetablesList = ({ vegetablesList, handleModal }) => {
  /***** pagination*/
  const [page, setPage] = useState(1);
  const [vegetablesPaged, setVegetablesPaged] = useState([]);
  const vegetablesNumber = vegetablesList.length;
  const vegetablesPerPage = 10;
  const numberOfPages = Math.ceil(vegetablesNumber / vegetablesPerPage);
  const pagingButtons = Array(numberOfPages)
    .fill(0)
    .map((el, index) => (
      <button
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
  }, [page,vegetablesList]);

  return (
    <div>
      <h1 className="title-list">Liste des légumes</h1>
      <ul className="container-card">
        {vegetablesPaged.map((vegetable) => (
          <div className="card-vegetable" key={vegetable.id}>
            <img className="card-picture" alt="card picture"></img>
            <h2>{vegetable.name}</h2>
            <div className="sowing-cover">
              <span>
                Semis en intérieur de {vegetable.startingSowingCover} à
                {vegetable.endingSowingCover}
              </span>
            </div>
            <div className="sowing-ground">
              <span>
                Semis en extérieur de {vegetable.startingSowingGround} à
                {vegetable.endingSowingGround}
              </span>
            </div>
            <div className="harvest">
              <span>
                Récolte de {vegetable.startingHarvest} à
                {vegetable.endingHarvest}
              </span>
            </div>
            <div className="nav-details">
              <li onClick={() => handleModal(vegetable.id)}>Détails</li>
            </div>
          </div>
        ))}
      </ul>
      {page !== 1 ? (
        <button onClick={() => handlePage(page - 1)}>Précédent</button>
      ) : (
        ""
      )}
      {pagingButtons}
      {page !== numberOfPages ? (
        <button onClick={() => handlePage(page + 1)}>Suivant</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default DisplayVegetablesList;
