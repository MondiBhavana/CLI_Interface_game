
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Get ready for the Quiz? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `You are correct ${playerName}. That's a great answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `You have done a great job !!!`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'Which of the following is Hardware?\n',
    choices: [
      'Operating System',
      'Microsoft Office',
      'Program',
      'Monitor'
    ],
  });

  return handleAnswer(answers.question_1 === 'Monitor');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'Which of the following is software\n',
    choices: [
        'Keyboard',
        'Microsoft Word',
        'Speakers',
        'Mouse',
    ],
  });
  return handleAnswer(answers.question_2 === 'Microsoft Word');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `What do you call the "brain" of the computer\n`,
    choices: [
        'Hard Drive',
        'Central Processing Unit',
        'Database',
        'System Software'
    ],
  });

  return handleAnswer(answers.question_3 === 'Central Processing Unit');
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'Which of the following is NOT a primitive type?\n',
    choices: [
      'boolean',
      'number',
      'null',
      'object', // Correct
    ],
  });
  return handleAnswer(answers.question_4 === 'object');
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message:'Which of the following is an example of an operating system\n',
    choices: [
        'Microsoft Office',
        'Microsoft Word',
        'Microsoft Licenses',
        'Microsoft Windows'
    ],
  });

  return handleAnswer(answers.question_5 === 'Microsoft Windows');
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();