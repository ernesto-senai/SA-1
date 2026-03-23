# SA-1
SA 1 – Situação de Aprendizagem

API de Tarefas (To-Do List)
Uma API RESTful simples para gerenciamento de tarefas, desenvolvida com Node.js e Express. Permite criar, listar, buscar, atualizar e deletar tarefas com validações básicas.

🚀 Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript
Express: Framework web para Node.js
Armazenamento em memória: Dados mantidos em array (sem banco de dados)
📋 Funcionalidades
✅ Criar nova tarefa
✅ Listar todas as tarefas
✅ Buscar tarefa por ID
✅ Atualizar tarefa existente
✅ Deletar tarefa
✅ Validação de título (obrigatório, não vazio)
✅ Validação de status (apenas valores predefinidos)
✅ Prevenção de alteração/exclusão de tarefas concluídas
🏗️ Estrutura da Tarefa
json

Copiar código

Ver tudo
{
  "id": 1,
  "title": "Minha tarefa",
  "description": "Descrição opcional",
  "status": "PENDENTE"
}
Status Possíveis
PENDENTE
EM_ANDAMENTO
CONCLUIDA
🔌 Endpoints da API
1. Criar Tarefa
POST /tasks

Corpo da Requisição:

json

Copiar código

Ver tudo
{
  "title": "Comprar leite",
  "description": "No mercado da esquina",
  "status": "PENDENTE"
}
Resposta (201 Created):

json

Copiar código

Ver tudo
{
  "id": 1,
  "title": "Comprar leite",
  "description": "No mercado da esquina",
  "status": "PENDENTE"
}
Notas:

title é obrigatório e não pode ser vazio
description é opcional (padrão: string vazia)
status é opcional (padrão: PENDENTE)
2. Listar Todas as Tarefas
GET /tasks

Resposta (200 OK):

json

Copiar código

Ver tudo
[
  {
    "id": 1,
    "title": "Comprar leite",
    "description": "No mercado da esquina",
    "status": "PENDENTE"
  }
]
3. Buscar Tarefa por ID
GET /tasks/:id

Resposta (200 OK):

json

Copiar código

Ver tudo
{
  "id": 1,
  "title": "Comprar leite",
  "description": "No mercado da esquina",
  "status": "PENDENTE"
}
Erro (404 Not Found):

json

Copiar código

Ver tudo
{
  "error": "Tarefa não encontrada"
}
4. Atualizar Tarefa
PUT /tasks/:id

Corpo da Requisição (parcial ou completo):

json

Copiar código

Ver tudo
{
  "title": "Comprar leite e pão",
  "status": "EM_ANDAMENTO"
}
Resposta (200 OK):

json

Copiar código

Ver tudo
{
  "id": 1,
  "title": "Comprar leite e pão",
  "description": "No mercado da esquina",
  "status": "EM_ANDAMENTO"
}
Restrições:

Tarefas com status CONCLUIDA não podem ser alteradas
Campos fornecidos são validados (título não vazio, status válido)
Erros Possíveis:

400 Bad Request: Título inválido ou status inválido
400 Bad Request: Tentativa de alterar tarefa concluída
404 Not Found: Tarefa não existe
5. Deletar Tarefa
DELETE /tasks/:id

Resposta:

204 No Content (sucesso, sem corpo)
404 Not Found se a tarefa não existir
Restrições:

Tarefas com status CONCLUIDA podem ser deletadas (não há restrição no código atual, mas considere adicionar se necessário)
⚠️ Possíveis Problemas no Código Atual
Importante: O código fornecido contém alguns bugs que precisam de correção antes do uso:

Rota GET duplicada: A rota GET /tasks/:id está definida como app.get("/tasks", ...) em vez de app.get("/tasks/:id", ...).
Erro no PUT: A função findTaskById(10) usa o valor fixo 10 em vez do id da requisição.
Erro no DELETE: Usa task.id === 10 fixo e tasks.aplice(...) (deveria ser splice).
Sugestão de correção:

javascript

Copiar código

Ver tudo
// GET /tasks/:id - corrigir rota
app.get("/tasks/:id", (req, res) => { ... });

// PUT /tasks/:id - corrigir chamada
const task = findTaskById(id); // em vez de findTaskById(10)

// DELETE /tasks/:id - corrigir
const taskIndex = tasks.findIndex((task) => task.id === id);
tasks.splice(taskIndex, 1); // corrigir spelling
🏃 Como Executar
Instalar dependências:

bash

Copiar código

Ver tudo
npm install express
Salvar o código em um arquivo app.js (após corrigir os bugs mencionados acima).

Executar o servidor:

bash

Copiar código

Ver tudo
node app.js
Testar a API (exemplo com curl):

bash

Copiar código

Ver tudo
# Criar tarefa
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudar Node.js"}'

# Listar tarefas
curl http://localhost:3000/tasks

# Buscar tarefa por ID
curl http://localhost:3000/tasks/1

# Atualizar tarefa
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ANDAMENTO"}'

# Deletar tarefa
curl -X DELETE http://localhost:3000/tasks/1
📝 Notas
Os dados são armazenados em memória (array tasks), então todos os dados são perdidos quando o servidor é reiniciado.
Não há autenticação ou autorização.
Não há persistência em banco de dados.
O ID é gerado sequencialmente a partir de nextID.
