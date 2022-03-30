import { useEffect, useState } from "react";
import GardenGrid from "./GardenGrid";
import DisplayCompatibility from "./DisplayCompatibility";
import DisplayIncompatibility from "./DisplayIncompatibility";
import { boxLeft, boxRight, boxPreviousColumnLeft, boxPreviousColumn, boxPreviousColumnRight, boxNextColumnLeft, boxNextColumn, boxNextColumnRight } from "./selectCellFunctions";

export const columns = 4;
export const rows = 4;
const MainVegetableGarden = ({ vegetablesList }) => {

  // const initialGarden = new Array(columns * rows).fill(-1);
  const initialGarden = [2, 4, -1, 8, 10, -1, 12, 14, -1, 16, 18, -1, 20, 22, 26, 28];
  const [garden, setGarden] = useState(initialGarden);
  const [selectedCase, setSelectedCase] = useState([]);

  const [compatibleVegetables, setCompatibleVegetables] = useState([]);
  const [incompatibleVegetables, setIncompatibleVegetables] = useState([]);

  function getVegetable(id) {
    const vegetableToName = vegetablesList.find((vegetable) => vegetable.id === id);
    return (typeof vegetableToName !== "undefined") ? vegetableToName.name : "";
  }

  useEffect(() => {
    if (selectedCase.length !== 0) {

      // pour chaque id => le légume => parcourir les amis et enemis
      const allCompatible = [];
      const allUncompatible = [];
      selectedCase.forEach((idVegetableSelectedCase) => {
        if (idVegetableSelectedCase !== -1) {
          const vegetableSelectedCase = vegetablesList.find(vegetableOfList => vegetableOfList.id === idVegetableSelectedCase);
          vegetableSelectedCase.friendVegetableIds.map(friendVegetableId => allCompatible.push(friendVegetableId));
          vegetableSelectedCase.enemyVegetableIds.map(enemyVegetableId => allUncompatible.push(enemyVegetableId));
        }
      });
      // dédoublonne les tableaux
      const compatible = [... new Set(allCompatible)];
      const uncompatible = [... new Set(allUncompatible)];
      // supprime les légumes incompatibles de la liste des légumes compatibles
      compatible.forEach((idcompatible, index) => {
        if (uncompatible.includes(idcompatible)) {
          compatible.splice(index, 1);
        }
      });


      // change l'état des légumes compatibles triés (callback pour les nombres)
      setCompatibleVegetables(compatible.sort(function (a, b) { return a - b; }));
      setIncompatibleVegetables(uncompatible.sort(function (a, b) { return a - b; }));
    }
  }, [selectedCase]);

  const handleSelectCell = (id) => {
    const column = id % columns;
    const row = Math.floor(id / columns);
    switch (true) {
      case column === 0 && row === 0:
        //"coin haut gauche"
        setSelectedCase([
          garden[boxRight(id)],
          garden[boxNextColumn(id)],
          garden[boxNextColumnRight(id)]
        ]);
        break;

      case column === columns - 1 && row === 0:
        //"coin haut droit"
        setSelectedCase(
          [garden[boxLeft(id)],
          garden[boxNextColumnLeft(id)],
          garden[boxNextColumn(id)]
          ]);
        break;

      case column === 0 && row === rows - 1:
        //"coin bas gauche"
        setSelectedCase(
          [garden[boxPreviousColumn(id)],
          garden[boxPreviousColumnRight(id)],
          garden[boxRight(id)]
          ]);
        break;

      case column === columns - 1 && row === rows - 1:
        //"coin bas droit"
        setSelectedCase([
          garden[boxPreviousColumnLeft(id)],
          garden[boxPreviousColumn(id)],
          garden[boxLeft(id)]
        ]);
        break;

      case row === 0:
        //" haut milieu"
        setSelectedCase([
          garden[boxLeft(id)],
          garden[boxRight(id)],
          garden[boxNextColumnLeft(id)],
          garden[boxNextColumn(id)],
          garden[boxNextColumnRight(id)]
        ]);
        break;
      case column === 0:
        //"gauche milieu"
        setSelectedCase([
          garden[boxPreviousColumn(id)],
          garden[boxPreviousColumnRight(id)],
          garden[boxRight(id)],
          garden[boxNextColumn(id)],
          garden[boxNextColumnRight(id)]
        ]);
        break;
      case row === rows - 1:
        //"bas milieu"
        setSelectedCase([
          garden[boxPreviousColumnLeft(id)],
          garden[boxPreviousColumn(id)],
          garden[boxPreviousColumnRight(id)],
          garden[boxLeft(id)],
          garden[boxRight(id)]
        ]);
        break;
      case column === columns - 1:
        //"droite milieu"
        setSelectedCase([
          garden[boxPreviousColumnLeft(id)],
          garden[boxPreviousColumn(id)],
          garden[boxLeft(id)],
          garden[boxNextColumnLeft(id)],
          garden[boxNextColumn(id)]
        ]);
        break;

      default:
        //"milieu milieu: prends tous les cas"
        setSelectedCase([
          garden[boxPreviousColumnLeft(id)],
          garden[boxPreviousColumn(id)],
          garden[boxPreviousColumnRight(id)],
          garden[boxLeft(id)],
          garden[boxRight(id)],
          garden[boxNextColumnLeft(id)],
          garden[boxNextColumn(id)],
          garden[boxNextColumnRight(id)]
        ]);
        break;
    }

  };

  return (
    <div>
      <h1>Mon potager</h1>
      <div className="garden">
        <DisplayCompatibility compatibleVegetables={compatibleVegetables} getVegetable={getVegetable} />
        <GardenGrid garden={garden} handleSelectCell={handleSelectCell} getVegetable={getVegetable} />
        <DisplayIncompatibility incompatibleVegetables={incompatibleVegetables} getVegetable={getVegetable} />
      </div>
    </div>
  );
};

export default MainVegetableGarden;