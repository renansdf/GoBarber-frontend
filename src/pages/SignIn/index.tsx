import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Link } from 'react-router-dom';

import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface credentialsData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  // por ser uma função dentro de um componente, usamos a notação
  // de useCallback do React
  const handleSubmit = useCallback(async (data: credentialsData) => {
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

      await signIn({
        email: data.email,
        password: data.password
      });

    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        // Errors é um objeto contendo a key = path do elemento com erro e o value
        // sendo a mensagem de erro associada a esse path no yup
        const errors = getValidationErrors(err);
        // No formulário, como tipamos o formRef com os formHandles do unform,
        // temos acesso a função setErrors que recebe um objeto e trabalha atribuindo
        // a mensagem de erro ao caminho determinados dentro do objeto recebido
        formRef.current?.setErrors(errors);
        return
      }

      addToast({
        type: 'error',
        title: 'Erro no Login',
        message: 'email e/ou senha inválidos',
      });
    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default SignIn;
