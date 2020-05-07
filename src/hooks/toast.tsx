// Este arquivo precisa criar o "contexto" de Toast que vai ser utilizado
// pela aplicação, e nesse processo contamos com duas funções de dentro
// do react: createContext e useContext.

import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

// Importamos também o componente que abriga a visualização do toast
import ToastContainer from '../components/ToastContainer';

// Tipagem base para a definição do conteúdo deste contexto
interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  message?: string;
}

// Inicialização do contexto já declarando suas funcionalidades
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

// Criação do PROVIDER que precisa existir no React para que possamos enviar
// dados deste componente para outros utilizando as variáveis do contexto.
// Este componente vai ser usado por fora dos outros componentes da aplicação
// que precisam acessar os dados deste contexto
const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, message }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();
    const toast = {
      id,
      type,
      title,
      message
    }
    setMessages((state) => [...state, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter(state => state.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {/* CHILDREN informa que o que quer que exista dentro deste provider
      quando for declarado deve ser exibido.
      TOASTCONTAINER é a nossa visualização do toast, que também pode ser
      inserido aqui neste contexto para deixar o código bem isolado */}
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}

// Método que permite inicializar o contexto criado em algum lugar da aplicação.
// Só pode ser utilizado quando o componente que o invoca está dentro do
// componente que provê os dados, no caso o ToastProvider (declarado acima).
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Context must be used inside ToastContext.Provider');
  }
  // Dentro deste contexto estão todos os métodos declarados dentro do ToastProvider.
  // Eles poderão ser desestruturados e utilizados no componente que o invocar.
  return context;
};

export { ToastProvider, useToast }
