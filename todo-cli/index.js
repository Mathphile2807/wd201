//index.js

const { connect } = require("./connectDB");
const Todo = require("./TodoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Second Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created todo with id ${todo.id}`);
  } catch (error) {
    console.error(error);
  }
};

const countItems = async () => {
  try {
    const totalCount = await Todo.count();
    console.log(`Found ${totalCount} number of entries.`);
  } catch (error) {
    console.error(error);
  }
};

const getAllTodo = async () => {
  try {
    const todos = await Todo.findAll();
    const todoList = todos.map((todo) => todo.displayString()).join("\n");
    console.log(todoList);
  } catch (error) {
    console.error(error);
  }
};

const getOneTodo = async () => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: "3",
      },
    });
    console.log(todo.displayString());
  } catch (error) {
    console.error(error);
  }
};

const updateItem = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteItem = async () => {
  try {
    const deleteCount = await Todo.destroy({
      where: {
        completed: true,
      },
    });
    console.log(`No of rows deleted: ${deleteCount}`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await createTodo();
  await countItems();
  await getAllTodo();
  await getOneTodo();
  await updateItem(3);
  await deleteItem();
  await getAllTodo();
})();
