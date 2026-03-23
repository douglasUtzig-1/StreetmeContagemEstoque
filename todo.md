# ERP Cafeteria - Sistema de Contagem de Estoque

Este documento descreve o status atual do projeto e os próximos passos para a integração com um banco de dados.

## 🚀 Status Atual

O sistema atual é uma aplicação web responsiva (mobile-first) para contagem de estoque, com as seguintes funcionalidades:

- **Interface Mobile-First:** Projetada para facilidade de uso em dispositivos móveis, com inputs grandes e scroll vertical contínuo.
- **Lista Fixa de Produtos:** Produtos pré-definidos para contagem.
- **Campos de Entrada:** Para cada produto, é possível registrar a 'Quantidade Aberta', 'Quantidade Fechada' e marcar como 'ACABOU'.
- **Validação:** Lógica para garantir que, se um produto não 'ACABOU', pelo menos um campo numérico seja preenchido.
- **Persistência Local:** Os dados são salvos automaticamente no `localStorage` do navegador, garantindo que o progresso não seja perdido ao recarregar a página.

## 🎯 Próximos Passos: Integração com Banco de Dados

Para evoluir este sistema para uma solução mais robusta e escalável, a próxima etapa crucial é a integração com um banco de dados. Abaixo está um roteiro sugerido:

### 1. Escolha do Banco de Dados e Backend

Considerar opções como:

- **SQL:** PostgreSQL, MySQL (para maior compatibilidade com o scaffold `web-db-user` do Manus).
- **NoSQL:** MongoDB (para flexibilidade de esquema, se os requisitos de dados forem menos estruturados).

Para o backend, pode-se utilizar:

- **Node.js com Express:** Leve e eficiente para APIs RESTful.
- **Python com Flask/Django:** Para projetos que exigem mais lógica de negócio ou integração com outras ferramentas Python.

### 2. Definição do Esquema do Banco de Dados

Criar tabelas ou coleções para armazenar:

- **Produtos:** `id`, `nome_produto`.
- **Inventário/Contagem:** `id`, `produto_id`, `quantidade_aberta`, `quantidade_fechada`, `status_acabou`, `data_contagem`, `usuario_id` (para rastrear quem fez a contagem).

### 3. Desenvolvimento da API Backend

Implementar endpoints RESTful para:

- **GET /products:** Listar todos os produtos.
- **GET /inventory/:productId:** Obter o histórico de contagens de um produto.
- **POST /inventory:** Registrar uma nova contagem de estoque.
- **PUT /inventory/:id:** Atualizar uma contagem existente.

### 4. Adaptação do Frontend para a API

Modificar `app.js` para:

- **Carregar produtos:** Em vez de uma lista fixa, buscar produtos da API.
- **Salvar dados:** Enviar os dados de contagem para a API, em vez de usar `localStorage`.
- **Autenticação:** Implementar um sistema de autenticação (ex: JWT) para proteger as rotas da API e identificar o usuário que realiza a contagem.

### 5. Gerenciamento de Estado Global

Considerar o uso de bibliotecas como Redux, Zustand ou Context API (React) para gerenciar o estado da aplicação de forma mais eficiente, especialmente após a integração com a API.

## ✅ Tarefas Concluídas

- Criação da estrutura básica HTML, CSS e JavaScript.
- Implementação da lista de produtos fixa.
- Lógica de inputs numéricos e checkbox 'ACABOU'.
- Validação básica dos campos.
- Persistência de dados via `localStorage`.
- Interface mobile-first.

## 🚧 Próximos Passos Imediatos

- Revisão do código para otimização e comentários.
- Preparação para a entrega da versão atual ao usuário.
