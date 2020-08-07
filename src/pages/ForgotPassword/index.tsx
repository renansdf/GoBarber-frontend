import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { Link } from 'react-router-dom';

import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface credentialsData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();


  const handleSubmit = useCallback(async (data: credentialsData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Use um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/passwords/forgot', data);

      addToast({
        type: 'success',
        title: 'Email de recuperação enviado',
        message: 'Confira sua caixa de entrada para ver a instruções de recuperação de senha.',
      });

    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return
      }

      addToast({
        type: 'error',
        title: 'Erro na Recuperação',
        message: 'Ocorreu um erro ao recuperar a senha. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, setLoading]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button loading={loading} type="submit">Entrar</Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar ao Logon
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}

export default ForgotPassword;
