const Task = require("./task");

class Tasks {
  _list = {};

  get tasksListArray() {
    const list = [];
    Object.keys(this._list).forEach(key => {
      const task = this._list[key];
      list.push(task);
    })
    return list;
  };

  constructor() {
    this._list = {};
  }

  loadTaskFromArray(tasks = []) {
    tasks.forEach(task => {
      this._list[task.id] = task;
    });
  }

  showTaskList(dataArray) {
    dataArray.forEach((task, index) => {
      console.log(`${index + 1}. ${task.desc} :: ${task.completedAt ? 'Completed'.green : 'Pending'.red}`);
    });
  }

  listPendingCompletedTasks(completed = false) {
    let filteredTasks = [];
    if (completed) {
      filteredTasks = this.tasksListArray.filter(task => task.completedAt !== null);
    } else {
      filteredTasks = this.tasksListArray.filter(task => task.completedAt === null);
    }

    this.showTaskList(filteredTasks);
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  completeTask(taskIds = []) {
    this.tasksListArray.forEach(task => {
      if (taskIds.includes(task.id)) {
        if (!task.completedAt) {
          task.completedAt = new Date().toISOString();
        }
      } else {
        task.completedAt = null;
      }
    });
  }

  createTask(description = '') {
    const task = new Task(description);
    this._list[task.id] = task;
  }
}

module.exports = Tasks;