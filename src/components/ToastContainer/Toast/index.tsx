import React, { useEffect } from 'react';
import { Container } from './styles';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';

// a interface do typescript declara o que o elemento RECEBE.
interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

// um container no React que trabalha variáveis não deve receber a tipagem
// das variáveis que recebe. Ele deve receber a tipagem de um elemento
// que recebe as variáveis que vão ser trabalhadas
const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} hasDescription={!!message.message} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.message && <p>{message.message}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
}

export default Toast;
