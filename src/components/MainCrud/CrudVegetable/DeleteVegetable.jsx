import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteVegetable = ({ vegetablesList, setVegetablesList }) => {
  let navigate = useNavigate();

  async function handleDelete(id) {
    console.log(id);
    console.log(vegetablesList);
    try {
      await axios.delete(
        `https://potager-compatible-api-pg.herokuapp.com/api/vegetables/${id}`

      );
    }
    catch (error) {
      console.log(error);
    }
    const newList = vegetablesList.filter(vegetable => vegetable.id !== id);
    setVegetablesList(newList);

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
                className="del-btn cursor-pointer"
                onClick={() => handleDelete(vegetable.id)}
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

export default DeleteVegetable;
