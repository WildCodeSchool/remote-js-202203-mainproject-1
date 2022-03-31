import { columns } from "../../App";

const GardenGrid = ({
  garden,
  handleSelectCell,
  getVegetable,
  handleDelete,
}) => {
  const gridColumns = {
    gridTemplateColumns: "repeat(" + columns + ",1fr)",
  };
  return (
    <div>
      <div id="garden" style={gridColumns}>
        {garden.map((vegetableId, indexGarden) => (
          <div
            className={vegetableId === -1 ? "cell" : "cell active"}
            key={indexGarden}
          >
            {vegetableId !== -1 ? (
              <div className="planted-parcell">
                <p>{getVegetable(vegetableId)}</p>
                <button
                  id="change-vegetable"
                  className="pointer"
                  onClick={() => handleSelectCell(indexGarden)}
                >
                  Changer de légume
                </button>
                <button
                  id="delete-vegetable"
                  className="pointer"
                  onClick={() => handleDelete(indexGarden)}
                >
                  Vider la parcelle
                </button>
              </div>
            ) : (
              <button
                id="add-vegetable"
                className="pointer"
                onClick={() => handleSelectCell(indexGarden)}
              >
                Ajouter un légume
              </button>
            )}
            {/* {vegetableId !== -1 ? getVegetable(vegetableId) + " " + vegetableId : <button onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</button>} */}
            {/* {vegetableId !== -1 ? getVegetable(vegetableId) + " " + vegetableId : <Link to={'/vegetables-list'} onClick={() => handleSelectCell(indexGarden)} >Ajouter un légume</Link>} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardenGrid;
