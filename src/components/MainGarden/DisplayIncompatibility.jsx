

const DisplayIncompatibility = ({incompatibleVegetables,getVegetable}) => {
    return (
        <div id="incompatible-vegetable">
            <h3>Légumes incompatibles</h3>
            <ul>
            {incompatibleVegetables.map(vegetableId => 
               <li key={vegetableId}>{getVegetable(vegetableId)}</li> )}
        </ul>
        </div>
    );
};

export default DisplayIncompatibility;