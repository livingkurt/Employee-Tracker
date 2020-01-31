// Calling inquirer for the terminal based interface
const inquirer = require("inquirer");
const mysql = require("mysql");

// Create the connection information for the sql database
var connection = mysql.createConnection({
    // Set what the url will be
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
    // Start prompt after connection has been made
    start_prompt();
});

// ---------------------------------------------------------------
// Main Menu
// ---------------------------------------------------------------

// Initiate terminal based user interface
function start_prompt() {
    inquirer.prompt([
        // Ask user where they would like to navigate to in the database
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
                "Update Employee Roles",
                "Exit"]
        },
        // Then Once those choices have been made
    ]).then(function (data) {
        // Assign answer to variable
        const navigation = data.navigation
        // Depending on what the user chooses, the user will be routed to a different function
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
            case "Exit":
                // update_employee_roles_prompt()
                print("\n<<<Exiting Database\n")
                break;
            default:
                break;
        }
    })
}
// ---------------------------------------------------------------
// Adding a new departments √
// ---------------------------------------------------------------

// Get the name of the new department from user
function add_departments_prompt() {
    // Asks user what they would like to call a department
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Type in the Department name you would like to add?",
        },
        // Then Once those choices have been made
    ]).then(function (data) {
        // Assign the department name to a variable
        const department = data.department
        print(department)
        // Call the function to place the new department into database
        add_departments(department)
    })

}
// Place the new department into database
function add_departments(department) {
    // Create a connection with the database to update the departments table with a new row
    connection.query(`
    INSERT INTO departments (department)
    VALUES ("${department}");`, function (err, res) {
        // If there is an error throw it
        if (err) throw err;
    })
    // Status Log
    print("\n<<<Updated Departments>>>")
    // Call the function to view the updated table in terminal
    view_all_departments()
}

// ---------------------------------------------------------------
// Adding a new role √
// ---------------------------------------------------------------

// Get information regarding a employee role you would like to add into the database
function add_roles_prompt() {
    // Create a connection with the database to read all of the departments to autopopulate one of your prompt questions
    connection.query(`SELECT * FROM departments`, function (err, res) {
        // If there is an error throw it
        if (err) throw err;
        // Asks user infromation about the role
        inquirer.prompt([
            {
                type: "input",
                name: "role_name",
                message: "What is the role called?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the base salary?"
            },
            {
                type: "rawlist",
                name: "department",
                message: "What department is it in?",
                // Creates an array from the response from the departments table
                choices: res.map(depart => depart.department)
            },
            // Then Once those choices have been made
        ]).then(function (data) {
            // Assign role name to variable
            const role_name = data.role_name
            print(role_name)
            // Assing salary to variable
            const salary = data.salary;
            print(salary)
            // Assing department_name to variable
            const department = data.department;
            print(department)
            // Initialize a variable
            let department_id = 0;
            // Look back in the departments table
            connection.query(`SELECT * FROM departments`, function (err, res) {
                // If there is an error throw it
                if (err) throw err;
                // Loops through response from database 
                for (var i = 0; i < res.length; i++) {
                    // If the department name is equal to a department in the database
                    if (department === res[i].department) {
                        // Set a variable to the id associated with that name
                        department_id = res[i].id
                    }
                }
                // Call the function to place the new role into database
                add_roles(role_name, salary, department_id)

            })
        })
    })
}

// Place the new role into database
function add_roles(role_name, salary, department) {
    // Create a connection with the database to update the roles table with a new row
    connection.query(`
    INSERT INTO roles (title, salary, department_id)
    VALUES ("${role_name}", "${salary}", "${department}");`, function (err, res) {
        // If there is an error throw it
        if (err) throw err;
    })
    // Call the function to view the updated table in terminal
    view_all_roles()
}


// ---------------------------------------------------------------
// Adding a new employee √
// ---------------------------------------------------------------

// Get the information of the new employee from user
function add_employee_prompt() {
    // Get a of the employees and managers as to use them in an array in the prompts below
    connection.query(`
    SELECT t1.id, CONCAT(t1.first_name ," " ,t1.last_name) AS full_name, t1.manager_id,  t2.title, t2.id AS role_id
    FROM (
    SELECT id, first_name, last_name, manager_id,
            ROW_NUMBER() OVER (ORDER BY first_name) AS rn
    FROM employees) AS t1
    LEFT JOIN  (
    SELECT id, title,
            ROW_NUMBER() OVER (ORDER BY id) AS rn
    FROM roles) AS t2
    ON t1.rn = t2.rn;`, function (err, res) {
        // If there is an error throw it
        if (err) throw err;
        // Asks user information about new employee
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
                type: "rawlist",
                name: "role",
                message: "What employees role would you like to change the employee to?",
                // Creates an array from the response from the roles table, removes the null and filters out the empty string so that just roles show up
                choices: res.map(role => role.title ? role.title : "").filter(title => title != "")
            },
            {
                type: "rawlist",
                name: "manager",
                message: "What is your employee manager?",
                // Creates an array from the response from the roles table, removes the null and filters out the empty string so that just managers show up and not employees
                choices: res.map(name => name.manager_id ? "" : name.full_name).filter(name => name != "")
            },

        ]).then(function (data) {
            // Assign first_name to variable 
            const first_name = data.first_name
            // Assing last_name to variable
            const last_name = data.last_name;
            // Assing role to variable
            const role = data.role;
            // Assing manager to variable
            const manager = data.manager;
            // Searches inside of response for a role title that matches the user choice
            const employee_data = res.find((role_name) => role_name.title === role)
            // Gets the role id associated with that choice
            const role_id_id = employee_data.role_id
            // Searches inside of response for a manager name that matches the user choice
            const manager_data = res.find((manager_name) => manager_name.full_name === manager)
            // Gets the manager id associated with that choice
            const manager_id = manager_data.id
            // Call the function to place the new employee into database
            add_employee(first_name, last_name, role_id_id, manager_id)
        })
    })
}




