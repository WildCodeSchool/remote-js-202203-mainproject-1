import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateGarden = ({gardenList,setgardenList,setIdGarden}) => {
    
    let navigate = useNavigate();
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [error, setError] = useState("");
    const vegetableids = new Array(height * width).fill(-1);

    function handleCreate() {
        console.log(width);
        console.log(height);
        if (width !== null && height !== null) {

            axios.post("https://potager-compatible-api.herokuapp.com/api/parcels", {
                "width": width,
                "height": height,
                "vegetableIds": vegetableids
            }).then((response) => {
                const gardenCreated = response.data;
                gardenList.push(gardenCreated);
                setgardenList(gardenList);
                setIdGarden(gardenCreated.id);
                navigate("/vegetable-option");
            });
            
        } else setError("Vous devez choisir un bombre de lignes et de colonnes");
    }

    return (
        <div>
            <h1>Créer un potager</h1>
            <div className="form-create-garden">
                <h3>Définissez la répartition des parcelles de votre potager</h3>
                <p className="error">{error}</p>
                <div>
                    <label > Nombre de lignes </label>
                    <select onChange={(e) => (setWidth(e.target.value), setError(""))} name="row-value" id="row-select">
                        <option value="null"> ... </option>
                        <option value="1"> 1 ligne </option>
                        <option value="2"> 2 lignes </option>
                        <option value="3"> 3 lignes </option>
                        <option value="4"> 4 lignes </option>
                        <option value="5"> 5 lignes </option>
                        <option value="6"> 6 lignes </option>
                    </select>

                </div>

                <div>
                    <label > Nombre de colonnes </label>
                    <select onChange={(e) => (setHeight(e.target.value), setError(""))} name="colunm-value" id="colunm-select">
                        <option value="null"> ... </option>
                        <option value="1"> 1 colonne </option>
                        <option value="2"> 2 colonnes </option>
                        <option value="3"> 3 colonnes </option>
                        <option value="4"> 4 colonnes </option>
                        <option value="5"> 5 colonnes </option>
                        <option value="6"> 6 colonnes </option>
                    </select>

                </div>
                <button className="cursor-pointer" type="submit" onClick={handleCreate}> Enregistrer </button>
            </div>

        </div>
    );
};

export default CreateGarden;