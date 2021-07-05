import styled from 'styled-components';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';

const Contenedor = styled.div`
  max-width : 900px;
  margin: 0 auto;
  @media(min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 45px;
  margin: 80px 0 50px 0;

  &::after {
    content: '';
    width: 80px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {
  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen Crypto"
        />
      </div>

      <div>
        <Heading>COTIZA CRIPTOMONEDAS AL INSTANTE</Heading>

        <Formulario />
      </div>
    </Contenedor>
  );
}

export default App;
