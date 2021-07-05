import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptonomeda';
import Axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Formulario = ({setMoneda, setCriptoMoneda}) => {

    // state of the cryptocurrency list
    const [ listacripto, setListaCripto ] = useState([]);
    const [ error, setError ] = useState(false);

    const MONEDAS = [
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'VEN', nombre: 'Bolivares' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'COL', nombre: 'Peso Colombiano' },
        { codigo: 'USD', nombre: 'Dolar estadounidense' }
    ];

    // Use useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // Use useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    // Execute API call
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);

            setListaCripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    
    // when user submits
    const handleSubmit = e => {
        e.preventDefault();

        // validate if both fields are filled
        if(moneda === '' || criptomoneda === '' ) {
            setError(true);
            return;
        }

        // pass data to main component
        setError(false);
        setMoneda(moneda);
        setCriptoMoneda(criptomoneda)
    }

    return (  
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="todos los campos son obligatorios" /> : null }
            <SelectMonedas />

            <SelectCripto />

            <Boton 
                type="submit"
                value="calcular"
            />
        </form>
    );
}
 
export default Formulario;