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
                add_departments_prompt();
                break;
            case "Add Roles":
                add_roles_prompt()
                break;
            case "Add Employee":
                add_employee_prompt();
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
                update_employee_roles_prompt()
                break;
            default:
                break;
        }
    })
}

function add_departments_prompt() {
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
        add_departments()

    })
    main_menu_prompt()
}

function add_departments() {

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
        add_employee()
    })
    main_menu_prompt()
}

function add_employee() {

}



function add_roles_prompt() {
    inquirer.prompt([
        {
            type: "raw_input",
            name: "role",
            choices: [
                "Team Lead",
                "CEO",
                "CFO",
                "Janitor"]
        },
        // Then Once those choices have been made
    ]).then(function (data) {
        // Assign html string to variable from the generateHTML.js file
        const role = data.role
        print(role)
        add_roles()
    })
    main_menu_prompt()
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
    main_menu_prompt()
}

function view_all_roles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
    })
    main_menu_prompt()
}

function view_all_employees() {
    connection.query(`
        SELECT e.id, e.first_name, e.last_name, roles.title, departments.department, roles.salary, CONCAT(m.first_name ," " ,m.last_name) AS Manager
        FROM departments
        RIGHT JOIN roles on roles.department_id = departments.id
        RIGHT JOIN employees e on e.role_id = roles.id
        LEFT JOIN employees m ON (m.role_id = e.manager_id)
        ORDER BY e.id;`, 
    function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
    })
    main_menu_prompt()
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
        update_employee_roles()
    })
    main_menu_prompt()
}

function update_employee_roles() {

}

const print = x => console.log(x)

// main_menu_prompt()

function main_menu_prompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "menu",
            message: "Back to main menu?",
        },
    ]).then(function (data) {
        const menu = data.menu;
        print(menu)
        if (menu) {
            start_prompt()
        }
        else {
            connection.end();
        }
    })
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