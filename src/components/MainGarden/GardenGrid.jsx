const GardenGrid = ({
  garden,
  handleSelectCell,
  getVegetable,
  handleDelete,
  columns
}) => {
  console.log("garden array");
  console.log(garden);

  const gridColumns = {
    gridTemplateColumns: "repeat(" + columns + ",1fr)",
    maxWidth: columns * 300,
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
              <div className="planted parcell">
                <p>{getVegetable(vegetableId)}</p>
                <button
                  id="change-vegetable"
                  className="pointer btn-garden"
                  onClick={() => handleSelectCell(indexGarden)}
                >
                  Changer de légume
                </button>
                <button
                  id="delete-vegetable"
                  className="pointer btn-garden"
                  onClick={() => handleDelete(indexGarden)}
                >
                  Vider la parcelle
                </button>
              </div>
            ) : (
              <div className="parcell">
                <button
                  id="add-vegetable"
                  className="pointer btn-garden"
                  onClick={() => handleSelectCell(indexGarden)}
                >
                  Ajouter un légume
                </button>
              </div>
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
