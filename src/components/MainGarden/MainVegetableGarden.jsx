import { useEffect, useState } from "react";


const MainVegetableGarden = ({ vegetablesList }) => {

  const columns = 3;
  const rows = 3;
  const initialGarden = new Array(columns*rows).fill(-1);
  const [garden, setGarden] = useState(initialGarden);

  console.log(garden);


  return (
    <div>
          <h1>Mon potager</h1>
            
    </div>
  );
};

export default MainVegetableGarden;