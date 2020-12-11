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


function addMember () {
    inquirer.prompt([
    {
        type: "confirm",
        message: "Add Employee?",
        name: "addEmployee",
    default: true
    }]) .then((ans) => {
    if (ans.confirmEmployee === true){
    inputEmployee();
    } else {
    output();
    return "Done!";
    }
})
}

function employeeInfo () {
    inquirer.prompt([
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
    ]) .then((res)) = async () => {
        if (res.role === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "officeNumber",
                    message: "Enter Office Number"
                }
            ])
        } (res =>{
            console.log(res);
            const manager = new Manager(res.name, res.id, res.email, res.officeNumber)
            teamMembers.push(employeeInfo);
            addMember();
            output();
        })
            if (res.role === "Intern") {
            await inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "Enter School Name"
                }
        ])} (res =>{
            console.log(res);
            const intern = new Intern (res.name, res.id, res.email, res.school);
            teamMembers.push(employeeInfo);
            addMember();
            output();
        }) 
            if (res.role === "Engineer") {
                await inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "Enter Github Link"
                    }
        ])} (res => {
            console.log(res);
            const engineer = new Engineer (res.name. res.id, res.email, res.github);
            teamMembers.push(employeeInfo);
            addMember();
            output();  
        })
}
}

    function output () {
        fs.writeFile(outputPath, render(teamMembers), function (err) {
        if (err) {
        return console.log(err);
        }
        console.log("Success!");
        })
    }

