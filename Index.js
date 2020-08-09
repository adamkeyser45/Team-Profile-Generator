const fs = require('fs');
const inquirer = require('inquirer');
const pageTemplate = require('./src/page-template.js');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// array that will hold all of the created employees
let teamData = [];

//function that starts the program
const init = () => {
    console.log(`
============================================
  Welcocme to the Dev Team Page Builder!
Follow the prompts below to build your team.
============================================

`);
    return inquirer.prompt(promptUserManager)
};

// inquirer questions concerning the manager
const promptUserManager = [
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
];

// function that asks the inqurier questions about the interns and engineers
const promptTeamMember = () => {
    console.log(`
===== Add a Team Member =====
    `);

    return inquirer.prompt([
        {
            type: 'list',
            name: 'teamMemberChoice',
            message: 'Which type of team member would you like to add?',
            choices: ['Intern', 'Engineer']
        }
    ])
    .then(addMember => {
        // if the INTERN choice is picked
        if (addMember.teamMemberChoice === 'Intern') {
            console.log(`
===== INTERN CHOSEN =====
            `);
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'internName',
                    message: "What is the intern's name?",
                    validate: internName => {
                        if (internName) {
                            return true;
                        } else {
                            console.log("Please enter the intern's name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'internId',
                    message: "What is the intern's ID#?",
                    validate: internId => {
                        if (internId > 0) {
                            return true;
                        } else {
                            console.log("Please enter a number that is greater than 0!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'internEmail',
                    message: "What is the intern's email address?",
                    validate: internEmail => {
                        if (internEmail) {
                            return true;
                        } else {
                            console.log("Please enter the intern's email!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'internSchool',
                    message: "What school is the intern from?",
                    validate: internSchool => {
                        if (internSchool) {
                            return true;
                        } else {
                            console.log("Please enter the intern's school!");
                            return false;
                        }
                    }
                },
                {
                    type: 'confirm',
                    name: 'confirmAddMember',
                    message: 'Would you like to enter another team member?',
                    default: false
                }
            ])
            .then(answers => {
                // creates a new Intern and pushes it to the teamData array
                const intern = new Intern(
                    answers.internName,
                    answers.internId,
                    answers.internEmail,
                    answers.internSchool);
                teamData.push(intern);
                if (answers.confirmAddMember) {
                    return promptTeamMember();
                } else {
                    return;
                }
            });
        }
        // if the ENGINEER choice is picked
        else if (addMember.teamMemberChoice === 'Engineer') {
            console.log(`
===== ENGINEER CHOSEN =====
            `);
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'engineerName',
                    message: "What is the engineer's name?",
                    validate: engineerName => {
                        if (engineerName) {
                            return true;
                        } else {
                            console.log("Please enter the engineer's name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'engineerId',
                    message: "What is the engineer's ID#?",
                    validate: engineerId => {
                        if (engineerId > 0) {
                            return true;
                        } else {
                            console.log("Please enter a number that is greater than 0!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'engineerEmail',
                    message: "What is the engineer's email address?",
                    validate: engineerEmail => {
                        if (engineerEmail) {
                            return true;
                        } else {
                            console.log("Please enter the engineer's email!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'engineerGithub',
                    message: "What is the engineer's GitHub profile name?",
                    validate: engineerGithub => {
                        if (engineerGithub) {
                            return true;
                        } else {
                            console.log("Please enter the engineer's GitHub profile name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'confirm',
                    name: 'confirmAddMember',
                    message: 'Would you like to enter another team member?',
                    default: false
                }
            ])
            .then(answers => {
                // a new Engineer is created and sent to the teamData Array
                const engineer = new Engineer(
                    answers.engineerName,
                    answers.engineerId,
                    answers.engineerEmail,
                    answers.engineerGithub);
                teamData.push(engineer);
                if (answers.confirmAddMember) {
                    return promptTeamMember();
                } else {
                    return;
                }
            });
        }
    });
};

// function to write the index.html file in the dist/ folder
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) throw err;
        console.log('Your Dev Team Page has been created! Be sure to check it out in the dist folder!');
    });
};

// function calls and promise chain for the program
init()
    .then(answers => {
        // creates a new manager and sends it to the teamData array
        const manager = new Manager(
            answers.managerName, 
            answers.managerId, 
            answers.managerEmail, 
            answers.managerOffice);
        teamData.push(manager);
    })
    .then(promptTeamMember)
    .then(completeArr => {
        completeArr = teamData;
        return pageTemplate(completeArr);
    })
    .then(completeTemplate => {
        return writeFile(completeTemplate);
    })
    .catch(err => {
        console.log(err);
    });

    