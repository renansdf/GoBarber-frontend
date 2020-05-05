import React, { useRef, useCallback, useContext } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../utils/getValidationErrors';
import AuthContext from '../context/authContext';

import { Container, Content, Background } from './styles';
import logoImg from '../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../components/Input';
import Button from '../components/Button';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { name } = useContext(AuthContext);
  console.log(name);

  // por ser uma função dentro de um componente, usamos a notação
  // de useCallback do React
  const handleSubmit = useCallback(async (data: object) => {
    try {
      // setErrors é uma função do Unform. Iniciamos ela com um valor vazio
      // na tentativa de validação. Mais sobre essa função no catch
      formRef.current?.setErrors({});

      // no Yup, declaramos um "schema" de validação e atribuimos a ele um formato.
      // O formato (shape) é um objeto que contém os mesmos campos do Form.
      const schema = Yup.object().shape({
        // Declaramos tipos e validações de forma encadeada, já passando erros
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
        password: Yup.string().required('Senha Obrigatória'),
      });

      // Usamos o método validate assíncrono para resolver nossa requisição.
      // O método pode receber um objeto com opções.
      await schema.validate(data, {
        // abortEarly informa se o yup vai ejetar assim que encontrar um erro,
        // ou se vai fazer todas as validações e retornar todos os erros.
        abortEarly: false,
      });

    } catch (err) {
      // Errors é um objeto contendo a key = path do elemento com erro e o value
      // sendo a mensagem de erro associada a esse path no yup
      const errors = getValidationErrors(err);
      // No formulário, como tipamos o formRef com os formHandles do unform,
      // temos acesso a função setErrors que recebe um objeto e trabalha atribuindo
      // a mensagem de erro ao caminho determinados dentro do objeto recebido
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="create">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
}

export default SignIn;
