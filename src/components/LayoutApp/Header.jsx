import logo from './logo.svg';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header>
        <ul id="nav-main">
          <li id="home">
            <Link to={'/'}>Accueil</Link>
          </li>
          <li id="vegetable">
            <Link to={'/vegetables-list'}>Mes légumes</Link>
          </li>
          <li id="garden">
            <Link to={'/vegetable-garden'}>Mon potager</Link>
          </li>
          <li id="option">
            <Link to={'/vegetable-option'}>Préférences</Link>
          </li>
        </ul>
    </header>

  );
}
export default Header;  