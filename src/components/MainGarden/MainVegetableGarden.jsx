import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GardenGrid from "./GardenGrid";
import {
  boxLeft,
  boxRight,
  boxPreviousColumnLeft,
  boxPreviousColumn,
  boxPreviousColumnRight,
  boxNextColumnLeft,
  boxNextColumn,
  boxNextColumnRight,
} from "./selectCellFunctions";
import GardenContext from "../../components/Context/GardenContext";
import IndexGardenContext from "../../components/Context/IndexGardenContext";
import { columns, rows } from "../../App";
import CompatibleContext from "../../components/Context/CompatibleContext";
import IncompatibleContext from "../../components/Context/IncompatibleContext";

const MainVegetableGarden = ({ vegetablesList }) => {
  let navigate = useNavigate();

  const { garden } = useContext(GardenContext);
  const { setIndexGarden } = useContext(IndexGardenContext);
  const [selectedCase, setSelectedCase] = useState([]);

  const { setCompatibleVegetables } = useContext(CompatibleContext);
  const { setIncompatibleVegetables } = useContext(IncompatibleContext);

  function getVegetable(id) {
    const vegetableToName = vegetablesList.find(
      (vegetable) => vegetable.id === id
    );
    return typeof vegetableToName !== "undefined" ? vegetableToName.name : "";
  }

  useEffect(() => {
    if (selectedCase.length !== 0) {
      // pour chaque id => le légume => parcourir les amis et enemis
      const allCompatible = [];
      const allUncompatible = [];
      selectedCase.forEach((idVegetableSelectedCase) => {
        if (idVegetableSelectedCase !== -1) {
          const vegetableSelectedCase = vegetablesList.find(
            (vegetableOfList) => vegetableOfList.id === idVegetableSelectedCase
          );
          vegetableSelectedCase.friendVegetableIds.map((friendVegetableId) =>
            allCompatible.push({name:getVegetable(friendVegetableId),id:friendVegetableId})
          );
          vegetableSelectedCase.enemyVegetableIds.map((enemyVegetableId) =>
            allUncompatible.push(getVegetable(enemyVegetableId))
          );
        }
      });
      // dédoublonne les tableaux (dont tableau d'objets)
      const compatible = Array.from([...new Set(allCompatible.map(JSON.stringify))]).map(JSON.parse);
      const uncompatible = [...new Set(allUncompatible)];
      // supprime les légumes incompatibles de la liste des légumes compatibles
      compatible.forEach((compatibleVegetable,index) => {
        if (uncompatible.includes(compatibleVegetable.name)) {
          compatible.splice(index, 1);
        }
      });
      // change l'état des légumes compatibles triés
      setCompatibleVegetables(compatible.sort(function(a,b){return a.name.localeCompare(b.name); }));
      setIncompatibleVegetables(uncompatible.sort());
      navigate("/vegetables-list");
    }
  }, [selectedCase]);
  const handleDelete = (id) => {
    garden.splice(id, 1, -1);
    setIndexGarden(-1);
    navigate("/vegetable-garden");
  };
  const handleSelectCell = (id) => {
    const column = id % columns;
    const row = Math.floor(id / columns);

    // context idgarden
    setIndexGarden(id);

    switch (true) {
      case column === 0 && row === 0:
        //"coin haut gauche"
        setSelectedCase([
          garden[boxRight(id)],
          garden[boxNextColumn(id)],
          garden[boxNextColumnRight(id)],
        ]);
        break;

      case column === columns - 1 && row === 0:
        //"coin haut droit"
        setSelectedCase([
          garden[boxLeft(id)],
          garden[boxNextColumnLeft(id)],
          garden[boxNextColumn(id)],
        ]);
        break;

      case column === 0 && row === rows - 1:
        //"coin bas gauche"
        setSelectedCase([
          garden[boxPreviousColumn(id)],
          garden[boxPreviousColumnRight(id)],
          garden[boxRight(id)],
        ]);
        break;

      case column === columns - 1 && row === rows - 1:
        //"coin bas droit"
        setSelectedCase([
          garden[boxPreviousColumnLeft(id)],
          garden[boxPreviousColumn(id)],
          garden[boxLeft(id)],
        ]);
        break;

      case row === 0:
        //" haut milieu"
        setSelectedCase([
          garden[boxLeft(id)],
          garden[boxRight(id)],
          garden[boxNextColumnLeft(id)],
          garden[boxNextColumn(id)],
          garden[boxNextColumnRight(id)],
        ]);
        break;
      case column === 0:
        //"gauche milieu"
        setSelectedCase([
          garden[boxPreviousColumn(id)],
          garden[boxPreviousColumnRight(id)],
          garden[boxRight(id)],
          garden[boxNextColumn(id)],
          garden[boxNextColumnRight(id)],
        ]);
        break;
      case row === rows - 1:
        //"bas milieu"
        setSelectedCase([
          garden[boxPreviousColumnLeft(id)],
          garden[boxPreviousColumn(id)],
          garden[boxPreviousColumnRight(id)],
          garden[boxLeft(id)],
          garden[boxRight(id)],
        ]);
        break;
      case column === columns - 1:
        //"droite milieu"
        setSelectedCase([
          garden[boxPreviousColumnLeft(id)],
          garden[boxPreviousColumn(id)],
          garden[boxLeft(id)],
          garden[boxNextColumnLeft(id)],
          garden[boxNextColumn(id)],
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
          garden[boxNextColumnRight(id)],
        ]);
        break;
    }
  };

  return (
    <div>
      <h1>Mon potager</h1>
      <GardenGrid
        garden={garden}
        handleSelectCell={handleSelectCell}
        getVegetable={getVegetable}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MainVegetableGarden;
