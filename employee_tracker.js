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


// ---------------------------------------------------------------
// Adding a new departments √
// ---------------------------------------------------------------


async function add_departments_prompt() {
    await inquirer.prompt([
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
        add_departments(department)
    })
    
}

async function add_departments(department) {
    await connection.query(`
    INSERT INTO departments (department)
    VALUES ("${department}");`,
        await function (err, res) {
            if (err) throw err;
        })
    print("\n<<<Updated Departments>>>")
        view_all_departments()
        // main_menu_prompt()
}



// ---------------------------------------------------------------
// Adding a new employee √
// ---------------------------------------------------------------

function add_employee_prompt() {
    connection.query(`SELECT * FROM roles`,function (err, res) {
        if (err) throw err;
        
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
            name: "new_role",
            message: "What employees role would you like to change the employee to?",
            choices: function () {
                var roles = [];
                for (var i = 0; i < res.length; i++) {
                    roles.push(res[i].title)
                }
                return roles;
            }
                //     // Log all results of the SELECT statement
                //     // console.log("\n");
                //     // console.table(res);
                //     // const values=Object.values(res);
                //     // const roles = []
                //     const roles = map(res => res.title)
                //     // print(values[0].title)
                //     print(roles)
                //     return roles
                //     const values=Object.values(res);
                //     const roles = []
                //     // print(values[0].title)
                //     for (let i = 0; i < values.length; i++){
                //         // print(values[i].title)
                //         let role = values[i].title
                //         roles.push(role)
                //         // print(roles)
                //     }
                //     print(roles)
                // }
        
        },
        {
            type: "input",
            name: "manager",
            message: "What is the employees manager?"
        },
        // Then Once those choices have been made
    
    ]).then(function (data) {
        // // Assign html string to variable from the generateHTML.js file
        // const first_name = data.first_name
        // print(first_name)
        // // Assing username to variable
        // const last_name = data.last_name;
        // print(last_name)
        // // Assing user color to variable
        // const role = data.role;
        // print(role)
        // // Assing user color to variable
        // const manager = data.manager;
        // print(manager)
        const first_name = "Jeromy"
        const last_name = "Back"
        const role = 4
        const manager = 1
        add_employee(first_name, last_name, role, manager)
    })
})
}


async function add_employee(first_name, last_name, role, manager) {
    await connection.query(`
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ("${first_name}", "${last_name}", "${role}", "${manager}");`,
        function (err, res) {
            if (err) throw err;
        })
    view_all_employees()
    // main_menu_prompt()
}



// ---------------------------------------------------------------
// Adding a new role √
// ---------------------------------------------------------------

function add_roles_prompt() {
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
            type: "input",
            name: "department",
            message: "What department is it in?"
        },
        // Then Once those choices have been made
    ]).then(async function (data) {
        // Assign html string to variable from the generateHTML.js file
        const role_name = data.role_name
        print(role_name)
        // Assing username to variable
        const salary = data.salary;
        print(salary)
        // Assing user color to variable
        const department = data.department;
        print(department)
        add_roles(role_name, salary, department)
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
// Viewing all Departments
// ---------------------------------------------------------------


function view_all_departments() {
    // console.log("Selecting all products...\n");
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        console.table(res);
    })
    // main_menu_prompt()
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
}

function get_all_roles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        // console.table(res);
        const values=Object.values(res);
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
    // main_menu_prompt()
}


// function get_all_roles() {
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT * FROM roles", function (err, res) {
//             if (err){
//                 return reject(err)
//             };
//             // Log all results of the SELECT statement
//             console.log("\n");
//             // console.table(res);
//             const values=Object.values(res);
//             const roles = []
//             // print(values[0].title)
//             for (let i = 0; i < values.length; i++){
//                 // print(values[i].title)
//                 let role = values[i].title
//                 roles.push(role)
//                 // print(roles)
//             }
//             print(roles)
//             resolve(roles);
            
//         })
//     })
//     // main_menu_prompt()
// }


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
    // main_menu_prompt()
}


// ---------------------------------------------------------------
// Updating an Employees Role
// ---------------------------------------------------------------

function update_employee_roles_prompt() {
    // connection.query(`
    //     SELECT CONCAT(first_name ," " ,last_name)
    //     FROM employees;`,
    //     function (err, res) {
    //         if (err) throw err;
    //         // Log all results of the SELECT statement
    //         console.log("\n");
    //         console.log(res.keys)
    //     })
    inquirer.prompt([
        {
            type: "rawlist",
            name: "new_role",
            message: "Which employee do you want to update?",
            choices: [
                "Person_1",
                "Person_2",

            ]
        },
        {
            type: "rawlist",
            name: "new_role",
            message: "What employees role would you like to change the employee to?",
            choices: [
                "Lead Sales",
                "Lead Engineer",
                "Lead Lawyer",
                "Lead Accountant",
                "Sales Representative",
                "Software Engineer",
                "Lawyer",
                "Accountant"]
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
        // update_employee_roles()
    })
    main_menu_prompt()
}

function update_employee_roles() {
    connection.query(`
        UPDATE employees
        SET role_id = ?, manager_id = ?
        WHERE id = 10;`,
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log("\n");
            console.table(res);
        })
    main_menu_prompt()
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