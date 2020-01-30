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


// ---------------------------------------------------------------
// Main Menu
// ---------------------------------------------------------------


// Initiate terminal based user interface
async function start_prompt() {
    await inquirer.prompt([
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
                "Update Employee Roles",
                "Exit"]
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


function add_departments_prompt() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Type in the Department name you would like to add?",
        },
        // Then Once those choices have been made
    ]).then(async function (data) {
        // Assign html string to variable from the generateHTML.js file
        const department = data.department
        print(department)
        await add_departments(department)
        // await main_menu_prompt()
    })

}

async function add_departments(department) {
    connection.query(`
    INSERT INTO departments (department)
    VALUES ("${department}");`,
        await function (err, res) {
            if (err) throw err;
            view_all_departments()
        })
    print("\n<<<Updated Departments>>>")

    // main_menu_prompt()
}

// ---------------------------------------------------------------
// Adding a new role √
// ---------------------------------------------------------------

function add_roles_prompt() {
    connection.query(`SELECT * FROM departments`, function (err, res) {
        if (err) throw err;

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
                choices: function () {
                    var depart = [];
                    for (var i = 0; i < res.length; i++) {
                        depart.push(res[i].department)
                        // print(depart)
                    }
                    return depart;
                }
            },
            // Then Once those choices have been made
        ]).then(function (data) {
            // Assign html string to variable from the generateHTML.js file
            const role_name = data.role_name
            print(role_name)
            // Assing username to variable
            const salary = data.salary;
            print(salary)
            // Assing user color to variable
            const department = data.department;
            print(department)
            let department_id = 0;
            connection.query(`SELECT * FROM departments`, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    if (department === res[i].department) {
                        department_id = res[i].id
                    }
                }
                add_roles(role_name, salary, department_id)

            })
        })
    })
}

function add_roles(role_name, salary, department) {
    connection.query(`
    INSERT INTO roles (title, salary, department_id)
    VALUES ("${role_name}", "${salary}", "${department}");`,
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log("\n");
            console.table(res);
        })
    view_all_roles()
    // main_menu_prompt()
}


// ---------------------------------------------------------------
// Adding a new employee √
// ---------------------------------------------------------------

function add_employee_prompt() {
    connection.query(`
    SELECT t1.id, CONCAT(t1.first_name ," " ,t1.last_name) AS full_name, t2.title, t1.manager_id
    FROM (
    SELECT id, first_name, last_name, manager_id,
            ROW_NUMBER() OVER (ORDER BY first_name) AS rn
    FROM employees) AS t1
    LEFT JOIN  (
    SELECT title,
            ROW_NUMBER() OVER (ORDER BY title) AS rn
    FROM roles) AS t2
    ON t1.rn = t2.rn`, function (err, res) {
        if (err) throw err;
        // print(res[0].full_name)
        // print(res[0].title)

        // connection.query(`SELECT * FROM roles`,function (err, res) {
        //     if (err) throw err;

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
                choices: function () {
                    var roles = [];
                    for (var i = 0; i < res.length; i++) {
                        // print(res[i].title)
                        let role = res[i].title
                        if (role !== null) {
                            roles.push(res[i].title)
                        }

                    }
                    return roles;
                }
            },
            {
                type: "rawlist",
                name: "manager",
                message: "What is your employee manager?",
                choices: function () {
                    var managers = [];
                    for (var i = 0; i < res.length; i++) {
                        // print(res[i].full_name)
                        let name = res[i].full_name
                        let id = res[i].manager_id
                        if (id === null) {
                            managers.push(name)
                        }
                    }
                    return managers;
                }
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
            // Assing user color to variable
            const manager = data.manager;
            print(manager)
            // const first_name = "Jeromy"
            // const last_name = "Back"
            // const role = 4
            // const manager = 1
            let role_id = 0;
            for (var i = 1; i < res.length; i++) {
                // print(res[i].title)
                if (role === res[i].title) {
                    role_id = res[i].id
                }
            }
            let manager_id = 0;
            for (var i = 1; i < res.length; i++) {
                // print(res[i].full_name)
                if (manager === res[i].full_name) {
                    manager_id = res[i].id
                }
            }
            add_employee(first_name, last_name, role_id, manager_id)


        })
    })
}


