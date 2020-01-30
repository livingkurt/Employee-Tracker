async function view_all_departments() {
    // console.log("Selecting all products...\n");
    await connection.query("SELECT * FROM departments", async function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("\n");
        await console.table(res);
    })
    // main_menu_prompt()
    // setTimeout(start_prompt(), 1000)
    await start_prompt()
}

module.exports = view_all_departments