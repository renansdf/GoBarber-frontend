// A função deste arquivo é pegar os erros gerados pelo YUP, que estão
// estruturados de uma complexa e robusta, e gerar um objeto do tipo
// que o Unform precisa para setar os erros no formulário.
// Esse objeto do Unform só precisa de um PATH (attr "name" do input com erro)
// e uma MENSAGEM (setada por nós na validação do Yup).

// estamos utilizando a validação do yup, e portanto vamos pegar a
// tipagem também de dentro do yup, para ter acesso a todos os attr
// que o yup gerou na hora de criar o erro a partir da validação
import { ValidationError } from 'yup';

// também criamos uma interface própria para pegar de dentro do objeto
// de erros do yup apenas os campos que nos interessam. A key e o tipo dos
// campos que vamos utilizar são ambos string, e portanto vamos
// deixar a notação bem generalizada para inserirmos o que precisarmos.
// estamos fazendo dessa forma pois esse script deve servir para qualquer
// uso dessa validação dentro da nossa aplicação
interface Errors {
  [key: string]: string;
}

// o tipo do erro que recebemos é do yup, e o retorno e do tipo que criamos
export default function getValidationErrors(err: ValidationError): Errors {
  // inicializamos nosso objeto vazio com o tipo que definimos
  const validation: Errors = {};

  // para cada erro que recebemos do yup, vamos rechear nosso objeto com
  // elementos cuja key é o attr path do erro do yup, e o valor é a mensagem.
  // note que essa mensagem foi escrita por nós no momento da inicialização
  // da validação do form na página.
  err.inner.forEach((error) => {
    validation[error.path] = error.message;
  });

  return validation;
}
