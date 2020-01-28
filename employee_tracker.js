// Calling inquirer for the terminal based interface
const inquirer = require("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "dbpassword",
    database: "employee_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start_prompt();
});


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
            default:
                break;
        }
    })
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

function add_employee_prompt() {
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

function add_employee() {

}



function add_roles_prompt() {
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

function add_roles() {

}



function view_all_departments() {
    // console.log("Selecting all products...\n");
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
    })
    start_prompt()
}

function view_all_roles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
    })
    start_prompt()
}

function view_all_employees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
    })
    start_prompt()
}

function update_employee_roles_prompt() {
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

function update_employee_roles() {

}

const print = x => console.log(x)

// start_prompt()



function end_read() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}


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