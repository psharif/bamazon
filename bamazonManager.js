var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root123',
  database : 'bamazon'
});

promptManager();

function promptManager(){
    inquirer.prompt([
		{
			type: "list", 
			message: "What Would You Like To Do?",
			choices: ["View Products for Sale",
					  "View Low Inventory",
					  "Add to Inventory",
					  "Add New Product"],
			name: "selection"
		}
	]).then(function(answers){
		switch(answers.selection){
			case "View Products for Sale": 
				managerDisplay();
				break; 
			case "View Low Inventory":
				viewLowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addNewProduct();
				break;
			default: 
				console.log("I'm Sorry We Can't Do That.");
		}
	});
}

function managerDisplay(){
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res){
		if(err) console.log(err);
		//Prints the Table
		console.log();
		console.table(res);
	});

	connection.end();
}

function viewLowInventory(){
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res){
		if(err) console.log(err);
		//Prints the Table
		console.log();
		console.table(res);
	});

	connection.end();
}

function addInventory(){
	inquirer.prompt([
		{
			type: "input", 
			message: "What is the item_id of the product you wanna add more of?",
			name: "item_id",
			validate: function(value) {
	          if (isNaN(value) === false && value >= 0) {
	            return true;
	          }
	          return false;
	        }
		}, 
		{
			type: "input", 
			message: "How much of this product do you want to add?",
			name: "amount",
			validate: function(value) {
	          if (isNaN(value) === false && value >= 0) {
	            return true;
	          }
	          return false;
	        }

		}
	]).then(function(answers){
		connection.query("SELECT stock_quantity, price FROM products WHERE ?", {item_id: answers.item_id}, function(err, res){
			if(err) console.log(err);
			res.forEach(function(item){
				var updatedAmount = item.stock_quantity + parseInt(answers.amount);
				updateInventory(updatedAmount, answers.item_id);
			});
		});
	});
}

function updateInventory(quantity, item_id){
	connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: quantity},{item_id: item_id}], function(err, res){
		if(err) console.log(err);
		console.log(res.affectedRows + " products updated!\n");
	});

	connection.end();
}

function addNewProduct(){
	inquirer.prompt([
		{
			type: "input", 
			message: "What is the name of the new item?",
			name: "itemName",
		},
		{
			type: "input", 
			message: "What is the Department for the Item?",
			name: "deptName",
		},
		{
			type: "input", 
			message: "How Much Do you want to charge for the Item?",
			name: "price",
			validate: function(value) {
	          if (isNaN(value) === false && value >= 0) {
	            return true;
	          }
	          return false;
	        }
		},
		{
			type: "input", 
			message: "How much of this product do you want to add?",
			name: "stock_quantity",
			validate: function(value) {
	          if (isNaN(value) === false && value >= 0) {
	            return true;
	          }
	          return false;
	        }
		}
	]).then(function(answers){
		connection.query("INSERT INTO products SET ?", 
			{
			 product_name: answers.itemName,
			 department_name: answers.deptName,
			 price: answers.price,
			 stock_quantity: answers.stock_quantity
			}, 
			function(err, res){
				if(err) console.log(err);
				console.log("\n" + res.affectedRows + " product inserted!");
				console.log( answers.itemName + " was added.\n")
		});

		connection.end();
	});
}
