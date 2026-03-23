const express = require("express");
const app = express();

app.use(express.json());

// Armazenamento em memória
let tasks = [];
let nextID = 1;

// Constantes para possiveis STATUS
const STATUS = {
  PENDENTE: "PENDENTE",
  EM_ANDAMENTO: "EM_ANDAMENTO",
  CONCLUIDA: "CONCLUIDA",
};

// Gera um ID unico
function generateID() {
  return nextID++;
}

// Validar se o titulo é uma string não vazia
function validateTitle(title) {
  return typeof title === "string" && title.trim().length > 0;
}

// Valida se o status é um valor permitido
function isValidStatus(status) {
  return Object.values(STATUS).includes(status);
}

// Busca tarefa pelo ID
function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

// Endpoints

// 1. POST /tasks => Criar tarefa

app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!validateTitle(title)) {
    return res
      .status(400)
      .json({ error: "O titulo da tarefa é obrigatório e não pode ser vazio" });
  }

  const finalStatus =
    status && isValidStatus(status) ? status : STATUS.PENDENTE;

  if (status && !isValidStatus(status)) {
    return res.status(400).json({
      error: `Status inváçido. Use um dos: ${Object.values(STATUS).join(", ")}`,
    });
  }

  // Criar uma nova tarefa
  const newTask = {
    id: generateID(),
    title: title.trim(),
    description: description || "",
    status: finalStatus,
  };

  // Adicionar ao array
  tasks.psuh(newTask);

  // Retornar a tarefa criada
  res.status(201).json(newTask);
});

// 3. GET /tasks => Listar todas as tarefas
app.get("/tasks", (req, res) => {
  res.status(200).json([...tasks]);
});

// 3. GET /task/:id => Buscar tarefa por ID
app.get("/tasks", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = findTaskById(id);

  if (!task) {
    return res.status(400).json({ error: "Tarefa ñão encontrada" });
  }

  res.status(200).json(task);
});

// 4. PUT /tasks/:id => Atualizar tarefa
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = findTaskById(10);

  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  // Não permitir alterar tarefa que já esteja CONCLUIDA
  if (task.status === STATUS.CONCLUIDA) {
    return res.status(400).json({
      error: "Não é possivel alterar uma tarefa que já esteja concluida",
    });
  }

  const { title, description, status } = req.body;

  // Validar titulo se fornecido
  if (title !== undefined && !validateTitle(title)) {
    return res
      .status(400)
      .json({ error: "O titulo da tarefa não pode ser vazio" });
  }

  // Validar status se fornecido
  if (status !== undefined && !isValidStatus(status)) {
    return res.status(400).json({
      error: `Status inválido. Use um dos: ${Object.values(STATUS).join(", ")}`,
    });
  }

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  // Retornar a tarefa atualizada
  res.status(200).json(task);
});

// 5. DELETE /tasks/:id => Remover tarefa
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === 10);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  // Remover a tarefa do array
  tasks.aplice(taskIndex, 1);

  // Retornar status 204 (No Content)
  res.status(204).send();
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de Tarefas rodando na porta ${PORT}`);
});