function add_employee(first_name, last_name, role, manager) {
    // Create a connection with the database to update the employee table with a new row
    connection.query(`
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ("${first_name}", "${last_name}", ${role}, ${manager});`, function (err, res) {
        // If there is an error throw it
        if (err) throw err;
    })
    // Call the function to view the updated table in terminal
    view_all_employees()
}




// ---------------------------------------------------------------
// Viewing all Departments 
// ---------------------------------------------------------------

// View the departments table in console
function view_all_departments() {
    // Create a connection with the database to show the departments table
    connection.query("SELECT * FROM departments", function (err, res) {
        // If there is an error throw it
        if (err) throw err;
        // Print the table to the terminal
        console.log("\n");
        console.table(res);
    })
    // Bring User back to main menu
    start_prompt()
}


// ---------------------------------------------------------------
// Viewing all Roles
// ---------------------------------------------------------------

// View the departments table in console
function view_all_roles() {
    // Create a connection with the database to show the roles table
    connection.query("SELECT * FROM roles", function (err, res) {
        // If there is an error throw it
        if (err) throw err;
        // Print the table to the terminal
        console.log("\n");
        console.table(res);
    })
    // Bring User back to main menu
    start_prompt()
}

// ---------------------------------------------------------------
// Viewing all Employees
// ---------------------------------------------------------------

// View the departments table in console
function view_all_employees() {
    // Create a connection with the database to show the employees table with information from the 2 other tables
    connection.query(`
    SELECT e.id, e.first_name, e.last_name, roles.title, departments.department, roles.salary, CONCAT(m.first_name ," " ,m.last_name) AS Manager
    FROM departments
    RIGHT JOIN roles on roles.department_id = departments.id
    RIGHT JOIN employees e on e.role_id = roles.id
    LEFT JOIN employees m ON (m.role_id = e.manager_id)
    ORDER BY e.id;`, function (err, res) {
        // If there is an error throw it
        if (err) throw err;
        // Print the table to the terminal
        console.log("\n");
        console.table(res);
    })
    // Bring User back to main menu
    start_prompt()
}


// ---------------------------------------------------------------
// Updating an Employees Role
// ---------------------------------------------------------------

// Updates existing employee with new information
function update_employee_roles_prompt() {
    // Get a of the employees and managers as to use them in an array in the prompts below
    connection.query(`
    SELECT t1.id, CONCAT(t1.first_name ," " ,t1.last_name) AS full_name, t1.manager_id,  t2.title, t2.id AS role_id
    FROM (
    SELECT id, first_name, last_name, manager_id, ROW_NUMBER() OVER (ORDER BY first_name) AS rn
    FROM employees) AS t1
    LEFT JOIN  (
    SELECT id, title, ROW_NUMBER() OVER (ORDER BY id) AS rn
    FROM roles) AS t2
    ON t1.rn = t2.rn`, function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "rawlist",
                name: "name",
                message: "Which employee do you want to update?",
                // Creates an array from the response from the roles table, removes the null and filters out the empty string so that just employees show up and not managers
                choices: res.map(name => name.manager_id ? name.full_name : "").filter(name => name != "")
            },
            {
                type: "rawlist",
                name: "new_role",
                message: "What employee role would you like to change the employee to?",
                // Creates an array from the response from the roles table, removes the null and filters out the empty string so that just roles show up
                choices: res.map(role => role.title ? role.title : "").filter(title => title != "")
            },
            {
                type: "rawlist",
                name: "manager",
                message: "Choose Manager for employee to be under?",
                // Creates an array from the response from the roles table, removes the null and filters out the empty string so that just managers show up and not employees
                choices: res.map(name => name.manager_id ? "" : name.full_name).filter(name => name != "")
            },
            // Then Once those choices have been made
        ]).then(function (data) {
            // Assign html string to variable from the generateHTML.js file
            const name = data.name
            // Assing user color to variable
            const new_role = data.new_role;
            // Assing user color to variable
            const manager = data.manager;
            // Searches inside of response for a manager name that matches the user choice
            const employee_data = res.find((employee_name) => employee_name.full_name === name)
            // Gets the employee id associated with that choice
            const id = employee_data.id
            // Searches inside of response for a role title that matches the user choice
            const role_data = res.find((role_name) => {
                // if the role title = the chosen title
                if (role_name.title === new_role) {
                    // Return the role id associated with it
                    return role_name.role_id
                }
            })
            const role_id = role_data.role_id
            // Searches inside of response for a manager name that matches the user choice
            const manager_data = res.find((manager_name) => manager_name.full_name === manager)
            // Gets the manager id associated with that choice
            const manager_id = manager_data.id
            // Update employee in database
            const query = connection.query(`
            UPDATE employees
            SET role_id = ${role_id}, manager_id = ${manager_id}
            WHERE id = ${id};`,
                function (err, res) {
                    if (err) throw err;
                    view_all_employees()
                })
        })
    })
}

const print = x => console.log(x)

