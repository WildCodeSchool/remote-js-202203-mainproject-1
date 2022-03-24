const VegetableList = ({ vegetablesList }) => {
  console.log(`liste ${vegetablesList}`);
  return (
    <div>
      <h2>Liste des légumes</h2>
      <ul>
        {vegetablesList.map((vegetable) => (
          <li key={vegetable.id}>{vegetable.name}{vegetable.friendVegetables}</li>
        ))}
      </ul>
    </div>
  );
};

export default VegetableList;

