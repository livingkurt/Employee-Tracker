// Calling inquirer for the terminal based interface
const inquirer = require("inquirer");

// Initiate terminal based user interface

function start_prompt() {
    inquirer.prompt([
        // Ask user to input username
        {
            type: "rawlist",
            name: "navigation",
            message: "What would you like to do",
            choices: [
                "Add Departments",
                "Add Roles",
                "Add Employee",
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Update Employee Roles"]
        },
    ]).then(function (data) {
        const navigation = data.navigation
        switch (navigation) {
            case "Add Departments":
                add_departments();
                break;
            case "Add Roles":
                add_roles()
                break;
            case "Add Employee":
                add_employee();
                break;
            case "View All Departments":
                view_all_departments()
                break;
            case "View All Roles":
                view_all_roles();
                break;
            case "View All Employees":
                view_all_employees()
                break;
            case "Update Employee Roles":
                update_employee_roles()
                break;
        }
    })
}


function add_employee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is your employees first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is your employees last name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is your employees role?"
        },
        // Then Once those choices have been made
    ]).then(function (data) {
        // Assign html string to variable from the generateHTML.js file
        const first_name = data.first_name
        print(first_name)
        // Assing username to variable
        const last_name = data.last_name;
        print(last_name)
        // Assing user color to variable
        const role = data.role;
        print(role)

    })
    start_prompt()
}

function add_roles() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "Type in the role name would you like to add?",
        },
        // Then Once those choices have been made
    ]).then(function (data) {
        // Assign html string to variable from the generateHTML.js file
        const role = data.role
        print(role)

    })
    start_prompt()
}

function add_departments() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Type in the Department name you would like to add?",
        },
        // Then Once those choices have been made
    ]).then(function (data) {
        // Assign html string to variable from the generateHTML.js file
        const department = data.department
        print(department)

    })
    start_prompt()
}

function view_all_departments() {
    start_prompt()
}

function view_all_roles() {
    start_prompt()
}

function view_all_employees() {
    start_prompt()
}

function update_employee_roles() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is your employees first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is your employees last name?"
        },
        {
            type: "input",
            name: "new_role",
            message: "What employees role would you like to change the employee to?"
        },
        // Then Once those choices have been made
    ]).then(function (data) {
        // Assign html string to variable from the generateHTML.js file
        const first_name = data.first_name
        print(first_name)
        // Assing username to variable
        const last_name = data.last_name;
        print(last_name)
        // Assing user color to variable
        const new_role = data.new_role;
        print(new_role)

    })
    start_prompt()
}




const print = x => console.log(x)

start_prompt()


    // function start_prompt() {
    //     inquirer.prompt([
    //         // Ask user to input username
    //         {
    //             type: "rawlist",
    //             name: "navigation",
    //             message: "What would you like to do",
    //             choices: [
    //                 "View All Employees by Department",
    //                 "View All Employees by Manager",
    //                 "Add Employee",
    //                 "Remove Employee",
    //                 "View All Employees",
    //                 "Update Employee Roles",
    //                 "Update Employee Manager",
    //                 "View All Roles",
    //                 "Add Roles",
    //                 "Remove Roles",
    //             ]).then(function (data) {
    //                 const navigation = data.navigation
    //                 if (navigation === 'Add Employee' || navigation === 'Remove Employee') {
    //                     employee_modificaiton();
    //                 }

    //             }
    // }

    // function employee_modificaiton() {
    //     inquirer.prompt([
    //         {
    //             type: "input",
    //             name: "first_name",
    //             message: "What is your employees first name?",
    //         },
    //         {
    //             type: "input",
    //             name: "last_name",
    //             message: "What is your employees last name?"
    //         },
    //         {
    //             type: "input",
    //             name: "role",
    //             message: "What is your employees role?"
    //         },
    //         {
    //             type: "input",
    //             name: "manager",
    //             message: "Who is the employee manager?"
    //         },


    //         // Then Once those choices have been made
    //     ]).then(function (data) {
    //         // Create a variable with there username combined with a string containing the .pdf extension
    //         const navigation = data.navigation
    //         // Assign html string to variable from the generateHTML.js file
    //         const first_name = data.first_name
    //         // Assing username to variable
    //         const last_name = data.last_name;
    //         // Assing user color to variable
    //         const role = data.role;
    //         // Assing user color to variable
    //         const manager = data.manager;

    //     })