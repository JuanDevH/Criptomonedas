import { useEffect, useState } from 'react';
import styled from 'styled-components';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import Axios from 'axios';

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
  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, setCriptoMoneda ] = useState('');
  const [ resultado, setResultado ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // We avoid the first execution
      if(moneda === '') return;

      // check the api to get the quote
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await Axios.get(url);

      // show spinner
      setCargando(true);

      // hide the spinner and show the result
      setTimeout(() => {
        // change charging status
        setCargando(false);

        // save quote
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }
      cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // show spinner or result
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>

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

        <Formulario 
          setMoneda={setMoneda}
          setCriptoMoneda={setCriptoMoneda}
        />

        {componente}
      </div>
    </Contenedor>
  );
}

export default App;