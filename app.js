const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const teamMembers = [];


async function employeeInfo () {
    await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Full Name"
        },
        {
            type: "input",
            name: "email",
            message: "Enter Email"
        },
        {
            type: "input",
            name: "id",
            message: "Enter Employee ID"
        },
        {
            type: "list",
            name: "role",
            message: "Choose Role",
            choices: ["Manager", "Intern", "Engineer"]
        },
    ]).then((res) => {
        if (res.role === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "officeNumber",
                    message: "Enter Office Number"
                }
            ]).then((role) => {
                console.log(role);
                const manager = new Manager(res.name, res.id, res.email, role.officeNumber)
                teamMembers.push(manager);
                addMember();
                writeResp();
            })
        } else if (res.role === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "Enter School Name"
                }
            ]).then((role) => {
                console.log(role);
                const intern = new Intern (res.name, res.id, res.email, role.school);
                teamMembers.push(intern);
                addMember();
                writeResp();
            }) 
        } else if (res.role === "Engineer") {
            inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "Enter Github Link"
                    }
            ]).then((role) => {
                console.log(role);
                const engineer = new Engineer (res.name, res.id, res.email, role.github);
                teamMembers.push(engineer);
                addMember();
                writeResp();  
            })
        }
    })
}

employeeInfo();

function addMember() {
    inquirer.prompt([
    {
        type: "list",
        message: "Add Employee?",
        name: "addEmployee",
        choices: ["Yes", "No"]
    }]).then((ans) => {
        if (ans.addEmployee === "Yes"){
        employeeInfo();
        } else {
        writeResp();
        return "Done!";
        }
    })
}

function writeResp () {
    fs.writeFile(outputPath, render(teamMembers), function (err) {
    if (err) {
    return console.log(err);
    }
    console.log("\n Team Member Added");
    })
}