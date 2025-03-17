# Make Your Burger
Um aplicativo web completo para criação e gerenciamento de pedidos de hambúrgueres personalizados, desenvolvido com Vue.js 3.

## 📋 Sobre o Projeto
Make Your Burger é uma aplicação full-stack que permite aos usuários criar hambúrgueres personalizados, escolhendo entre diferentes tipos de pães, carnes e ingredientes opcionais. Os pedidos são enviados para um painel administrativo onde podem ser gerenciados e atualizados de acordo com seu status de preparação.

### 🚀 Funcionalidades
- Criação de Pedidos : Interface intuitiva para montagem de hambúrgueres personalizados
- Painel Administrativo : Gerenciamento de pedidos com atualização de status
- Feedback em Tempo Real : Notificações sobre o status dos pedidos
- Design Responsivo : Experiência otimizada em dispositivos móveis e desktop

## 📸 Capturas de Tela
![Captura de Tela 1]
![Captura de Tela 2]

## 🛠️ Tecnologias Utilizadas
- Frontend : Vue.js 3, Vue Router
- Backend : JSON Server (simulação de API REST)
- Estilização : CSS com Scoped Styling
- Gerenciamento de Estado : Reatividade nativa do Vue.js

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js (v14 ou superior)
- npm (v6 ou superior)

### Passos para Instalação
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/make-your-burger.git
cd make-your-burger
 ```

2. Instale as dependências:
```bash
npm install
 ```

3. Inicie o servidor de desenvolvimento:
```bash
npm run serve
 ```

4. Em outro terminal, inicie o backend (JSON Server):
```bash
npm run backend
 ```

5. Acesse a aplicação em: http://localhost:8080


## 📚 Estrutura do Projeto
```
make-your-burger/
├── db/                  # Banco de dados JSON para o backend
│   └── db.json          # Dados de ingredientes e pedidos
├── public/              # Arquivos públicos
│   └── img/             # Imagens estáticas
├── src/                 # Código-fonte da aplicação
│   ├── components/      # Componentes Vue reutilizáveis
│   │   ├── BurgerForm.vue     # Formulário para criação de hambúrgueres
│   │   ├── Dashboard.vue      # Painel de gerenciamento de pedidos
│   │   ├── Footer.vue         # Rodapé da aplicação
│   │   ├── LoadingSpinner.vue # Componente de carregamento
│   │   ├── Message.vue        # Componente de mensagens de feedback
│   │   └── Navbar.vue         # Barra de navegação
│   ├── views/           # Páginas da aplicação
│   │   ├── Home.vue           # Página inicial com formulário
│   │   └── Pedidos.vue        # Página de gerenciamento de pedidos
│   ├── router/          # Configuração de rotas
│   ├── App.vue          # Componente raiz
│   └── main.js          # Ponto de entrada da aplicação
└── package.json         # Dependências e scripts
 ```

## 🖥️ Uso da Aplicação
### Criando um Pedido
1. Acesse a página inicial
2. Preencha o formulário com seu nome
3. Selecione o tipo de pão
4. Escolha o tipo de carne
5. Selecione os ingredientes opcionais desejados
6. Clique em "Criar meu Burger!"

### Gerenciando Pedidos
1. Acesse a página "Pedidos"
2. Visualize todos os pedidos realizados
3. Atualize o status de cada pedido usando o menu dropdown
4. Cancele pedidos usando o botão "Cancelar"

## 🧪 Scripts Disponíveis
- npm run serve : Inicia o servidor de desenvolvimento
- npm run build : Compila e minifica para produção
- npm run backend : Inicia o servidor JSON para simular a API

## 📝 Fluxo de Dados
1. Criação de Pedido :
   - Usuário preenche o formulário
   - Dados são enviados via POST para http://localhost:3000/burgers
   - Feedback é exibido ao usuário
2. Gerenciamento de Pedidos :
   - Pedidos são carregados via GET de http://localhost:3000/burgers
   - Status são atualizados via PATCH para http://localhost:3000/burgers/:id
   - Pedidos são excluídos via DELETE para http://localhost:3000/burgers/:id

## 🤝 Contribuição
Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do projeto
2. Crie uma branch para sua feature ( git checkout -b feature/nova-feature )
3. Faça commit das alterações ( git commit -m 'Adiciona nova feature' )
4. Faça push para a branch ( git push origin feature/nova-feature )
5. Abra um Pull Request

## 📞 Contato
Fabio Henrique - fabiohvp2012@gmail.com