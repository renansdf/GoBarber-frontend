import React, { InputHTMLAttributes, useRef, useEffect, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

//Importação base para manipulação de form de dentro do Unform
import { useField } from '@unform/core';

// Criamos uma interface para capturar e utilizar atributos customizados
// que estão sendo declarados nas páginas onde este componente está
// sendo utilizado
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  // useRef do React nos permite referênciar um elemento HTML
  // que estamos criando dentro do componente. isso é útil toda
  // vez que precisamos manipular ou acessar algum elemento.
  // Use a tipagem adequada para melhorar ainda mais a manipulação.
  const inputRef = useRef<HTMLInputElement>(null);

  // O useField de dentro do rocketseat/Unform é a principal função
  // para manipulação de forms. De dentro dela queremos utilizar o
  // registerField para capturar os dados do usuário. O registerField
  // possui alguns campos obrigatórios (ver abaixo).
  // useField precisa ser inicializado com o "name" do input.
  const { fieldName, registerField, error, defaultValue } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // toda vez que uma função for inicializada dentro de outra função,
  // devemos usar o useCallback para registrar esta função apenas
  // uma vez. Caso contrário, toda vez que a função mãe for
  // renderizada, as funções filhas serão também.
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    // Os três campos obrigatórios do registerField estão abaixo.
    // name: usamos fieldName de dentro de useField para termos um campo
    // já trabalhado e livre de erros.
    // ref: É o elemento HTML ao qual estamos nos referindo. Aqui usamos
    // o inputRef definido acima, acrescido do .current que é onde ficam
    // os dados que queremos acessar
    // path: É o dado dentro do elemento que desejamos registrar, nesse
    // caso é o value do input.
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        // tagueamos esse elemento com o inputRef que definimos acima, para
        // que possamos acessar a referência HTML dele para acessá-lo ou
        // manipula-lo quando for necessário.
        ref={inputRef}
        {...rest}
      />
      {/* Error está sendo setado pelo setError do unform no signUp */}
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53333" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