async function add_employee(first_name, last_name, role, manager) {
    await connection.query(`
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ("${first_name}", "${last_name}", ${role}, ${manager});`,
        function (err, res) {
            if (err) throw err;
        })
    view_all_employees()
    // main_menu_prompt()
}




// ---------------------------------------------------------------
// Viewing all Departments 
// ---------------------------------------------------------------


async function view_all_departments() {
    // console.log("Selecting all products...\n");
    await connection.query("SELECT * FROM departments", async function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        await console.table(res);
    })
    // main_menu_prompt()
    await start_prompt()
}


// ---------------------------------------------------------------
// Viewing all Roles
// ---------------------------------------------------------------


function view_all_roles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
    })
    // main_menu_prompt()
    start_prompt()
}

function get_all_roles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        // console.table(res);
        const values = Object.values(res);
        // const roles = []
        const roles = map(values => values.title)
        // print(values[0].title)
        print(roles)

        // for (let i = 0; i < values.length; i++){
        //     // print(values[i].title)
        //     let role = values[i].title
        //     roles.push(role)
        //     // print(roles)
        // }
        // print(roles)
        // return roles

    })
    start_prompt()
    // main_menu_prompt()
}


// ---------------------------------------------------------------
// Viewing all Employees
// ---------------------------------------------------------------


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
        start_prompt()
    // main_menu_prompt()
}


// ---------------------------------------------------------------
// Updating an Employees Role
// ---------------------------------------------------------------

function update_employee_roles_prompt() {
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
    ON t1.rn = t2.rn`, function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "rawlist",
                name: "name",
                message: "Which employee do you want to update?",
                choices: function () {
                    var employee_name = [];
                    for (var i = 0; i < res.length; i++) {
                        // print(res[i].title)
                        let name = res[i].full_name
                        if (name !== null) {
                            let name = res[i].full_name
                            employee_name.push(name)
                        }
                    }
                    return employee_name;
                }
            },
            {
                type: "rawlist",
                name: "new_role",
                message: "What employee role would you like to change the employee to?",
                choices: function () {
                    var roles = [];
                    for (var i = 0; i < res.length; i++) {
                        // print(res[i].title)
                        let role = res[i].title
                        if (role !== null) {
                            roles.push(role)
                        }

                    }
                    return roles;
                }
            },
            {
                type: "rawlist",
                name: "manager",
                message: "Choose Manager for employee to be under?",
                choices: function () {
                    var managers = [];
                    for (var i = 0; i < res.length; i++) {
                        // print(res[i].full_name)
                        let name = res[i].full_name
                        let id = res[i].manager_id
                        if (id === null) {
                            managers.push(name)
                        }
                    }
                    return managers;
                }
            },
            // Then Once those choices have been made
        ]).then(function (data) {
            // Assign html string to variable from the generateHTML.js file
            const name = data.name
            print(name)
            // Assing user color to variable
            const new_role = data.new_role;
            print(new_role)

            // Assing user color to variable
            const manager = data.manager;
            print(manager)

            let id = 0;
            for (var i = 1; i < res.length; i++) {
                let name = res[i].full_name
                if (name === res[i].full_name) {
                    // print(res[i].full_name)
                    id = res[i].id
                    
                }
                
            }
            print(id)
            const new_id = parseInt(id)

            let role_id = 0;
            for (var i = 1; i < res.length; i++) {
                // print(res[i].title)
                if (new_role === res[i].title) {
                    role_id = res[i].id + 1
                }
            }
            print(role_id)
            const new_role_id = parseInt(role_id)
            
            let manager_id = 0;
            for (var i = 1; i < res.length; i++) {
                // print(res[i].full_name)
                if (manager === res[i].full_name) {
                    manager_id = res[i].id
                }
            }
            print(manager_id)
            const new_manager_id = parseInt(manager_id)

            const query = connection.query(`
            UPDATE employees
            SET role_id = ${new_role_id}, manager_id = ${new_manager_id}
            WHERE id = ${new_id};`,
                function (err, res) {
                    print(id)
                    print(role_id)
                    print(manager_id)
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    console.log("\n");
                    // console.table(res);
                    view_all_employees()
                })
                console.log(query.sql);
                // update_employee_roles()


        })
        // main_menu_prompt()

    })
}

const print = x => console.log(x)




// Deciding whether to start over or not

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

