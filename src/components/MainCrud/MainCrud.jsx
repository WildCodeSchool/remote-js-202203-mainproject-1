import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

/********* Context ************/
import GardenContext from "../Context/GardenContext";
import IdGardenContext from '../Context/IdGardenContext';
import RowsGardenContext from "../Context/RowsGardenContext";
import ColumnsGardenContext from "../Context/ColumnsGardenContext";

/******* CRUD  ************/
import CreateVegetable from "./CrudVegetable/CreateVegetable";
import DeleteVegetable from "./CrudVegetable/DeleteVegetable";
import UpdateVegetable from "./CrudVegetable/UpdateVegetable";
import CreateGarden from "./CrudGarden/CreateGarden";
import ListGarden from './CrudGarden/ListGarden';

const MainCrud = ({ vegetablesList, GardenList }) => {
    let navigate = useNavigate();
    console.log(GardenList);
    const { idGarden, setIdGarden } = useContext(IdGardenContext);
    const { garden,setGarden } = useContext(GardenContext);
    const { setColumns } = useContext(ColumnsGardenContext);
    const { setRows } = useContext(RowsGardenContext);
    
    const handleSelectGarden = (id) => {
        const newGarden = GardenList.find(garden => garden.id === id);
        setGarden(newGarden.vegetableIds);
        setIdGarden(id);
        setColumns(newGarden.width);
        setRows(newGarden.height);
        navigate("/vegetable-garden");
    };


return (
    <div id="menu-crud">
        <div className="crud-garden">
            <h2>Menu Potager</h2>
            <button><Link to="/garden-option-create" element={<CreateGarden />} > Ajouter un potager </Link></button>
            {/* // lister les potagers avec si légumes liste légumes et bouton modifier => garden et bouton supprimer qui supprime !
                // = contexte idGardenCContext */}
            <ListGarden vegetablesList ={vegetablesList} gardenList={GardenList }/>

            {GardenList.map(garden => (
            <div key={garden.id}>
                 {garden.vegetableIds.filter(id => id !== -1).length >1 ? 
                garden.vegetableIds.filter(id => id !== -1).length + " parcelles occupées sur" :
                (garden.vegetableIds.filter(id => id !== -1).length === 1) ? "1 parcelle occupée sur" :
                "Aucune parcelle occupée sur"} {garden.vegetableIds.length}
                {(garden.id !== idGarden) ? <button className="cursor" onClick={() => handleSelectGarden(garden.id)}>Sélectionner ce potager</button> : <span>Parcelle active</span>}
                {/* <button onclick={() => handleDelete(garden.id)}>supprimer</button> */}
                </div>))}

            {/* <button><Link to="/garden-option-delete" element={<DeleteGarden />} > Supprimer un potager </Link></button> */}
        </div>
        <div className="crud-vegetable">
            <h2>Menu Légume</h2>
            <div className="vegetable-actions">
                <button><Link to="/vegetable-option-create" element={<CreateVegetable />} > Ajouter un nouveau légume à ma liste </Link></button>
                <button><Link to="/vegetable-option-update" element={<UpdateVegetable />} > Modifier un légume </Link></button>
                <button><Link to="/vegetable-option-delete" element={<DeleteVegetable />} > Supprimer un légume </Link></button>
            </div>
        </div>
    </div>
);
};

export default MainCrud;