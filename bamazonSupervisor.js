var mysql = require('mysql');
var inquirer = require('inquirer');

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

function managerDisplay(){
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res){
		if(err) console.log(err);
		console.log("\n*****ITEMS******")
		res.forEach(function(item){
			console.log("----------------------------");
			for(key in item){
				if (key === "price")
					console.log(key + ": $" + item[key].toFixed(2));
				else
					console.log(key + ": " + item[key]);
			}
			console.log("----------------------------");
		});
	});
}

function viewLowInventory(){
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res){
		if(err) console.log(err);
		console.log("\n***** LOW INVENTORY ITEMS******")
		res.forEach(function(item){
			console.log("----------------------------");
			for(key in item){
				if (key === "price")
					console.log(key + ": $" + item[key].toFixed(2));
				else
					console.log(key + ": " + item[key]);
			}
			console.log("----------------------------");
		});
	});
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
	console.log("The Item ID of the item is " + item_id);
	connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: quantity},{item_id: item_id}], function(err, res){
		if(err) console.log(err);
		console.log(res.affectedRows + " products updated!\n");
	});
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
				console.log(res.affectedRows + " product inserted!\n");
				console.log( answers.itemName + " was added.\n")
		});
	});
}