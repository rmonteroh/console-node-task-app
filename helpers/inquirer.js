const colors = require('colors');
const inquirer = require('inquirer');

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you do?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create task`,
      },
      {
        value: '2',
        name: `${'2.'.green} List tasks`,
      },
      {
        value: '3',
        name: `${'3.'.green} List completed tasks`,
      },
      {
        value: '4',
        name: `${'4.'.green} List pending tasks`,
      },
      {
        value: '5',
        name: `${'5.'.green} Complete task(s)`,
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`,
      },
      {
        value: '0',
        name: `${'0.'.green} Exit`,
      }
    ]
  },
];

const inquireMenu = async () => {
  console.clear();
  console.log('======================================='.green);
  console.log('           Select an option            '.white);
  console.log('=======================================\n'.green);

  const {option} = await inquirer.prompt(menuOptions);

  return option;

};

const pause = async () => {
  const question = [{
    type: 'input',
    name: 'enter',
    message: `Press ${'ENTER'.green} to continue`
  }];

  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }
        return true;
      }
    }
  ];

  const {desc} = await inquirer.prompt(question);
  return desc;
};

const listDeleteTask = async (tasks = []) => {
  const choices = tasks.map((task, idx) => {
    return {
      value: task.id,
      name: `${colors.green(idx + 1)} ${task.id}`,
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  });

  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ];

  const {id} = await inquirer.prompt(question);

  return id;
};

const showListTaskCheck = async (tasks = []) => {
  const choices = tasks.map((task, idx) => {
    return {
      value: task.id,
      name: `${colors.green(idx + 1)} ${task.desc}`,
      checked: (task.completedAt) ? true : false,
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ];

  const {ids} = await inquirer.prompt(question);

  return ids;
};

const confirmDeleteTask = async (id = '') => {

  const question = [
    {
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure do you want to delete task ${id}`,
    }
  ];

  const {confirm} = await inquirer.prompt(question);

  return confirm;
};

module.exports = {
  inquireMenu,
  pause,
  readInput,
  listDeleteTask,
  confirmDeleteTask,
  showListTaskCheck,
};