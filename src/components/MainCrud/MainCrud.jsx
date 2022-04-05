import { Link } from "react-router-dom";

import Create from "./Create";
import Delete from "./Delete";
import Update from "./Update";


const MainCrud = ({vegetablesList}) => {

    
    return (
        <div className="menu-crud">
            <h1>Menu</h1>
            <button><Link to="/vegetable-option-create" element={<Create />} > Ajouter un nouveau légume à ma liste </Link></button>
            <button><Link to="/vegetable-option-update" element={<Update />} > Modifier un légume </Link></button>
            <button><Link to="/vegetable-option-delete" element={<Delete />} > Supprimer un légume </Link></button>
        </div>
    );
};

export default MainCrud;