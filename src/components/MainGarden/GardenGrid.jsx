
const GardenGrid = ({ garden, handleSelectCell, getVegetable }) => {
  return (
    <div id="garden">
      {garden.map((vegetableId, indexGarden) => (
        <div className="cell" key={indexGarden}>
          {vegetableId !== -1 ? getVegetable(vegetableId) : <button onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</button>}
          {/* {vegetableId !== -1 ? getVegetable(vegetableId) + " " + vegetableId : <button onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</button>} */}
          {/* {vegetableId !== -1 ? getVegetable(vegetableId) + " " + vegetableId : <Link to={'/vegetables-list'} onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</Link>} */}
        </div>
      ))}
    </div>
  );
};

export default GardenGrid;