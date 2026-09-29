# Projeto Expo – Agenda de Contatos

## Visão geral
Aplicativo móvel desenvolvido com **React Native** e **Expo** que permite:
- Cadastro e login de usuário usando **Firebase Authentication** (e‑mail e senha).
- CRUD completo de contatos (nome, e‑mail, telefone) armazenado no **Realtime Database** do Firebase.
- Interface modernizada: layout mais compacto (máx 500 px), cores suaves, sombras e botões com estados de hover.

## Funcionalidades principais
- **Autenticação** (login / cadastro) via Firebase.
- **Lista de contatos** com edição e exclusão inline.
- **Logout** simples.
- **Design renovado** (largura máxima de 500 px, fundo claro, cartões com sombra, botões maiores e mais claros).

## Configuração do ambiente
1. **Node.js** – Instale a versão LTS.
2. **Expo CLI** – `npm i -g expo-cli`.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. **Firebase** – Crie um projeto no console do Firebase e habilite:
   - **Authentication** → método *E‑mail/senha*.
   - **Realtime Database** → modo *Teste* (ou defina regras de segurança).
   - Substitua as credenciais em `firebaseConfig.js` (já feito).

## Como rodar
```bash
npx expo start --web   # modo web (http://localhost:8081)
# ou
npx expo start         # para dispositivos móveis via Expo Go
```

## Estrutura de pastas
```
Projeto/
 └─ teste/               # raiz do app Expo
     ├─ assets/          # imagens estáticas
     ├─ node_modules/   # dependências (não versionar)
     ├─ screens/        # telas: Tela1 (login), Tela2 (agenda), Cadastro (registro)
     ├─ firebaseConfig.js
     ├─ App.js
     ├─ package.json
     └─ ...
```

## UI Melhorada
- Largura máxima reduzida para **500 px**, centralizada.
- Fundo claro `#F7F9FC` e cartão branco com sombra.
- Botões azuis/verde/vermelho com sombras sutis.
- Campos de entrada com fundo `#F8FAFC` e bordas mais suaves.
- Lista com cabeçalho em tons de cinza claro e botões de ação discretos.

## Licença
MIT © 2026 Kaiky Gonçalves Alves Okino.
