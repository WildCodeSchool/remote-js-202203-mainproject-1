import logo from './logo.svg';
const Header = () => {
  return (
    <header>
      <img src={logo} className="logo" alt="logo" />
      <nav className="nav">
        <ul>
          <li className="li-nav">Jardin</li>           
          <li className="li-nav">Légumes</li>         
        </ul>
      </nav>
    </header>

  );
};
export default Header;  