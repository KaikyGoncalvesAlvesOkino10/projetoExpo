# Projeto Expo – Agenda de Contatos

## Stack Tecnológica
- **React Native** 0.81.5 com **Expo SDK 54**
- **React Navigation** (Native Stack) para navegação entre telas
- **Firebase** v12.19.0:
  - **Authentication** – Login e cadastro por e-mail/senha
  - **Realtime Database** – CRUD de contatos (nome, e-mail, telefone)

## Estrutura de Telas
1. **Tela1 (Login)** – `screens/Tela1.js` – Formulário de login com validação e tratamento de erros do Firebase.
2. **Cadastro** – `screens/Cadastro.js` – Formulário para criação de nova conta com validação de senha (mínimo 6 caracteres).
3. **Tela2 (Home)** – `screens/Tela2.js` – Tela principal com CRUD completo de contatos e botão de logout.

## Configuração do Firebase
- Arquivo: `firebaseConfig.js`
- Projeto: `projeto-a2954`
- Serviços exportados: `app`, `auth`, `database`

## Design / UI
- Layout centralizado com largura máxima de 500px
- Fundo claro (#F7F9FC) com cartões brancos e sombras
- Paleta de cores: azul (#3182CE), verde (#38A169), vermelho (#E53E3E)
- Campos de entrada com fundo sutil (#F8FAFC) e bordas suaves

## Versão do Expo
Leia a documentação versionada em https://docs.expo.dev/versions/v54.0.0/ antes de escrever qualquer código.
