require('colors');
const { inquireMenu, pause, readInput, listDeleteTask, confirmDeleteTask, showListTaskCheck } = require('./helpers/inquirer');
const { saveFile, readFile } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');


const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDb = readFile();
  if (tasksDb) {
    tasks.loadTaskFromArray(tasksDb);
  }

  do {
    // Show menu
    opt = await inquireMenu();

    switch (opt) {
      case '1':
        // Create option
        const description = await readInput('Description');
        tasks.createTask(description);
        break;
      case '2':
        // Show tasks list
        tasks.showTaskList(tasks.tasksListArray);
        break;
      case '3':
        // Show completed tasks list
        tasks.listPendingCompletedTasks(true);
        break;
      case '4':
        // Show pending tasks list
        tasks.listPendingCompletedTasks(false);
        break;
      case '5':
        // Show pending tasks list
        const ids = await showListTaskCheck(tasks.tasksListArray);
        tasks.completeTask(ids);
        break;
      case '6':
        // Show pending tasks list
        const id = await listDeleteTask(tasks.tasksListArray);
        if (id !== '0') {
          const confirm = await confirmDeleteTask(id);
          if (confirm) {
            tasks.deleteTask(id);
            console.log('Task deleted');
          }
        }
        break;
    }
    // Save data in file
    saveFile(tasks.tasksListArray);

    if (opt !== '0') await pause();
  } while (opt !== '0');

};

console.clear();
main();