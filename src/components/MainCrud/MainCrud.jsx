import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const MainCrud = ({ gardenList, setgardenList }) => {
    let navigate = useNavigate();
    const { idGarden, setIdGarden } = useContext(IdGardenContext);
    const { garden, setGarden } = useContext(GardenContext);
    const { setColumns } = useContext(ColumnsGardenContext);
    const { setRows } = useContext(RowsGardenContext);

    const handleSelectGarden = (id) => {
        const newGarden = gardenList.find(garden => garden.id === id);
        setGarden(newGarden.vegetableIds);
        setIdGarden(id);
        setColumns(newGarden.width);
        setRows(newGarden.height);
        navigate("/vegetable-garden");
    };

    const handleDelete = (id) => {
        console.log(id);
        const newList = gardenList.filter(garden => garden.id !== id);
        if (idGarden === id && newList.length > 0) setIdGarden(newList[newList.length - 1].id);
        console.log(idGarden);
        console.log(newList);
        axios.delete(
            `https://potager-compatible-api-pg.herokuapp.com/api/parcels/${id}`
    
          );
        setgardenList(newList);
    };
    useEffect(() => {
        console.log("longueur gardenList " + gardenList.length);
        if (gardenList.length === 0) { setIdGarden(-1); }
        console.log(idGarden);
    }, [gardenList]);


    return (
        <div id="menu-crud">
            <div className="crud-garden">
                <h2>Gestion des potagers</h2>
                {console.log(gardenList)}
                <button><Link to="/garden-option-create" element={<CreateGarden />} > Ajouter un potager </Link></button>

                {(idGarden === -1) ? (<h2>Aucun potager enregistr??</h2>) : (<h2>Liste des potagers enregistr??s</h2>)}
                {(idGarden === -1) ? (null) : (
                    <div id="list-garden">
                        {gardenList.map(garden => (
                            <div className="garden" key={garden.id}>
                                {garden.vegetableIds.filter(id => id !== -1).length > 1 ?
                                    garden.vegetableIds.filter(id => id !== -1).length + " parcelles occup??es sur les" :
                                    (garden.vegetableIds.filter(id => id !== -1).length === 1) ? "1 parcelle occup??e sur les" :
                                        "Aucune parcelle occup??e sur les"} {garden.vegetableIds.length} {(garden.vegetableIds.length > 1) ? "disponibles" : "disponible"}
                                {(garden.id !== idGarden) ? <button className="cursor-pointer" onClick={() => handleSelectGarden(garden.id)}>S??lectionner ce potager</button> : <span>&#9733; Parcelle active &#9733;</span>}
                                <button className="cursor-pointer" onClick={() => handleDelete(garden.id)}>supprimer</button>
                            </div>))}
                    </div>
                )}

            </div>
            <div className="crud-vegetable">
                <h2>Gestion des l??gume</h2>
                <div className="vegetable-actions">
                    <button><Link to="/vegetable-option-create" element={<CreateVegetable />} > Ajouter un nouveau l??gume ?? ma liste </Link></button>
                    {/* <button><Link to="/vegetable-option-update" element={<UpdateVegetable />} > Modifier un l??gume </Link></button> */}
                    <button><Link to="/vegetable-option-delete" element={<DeleteVegetable />} > Supprimer un l??gume </Link></button>
                </div>
            </div>
        </div>
    );
};

export default MainCrud;