

const GardenGrid = ({ garden, handleSelectCell, getVegetable }) => {
  return (
    <div id="garden">
      {garden.map((vegetableId, indexGarden) => (
        <div className="cell" key={indexGarden}>
          {vegetableId !== -1 ? getVegetable(vegetableId) + " " + vegetableId : <button onClick={() => handleSelectCell(indexGarden)}>Ajouter un légume</button>}
        </div>
      ))}
    </div>
  );
};

export default GardenGrid;