import axios from "axios";
import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const UpdateVegetable = ({ vegetablesList, setVegetablesList }) => {
  const [name, setName] = useState("");

  const [startingSowingCover, setStartingSowingCover] = useState(null);
  const [endingSowingCover, setEndingSowingCover] = useState(null);

  const [startingSowingGround, setStartingSowingGround] = useState(null);
  const [endingSowingGround, setEndingSowingGround] = useState(null);

  const [startingHarvest, setStartingHarvest] = useState(null);
  const [endingHarvest, setEndingHarvest] = useState(null);

  const [friendVegetableIds, setFriendVegetableIds] = useState([]);
  const [enemyVegetableIds, setEnemyVegetableIds] = useState([]);

  let navigate = useNavigate();



  // const updateAPIData = (id) => {
  //   console.log(id);
  //   console.log(name);
  //   console.log(startingSowingCover);
  //   console.log(endingSowingCover);
  //   console.log(startingSowingGround);
  //   console.log(endingSowingGround);
  //   console.log(startingHarvest);
  //   console.log(endingHarvest);
  //   console.log(friendVegetableIds);
  //   console.log(enemyVegetableIds);

  //   axios
  //     .put(`https://potager-compatible-api.herokuapp.com/api/vegetables`, {
  //       "id" : id,
  //       "name" : name,
  //       "startingSowingCover" : startingSowingCover,
  //       "endingSowingCover" : endingSowingCover,
  //       "startingSowingGround" : startingSowingGround,
  //       "endingSowingGround" : endingSowingGround,
  //       "startingHarvest" : startingHarvest,
  //       "endingHarvest" : endingHarvest,
  //       "friendVegetableIds" : friendVegetableIds,
  //       "enemyVegetableIds" : enemyVegetableIds
  //     })
  //     .then()
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="form-delete">
      <h1>Modifier un légume</h1>
      <div>
        <ul className="container-card-delete">
          {vegetablesList.map((vegetable) => (
            <div className="card-vegetable-delete" key={vegetable.id}>
              <div>
                <h2>{vegetable.name}</h2>                
              </div>
              <Link
                to={`/vegetable-option/${vegetable.id}`}
                className="edit-btn" 
              >MODIFIER</Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpdateVegetable;
