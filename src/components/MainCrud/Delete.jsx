import axios from "axios";
import { useNavigate } from "react-router-dom";

const Delete = ({ vegetablesList, setVegetablesList }) => {
  let navigate = useNavigate();

  function getVegetable(id) {
    axios.delete(
      `https://potager-compatible-api.herokuapp.com/api/vegetables/${id}`
    );

    navigate("/vegetables-list");
    axios
      .get("https://potager-compatible-api.herokuapp.com/api/vegetables")
      .then((response) => response.data)
      .then((data) => {
        setVegetablesList(data);
      });
  }

  return (
    <div className="form-delete">
      <h1>Supprimer un légume</h1>
      <div>
        <ul className="container-card-delete">
          {vegetablesList.map((vegetable) => (
            <div className="card-vegetable-delete" key={vegetable.id}>
              <h2>{vegetable.name}</h2>
              <button
                className="del-btn"
                onClick={() => getVegetable(vegetable.id)}
              >
                SUPPRIMER
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Delete;
