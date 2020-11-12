# Credere Teste Front-end

[Tecnologias](#hammer-tecnologias) | 
[Executando o projeto](#computer-executando-o-projeto)

---

## :hammer: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Vuex](https://vuex.vuejs.org/)
- [JSON server](https://github.com/typicode/json-server)


## :cloud: Deploy

Esse projeto foi configurado para deploy automático no netlify.
Pode conferir no link:
[https://credere-frontend-test.netlify.app/](https://credere-frontend-test.netlify.app/)

> Obs.: Na aplicação online os dados a serem criados não persistirão. Serão exibidos apenas os dados cadastrados previamente na API "mockada".


## :computer: Executando o projeto

1 - Clone o repositório
```bash
# Clone este repositório
$ git clone git@https://github.com/GiovanniOliveira75/credere-frontend.git
```

2 - Instale as dependências do projeto
```bash
# Instale as dependências
$ npm install

ou

$ yarn
```

3 - "Descomente" a variável com a url da api de desenvolvimento e comente a de produção
```javascript
//Dev URL
// const api = "http://localhost:3000";

//Production URL
const api =
  "https://my-json-server.typicode.com/GiovanniOliveira75/credere-frontend";
```

4 - Por fim, execute o projeto
```bash
# Execute o projeto
$ npm run start

ou

# Para executar o projeto vue
$ npm run serve

# Para executar a API com JSON server
$ npm run api
```

> Obs.: Para os componentes funcionarem corretamente deve-se rodar a API com o mock de dados.

Feito com :yellow_heart: by [Giovanni Oliveira]()
