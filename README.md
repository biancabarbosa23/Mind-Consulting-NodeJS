# Backend

Aplicativo mobile feito para cadastrar e gerenciar usuários por nivel de acesso, utilizando autenticação, conexão com o MondoDB.
Nivel de acesso administrativo (999) - Tem acesso a listagem, desativação e alteraração dos usuarios cadastrados.
Nivel de acesso Comum (1) - Tem acesso somente a seu perfil, podendo modifica-lo.
Nivel de acesso desabilitado (0) -  Não tem acesso a plataforma.  


## Importante

-Necessario todas as dependencias do projeto

### Requisitos

 - NodeJs

 
### Iniciando 
```
$ git clone https://github.com/biancabarbosa23/Mind-Consulting-Backend.git
```
```
$ npm install
```
```
$ node /src/index.js 
```


### Rotas

- http://localhost:5000/auth/login (Fazer login nosistema com E-mail ou CPF)[POST]

- http://localhost:5000/auth/cadastro (Criar uma conta no sistema com Nome, Cpf, E-mail e Senha)[POST]

- http://localhost:5000/application/usuarios(Busca os funcionarios cadastrados, temq ue possuir nível de acesso 999)[GET]
 
- http://localhost:5000/application/:id (Atulizar Usuários) [PUT]

- http://localhost:5000/application/:id (Pegar unico usuário com o ID) [GET]


## Autores

* **Bianca Alves**

## Licença
 
 -Nenhuma

## Agradecimentos

* Mind Consulting

