module.exports = function add_departments_prompt() {
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
            
        })
    print("\n<<<Updated Departments>>>")
    view_all_departments()
    // main_menu_prompt()
}


