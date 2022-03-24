import React, { useState } from 'react';

const VegetableList = ({ vegetablesList }) => {
  // pagination
  const [page, setPage] = useState(1);
  const vegetablesNumber = vegetablesList.length;
  const vegetablesPerPage = 10;
  const numberOfPages = Math.ceil(vegetablesNumber / vegetablesPerPage);
  const pagingButtons = (
    Array(numberOfPages).fill(0).map((el, index) => <button key={index}>{index + 1}</button>)
  );

  console.log(`liste ${vegetablesList}`);
  return (
    <div>
      <h2>Liste des légumes</h2>
      <ul>
        {vegetablesList.map((vegetable) => (
          <li key={vegetable.id}>{vegetable.name}{vegetable.friendVegetables}</li>
        ))}
      </ul>
      {pagingButtons}
    </div>
  );
};

export default VegetableList;

