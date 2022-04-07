import { Link } from "react-router-dom";
import { useContext } from "react";

/********* Context ************/
import IdGardenContext from '../Context/IdGardenContext';

/******* CRUD  ************/
import CreateVegetable from "./CrudVegetable/CreateVegetable";
import DeleteVegetable from "./CrudVegetable/DeleteVegetable";
import UpdateVegetable from "./CrudVegetable/UpdateVegetable";
import CreateGarden from "./CrudGarden/CreateGarden";

const MainCrud = ({ vegetablesList, GardenList }) => {
    console.log(GardenList);

    const { idGarden } = useContext(IdGardenContext);

    return (
        <div id="menu-crud">
            <div className="crud-garden">
                <h2>Menu Potager</h2>
                <button><Link to="/garden-option-create" element={<CreateGarden />} > Ajouter un potager </Link></button>
                {/* // lister les potagers avec si légumes liste légumes et bouton modifier => garden et bouton supprimer qui supprime !
                // = contexte idGardenCContext */}
                {GardenList.map(garden => (
                    <div key={garden.id}>{garden.vegetableIds}</div>
                ))}
 

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