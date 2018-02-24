var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root123',
  database : 'bamazon'
});

promptSupervisor();

function promptSupervisor(){
	console.log();
    inquirer.prompt([
		{
			type: "list", 
			message: "What Would You Like To Do?",
			choices: [
				"View Product Sales by Department",
   				"Create New Department"
			],
			name: "selection"
		}
	]).then(function(answers){
		switch(answers.selection){
			case "View Product Sales by Department": 
				viewProductSales();
				break; 
			case "Create New Department":
				createNewDepartment();
				break;
			default: 
				console.log("I'm Sorry We Can't Do That.");
		}
	});
}

function viewProductSales(){
	var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, "
			  + "t1.product_sales, t1.product_sales-departments.over_head_costs AS total_profit "
			  + "FROM departments JOIN" 
			  + "(SELECT SUM(product_sales) AS product_sales, department_name FROM products GROUP BY department_name) "
			  + "AS t1 ON departments.department_name = t1.department_name";
	connection.query(query, function(err, res){
		if(err) console.log(err);
		//Prints the Table
		console.log();
		console.table(res);
	});

	connection.end();
	
}

function createNewDepartment(){
	inquirer.prompt([
		{
			type: "input", 
			message: "What is the Name of the New Department?",
			name: "deptName",
		},
		{
			type: "input", 
			message: "What is the Over Head Cost For the Department?",
			name: "over_head_costs",
			validate: function(value) {
	          if (isNaN(value) === false && value >= 0) {
	            return true;
	          }
	          return false;
	        }
		}
	]).then(function(answers){
		connection.query("INSERT INTO departments SET ?", 
			{
			 department_name: answers.deptName,
			 over_head_costs: answers.over_head_costs,
			}, 
			function(err, res){
				if(err) console.log(err);
				console.log("\n" + res.affectedRows + " product inserted!");
				console.log(answers.deptName + " was added.\n")
		});

		connection.end();
	});
}