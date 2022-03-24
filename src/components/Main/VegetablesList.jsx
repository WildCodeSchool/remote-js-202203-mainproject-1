import { Link } from 'react-router-dom';

const VegetableList = ({ vegetablesList }) => {
  

  return (
    <div>
      <h1 className='title-list'>Liste des légumes</h1>
      <ul className="container-card">
        
        {vegetablesList.map((vegetable) => (
            <div className="card-vegetable" key={vegetable.id}>
              <img className="card-picture" alt="card picture"></img>
              <h2>{vegetable.name}</h2>
              <div className='sowing-cover'>
                <span>Semis en intérieur de {vegetable.startingSowingCover} à {vegetable.endingSowingCover}</span>
              </div>
              <div className='sowing-ground'>
                <span>Semis en extérieur de {vegetable.startingSowingGround} à {vegetable.endingSowingGround}</span>
              </div>
              <div className='harvest'>
                <span>Récolte de {vegetable.startingHarvest} à {vegetable.endingHarvest}</span>
              </div>
              <div className='nav-details'>
                <Link to={'/vegetable/:id'}>Détails</Link>
              </div>
            </div>
        ))}
      </ul>
    </div>
    
  );
  };

export default VegetableList;

