const inquirer = require('inquirer');
const generatePage = require('./utils/generatePage.js');
const { writeFile, copyFile } = require('./utils/generatePage.js');

const promptUserManager = () => {
    console.log("Welcocme to the Dev Team Page Builder! Follow the prompts below to build your team.");
    return inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the team manager's name?",
            validate: managerName => {
                if (managerName) {
                    return true;
                } else {
                    console.log("Please enter the team manager's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the team manager's ID#?",
            validate: managerId => {
                if (managerId > 0) {
                    return true;
                } else {
                    console.log("Please enter a number that is greater than 0!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the team manager's email address?",
            validate: managerEmail => {
                if (managerEmail) {
                    return true;
                } else {
                    console.log("Please enter the team manager's email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerOffice',
            message: "What is the team manager's office number?",
            validate: managerOffice => {
                if (managerOffice > 0) {
                    return true;
                } else {
                    console.log("Please enter a number that is greater than 0!");
                    return false;
                }
            }
        }
    ])
};

promptUserManager()
    .then(teamData => {
        console.log(teamData);
    });

