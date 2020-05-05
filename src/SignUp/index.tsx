import React, { useCallback, useRef } from 'react';
import { Container, Content, Background } from './styles';
import logoImg from '../assets/logo.svg';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../utils/getValidationErrors';

// Para fazer a validação do Form com o Yup, podemos
// desestruturar o conteúdo do pacote, mas nesse caso
// vamos importar todas as funções dentro de uma variável Yup
import * as Yup from 'yup';

import Input from '../components/Input';
import Button from '../components/Button';

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

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
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
        password: Yup.string().min(6, 'Mínimo de 6 digitos'),
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
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="create">
          <FiArrowLeft />
          voltar para o Logon
        </a>
      </Content>

    </Container>
  );
};

export default SignUp;
