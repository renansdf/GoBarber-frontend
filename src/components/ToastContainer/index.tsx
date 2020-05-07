import React from 'react';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';
import { useTransition } from 'react-spring';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  // o Use transition recebe três parâmetros, o objeto que vamos animar
  // uma função que retorna a key desse objeto e um objeto contendo a
  // animação que deve ser executada
  const animatedMessages = useTransition(
    messages,
    messages => messages.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    }
  );

  return (
    <Container>
      {animatedMessages && animatedMessages.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
}

export default ToastContainer;
