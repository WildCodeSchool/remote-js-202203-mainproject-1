

const GardenGrid = ({garden, handleSelectCell, getVegetable}) => {
  return (
    <div id="garden">
            {garden.map((vegetableId,indexGarden) => (
              <div className="cell" onClick={() => handleSelectCell(indexGarden)} key={indexGarden}> ({vegetableId !== -1 ? getVegetable(vegetableId)+" "+vegetableId : "Ajouter un légume"})</div>
            ))}
    </div>
  );
};

export default GardenGrid;