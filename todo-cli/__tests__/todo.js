/* eslint-disable no-undef */
const todoList = require("../todo");
const db = require("../models");

const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

describe("TodoList text Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString(),
    });
  });
  test("Should add new todo", () => {
    const todoItemCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString(),
    });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    overdueCount = overdue(all).length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: yesterday,
    });
    expect(overdue(all).length).toBe(overdueCount + 1);
  });
  test("Retrieval of dueToday items", () => {
    dueTodayCount = dueToday(all).length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
    expect(dueToday(all).length).toBe(dueTodayCount + 1);
  });
  test("Retrieval of dueLater items", () => {
    dueLaterCount = dueLater(all).length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: tomorrow,
    });
    expect(dueLater(all).length).toBe(dueLaterCount + 1);
  });
});

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});

console.log(all);
