const Messages = [
  {
    code: 'no_connection',
    message: 'Sem conexão.',
  },
  {
    code: 'connectionless_servers',
    message:
      'Sem conexão com os servidores. Por favor, tente novamente em alguns instantes.',
  },
  {
    code: 'press_to_exit',
    message: 'Pressione novamente para sair.',
  },
  {
    code: 'check_your_connection',
    message: 'Verifique sua conexão com a internet.',
  },
  {
    code: 'connect_to_listen',
    message:
      'Verifique sua conexão com a internet. Por favor conecte-se a internet para ouvir.',
  },
  {
    code: 'E02',
    message: '',
  },
];

const getMessage = code => {
  return Messages.find(message => {
    return message.code === code;
  });
};

export default getMessage;
