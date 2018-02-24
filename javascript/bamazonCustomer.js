var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root123',
  database : 'bamazon'
});


customerDisplay();

function customerDisplay(){
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
		if(err) console.log(err);
		//Prints the Table
		console.log();
		console.table(res);
		userPurchase();
	});
}

function userPurchase(){
	inquirer.prompt([
		{
			type: "input", 
			message: "What is the item_id of the product you are trying to buy?",
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
			message: "How many do you want to purchase?",
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
				if(item.stock_quantity >= answers.amount){
					var updatedAmount = item.stock_quantity - answers.amount;
					var productSales = answers.amount * item.price;
					updateInventory(updatedAmount, answers.item_id, productSales);
					console.log("\nYour Total For this Purchase is: $" + productSales.toFixed(2));
				}
				else
					console.log("Insufficient quantity!");
			});
		});
	});
}

function updateInventory(quantity, item_id, productSales){
	connection.query("UPDATE products SET ? WHERE ?",
		[
			{
				stock_quantity: quantity, 
				product_sales: productSales
			},
			{
				item_id: item_id
			}
		], function(err, res){
		if(err) console.log(err);
		console.log(res.affectedRows + " products updated!\n");
	});

	connection.end();
}
