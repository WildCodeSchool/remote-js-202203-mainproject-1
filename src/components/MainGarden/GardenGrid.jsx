import { columns } from "../../App";
const GardenGrid = ({ garden, handleSelectCell, getVegetable }) => {
  const gridColumns = {
    gridTemplateColumns : 'repeat('+columns+',1fr)',
  };
  return (
    <div id="garden" style={gridColumns}>
      {garden.map((vegetableId, indexGarden) => (
        <div className={vegetableId === -1 ? "cell" : "cell active"} key={indexGarden} >
          {vegetableId !== -1 ? getVegetable(vegetableId) : <button className="pointer" onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</button>}
          {/* {vegetableId !== -1 ? getVegetable(vegetableId) + " " + vegetableId : <button onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</button>} */}
          {/* {vegetableId !== -1 ? getVegetable(vegetableId) + " " + vegetableId : <Link to={'/vegetables-list'} onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</Link>} */}
        </div>
      ))}
    </div>
  );
};

export default GardenGrid;