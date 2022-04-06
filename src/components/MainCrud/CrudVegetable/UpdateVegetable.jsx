import axios from "axios";
import { useState, useEffect } from "react";

const UpdateVegetable = ({ vegetablesList, setVegetablesList }) => {
  const [name, setName] = useState("");

  const [startingSowingCover, setStartingSowingCover] = useState("");
  const [endingSowingCover, setEndingSowingCover] = useState("");

  const [startingSowingGround, setStartingSowingGround] = useState("");
  const [endingSowingGround, setEndingSowingGround] = useState("");

  const [startingHarvest, setStartingHarvest] = useState("");
  const [endingHarvest, setEndingHarvest] = useState("");

  const [friendVegetableIds, setFriendVegetableIds] = useState([]);
  const [enemyVegetableIds, setEnemyVegetableIds] = useState([]);



  const updateAPIData = (id) => {
    console.log(id);
    console.log(name);
    console.log(startingSowingCover);
    console.log(endingSowingCover);
    console.log(startingSowingGround);
    console.log(endingSowingGround);
    console.log(startingHarvest);
    console.log(endingHarvest);
    console.log(friendVegetableIds);
    console.log(enemyVegetableIds);

    axios
      .put(`https://potager-compatible-api.herokuapp.com/api/vegetables`, {
        id,
        name,
        startingSowingCover,
        endingSowingCover,
        startingSowingGround,
        endingSowingGround,
        startingHarvest,
        endingHarvest,
        friendVegetableIds,
        enemyVegetableIds
      })
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-delete">
      <h1>Modifier un légume</h1>
      <div>
        <ul className="container-card-delete">
          {vegetablesList.map((vegetable) => (
            <div className="card-vegetable-delete" key={vegetable.id}>
              <div>
                <h2>{vegetable.name}</h2>
                <input
                  placeholder={vegetable.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder={vegetable.startingSowingCover}
                  onChange={(e) => setStartingSowingCover(e.target.value)}
                />
                <input
                  placeholder={vegetable.endingSowingCover}
                  onChange={(e) => setEndingSowingCover(e.target.value)}
                />
                <input
                  placeholder={vegetable.startingSowingGround}
                  onChange={(e) => setStartingSowingGround(e.target.value)}
                />
                <input
                  placeholder={vegetable.endingSowingGround}
                  onChange={(e) => setEndingSowingGround(e.target.value)}
                />
                <input
                  placeholder={vegetable.startingHarvest}
                  onChange={(e) => setStartingHarvest(e.target.value)}
                />
                <input
                  placeholder={vegetable.endingHarvest}
                  onChange={(e) => setEndingHarvest(e.target.value)}
                />
                <input
                  placeholder={vegetable.friendVegetableIds}
                  onChange={(e) => friendVegetableIds.push(parseInt(e.target.value))}
                />
                <input
                  placeholder={vegetable.enemyVegetableIds}
                  onChange={(e) => enemyVegetableIds.push(e.target.value)}
                />
              </div>
              <button
                className="edit-btn"
                onClick={() => {
                  updateAPIData(vegetable.id);
                }}
              >
                MODIFIER
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpdateVegetable;
