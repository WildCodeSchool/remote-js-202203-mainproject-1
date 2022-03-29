import { useEffect, useState } from "react";
import GardenGrid from "./GardenGrid";


const MainVegetableGarden = ({ vegetablesList }) => {

  const columns = 4;
  const rows = 4;
  // const initialGarden = new Array(columns * rows).fill(-1);
  const initialGarden = [2, 4, -1, 8, 10, -1, 12, 14, -1, 16, 18, -1, 20, 22, 26, 28];
  const [garden, setGarden] = useState(initialGarden);
  const [selectedCase, setSelectedCase] = useState([]);

  function getVegetable(id) {
    const vegetable = vegetablesList.find((element) => element.id === id);
    return (typeof vegetable !== "undefined") ? vegetable.name : "";
  }

  const handleSelectCell = (id) => {
    const column = id % columns;
    const row = Math.floor(id / columns);
    switch (true) {
      case column === 0 && row === 0:
        //"coin haut gauche"
        setSelectedCase([
          garden[id + 1],
          garden[id + columns],
          garden[id + columns + 1]
        ]);

        break;
        
      case column === columns - 1 && row === 0:
        //"coin haut droit"
        setSelectedCase(
          [garden[id - 1],
          garden[id + (columns - 1)],
          garden[id + columns]
          ]);
        break;
        
      case column === 0 && row === rows - 1:
        //"coin bas gauche"
        setSelectedCase(
          [garden[id - columns],
          garden[id - (columns - 1)],
          garden[id + 1]
          ]);
        break;
        
      case column === columns - 1 && row === rows - 1:
        //"coin bas droit"
        setSelectedCase([
          garden[id - (columns + 1)],
          garden[id - columns],
          garden[id - 1]
        ]);
        break;
        
      case row === 0:
        //" haut milieu"
        setSelectedCase([
          garden[id - 1],
          garden[id + 1],
          garden[id + (columns - 1)],
          garden[id + columns],
          garden[id + columns + 1]
        ]);
        break;
      case column === 0:
        //"gauche milieu"
        setSelectedCase([
          garden[id - columns],
          garden[id - (columns - 1)],
          garden[id + 1],
          garden[id + columns],
          garden[id + columns + 1]
        ]);
        break;
      case row === rows - 1:
        //"bas milieu"
        setSelectedCase([
          garden[id - (columns + 1)],
          garden[id - columns],
          garden[id - (columns - 1)],
          garden[id - 1],
          garden[id + 1]
        ]);
        break;
      case column === columns - 1:
        //"droite milieu"
        setSelectedCase([
          garden[id - (columns + 1)],
          garden[id - columns],
          garden[id - 1],
          garden[id + (columns - 1)],
          garden[id + columns]
        ]);
        break;

      default:
        //"milieu milieu: prends tous les cas"
        setSelectedCase([
          garden[id - (columns + 1)],
          garden[id - columns],
          garden[id - (columns - 1)],
          garden[id - 1],
          garden[id + 1],
          garden[id + (columns - 1)],
          garden[id + columns],
          garden[id + columns + 1]
        ]);
        break;
    }

  };

  return (
    <div>
      <h1>Mon potager</h1>
      {selectedCase.map((value, index) => (<p key={index}>{value}</p>))}
      <GardenGrid garden={garden} handleSelectCell={handleSelectCell} getVegetable={getVegetable} />

    </div>
  );
};

export default MainVegetableGarden;