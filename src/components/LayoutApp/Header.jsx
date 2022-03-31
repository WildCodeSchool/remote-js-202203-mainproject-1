import logo from './logo.svg';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header>

      <img src={logo} className="logo" alt="logo" />
      <nav className="nav">
        <ul>
          <li>
            <Link to={'/'} className="link" activeClassName="active" exact>Accueil</Link>
          </li>
          <li>
            <Link to={'/vegetables-list'} className="link" activeClassName="active" exact>Liste des légumes</Link>
          </li>
          <li>
            <Link to={'/vegetable-garden'} className="link" activeClassName="active" exact>Mon potager</Link>
          </li>
        </ul>
      </nav>

    </header>

  );
}
export default Header;  