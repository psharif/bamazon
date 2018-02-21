var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root123',
  database : 'bamazon'
});


viewLowInventory();

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

function promptUser(){
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
		connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: quantity},{item_id: item_id}], function(err, res){
		if(err) console.log(err);
		console.log(res.affectedRows + " products updated!\n");
	});
}

function updateInventory(quantity, item_id){
	console.log("The Item ID of the item is " + item_id);
	connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: quantity},{item_id: item_id}], function(err, res){
		if(err) console.log(err);
		console.log(res.affectedRows + " products updated!\n");
	});
}
