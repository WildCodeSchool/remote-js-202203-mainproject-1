import picture from '../../media/homePictureGuarden.jpg';

function Home() {

  return (
    <section id="home">
      <h1>Bienvenue sur le site potager compatible</h1>
      <img src={picture} className="home-picture" alt="home picture" />


    </section>
  );
}
export default Home;