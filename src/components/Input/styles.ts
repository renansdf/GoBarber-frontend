import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface inputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
// Adicionamos uma interface para tipar este elemento
// a fim de manipular atributos HTML que foram
// adicionados a ele nas páginas onde ele está
// sendo utilizado
export const Container = styled.div<inputProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #666360;

  /*
    usamos a notação "dolar e aspas" para acessar javascript dentro
    do css, e usamos "css" para acessar estilos dentro
    do javascript. Aqui acessamos os atributos JSX declarados
    no elemento e fazemos uma verificação para mudar os estilos
    quando convêniente
  */
  ${(props) => props.isErrored && css`
    border-color: #c53333;
  `}

  ${(props) => props.isFocused && css`
    border-color: #ff9000;
    color: #ff9000;
  `}

  ${(props) => props.isFilled && css`
    color: #ff9000;
  `}

  & + div{
    margin-top: 8px;
  }

  input{
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;

    &::placeholder{
      color: #666360;
    }
  }
  svg{
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg{
    margin-right: 0;
  }

  span{
    background: #c53030;
    color: #fff;

    &::before{
      border-color: #c53030 transparent;
    }
  }
`;
