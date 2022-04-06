import { useState } from "react";
import axios from "axios";

const CreateGarden = () => {
    const [width, setWidth] = useState("3");
    const [height, setHeight] = useState("3");
    //const [vegetableIds, setVegetableIds] = useState([]);
    const initialGarden = new Array(height * width).fill(-1);

    function handleCreate(value) {
          
       
            axios.post("https://potager-compatible-api.herokuapp.com/api/parcels", {
                width,
                height,
                initialGarden
            });

      
        console.log("Nombre de lignes : " + width);
        console.log("Nombre de colonnes : " + height);
        console.log(initialGarden);
    }

    return(
            <div>
                <h1>Créer un potager</h1>
                <div className="form-create-garden">
                    <div>
                        <label > Nombre de lignes </label>
                        <select onChange={(e) => setWidth(e.target.value)} name="row-value" id="row-select">
                            <option value="3"> Choisissez un nombre de ligne </option>
                            <option value="1"> 1 ligne </option>
                            <option value="2"> 2 lignes </option>
                            <option value="3"> 3 lignes </option>
                            <option value="4"> 4 lignes </option>
                            <option value="5"> 5 lignes </option>
                            <option value="6"> 6 lignes </option>
                        </select>
                        {width}
                    </div>

                    <div>
                        <label > Nombre de colonnes </label>
                        <select onChange={(e) => setHeight(e.target.value)} name="colunm-value" id="colunm-select">
                            <option value="3"> Choisissez un nombre de colonnes </option>
                            <option value="1"> 1 colonnes </option>
                            <option value="2"> 2 colonnes </option>
                            <option value="3"> 3 colonnes </option>
                            <option value="4"> 4 colonnes </option>
                            <option value="5"> 5 colonnes </option>
                            <option value="6"> 6 colonnes </option>
                        </select>
                        {height}
                    </div>
                    <button type="submit" onClick={handleCreate}> Valider </button>
                </div>
            
            </div>
          );
};

export default CreateGarden;