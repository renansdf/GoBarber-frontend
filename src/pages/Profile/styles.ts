import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  min-height: 142px;
  background-color: #24262b;
  display: flex;
  align-items: center;

  > div{
    width: 90%;
    max-width: 1120px;
    margin: 0 auto;

    svg{
      color: #f4ede8;
      width: 24px;
      height: 24px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: -174px auto 0;

  form{
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
      width: 100%;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;

  img{
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label{
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: #ff9000;
    border: none;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    transition: background-color 0.2s;

    input{
      display: none;
    }

    svg{
      width: 20px;
      height: 20px;
      color: #24262b
    }

    &:hover{
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;
