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

const promptTeamMemeber = managerData => {
    console.log(`
    ===== Add a Team Member =====
    `);

    // If there's no team members array property, create one
    if (!managerData.team) {
        managerData.team = [];
    }

    return inquirer.prompt([
        {
            type: 'list',
            name: 'teamMemberChoice',
            message: 'Which type of team member would you like to add?',
            choices: ['Intern', 'Engineer']
        }
    ])
    .then(addMember => {
        managerData.team.push(addMember);
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
            .then(addMember => {
                managerData.team.push(addMember);
                if (addMember.confirmAddMember) {
                    return promptTeamMemeber(managerData);
                } else {
                    return managerData;
                }
            });
        }
        else if (addMember.teamMemberChoice === 'Engineer') {
            console.log(`
            ===== ENGINEER CHOSEN =====
            `);
        }
    });
};

promptUserManager()
    .then(promptTeamMemeber)
    // .then(teamData => {
    //     console.log(teamData);
    // });

