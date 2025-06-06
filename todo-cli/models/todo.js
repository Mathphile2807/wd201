// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueList = await this.overdue();

      console.log(
        overdueList.map((todo) => todo.displayableString()).join("\n"),
      );
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayList = await this.dueToday();

      console.log(
        dueTodayList.map((todo) => todo.displayableString()).join("\n"),
      );
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterList = await this.dueLater();

      console.log(
        dueLaterList.map((todo) => todo.displayableString()).join("\n"),
      );
      console.log("\n");
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        const todos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.lt]: today,
            },
          },
        });
        return todos;
      } catch (error) {
        console.error(error);
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try {
        const todos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.eq]: today,
            },
          },
        });
        return todos;
      } catch (error) {
        console.error(error);
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const todos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.gt]: today,
            },
          },
        });
        return todos;
      } catch (error) {
        console.error(error);
      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
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
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      if (this.dueDate !== today)
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      else return `${this.id}. ${checkbox} ${this.title}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
