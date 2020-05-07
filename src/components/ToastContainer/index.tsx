import React from 'react';

import { Container, Toast } from './styles';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages && messages.map((message) => (
        <Toast key={message.id} type={message.type} hasDescription={!!message.message}>

          <FiAlertCircle size={20} />

          <div>
            <strong>{message.title}</strong>
            {message.message && <p>{message.message}</p>}
          </div>

          <button type="button">
            <FiXCircle size={18} />
          </button>

        </Toast>
      ))}
    </Container>
  );
}

export default ToastContainer;
