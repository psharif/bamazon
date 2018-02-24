# bamazon
A command Line CRUD App that displays products stored in a MySQL database and updates them through node.

## Notes About Running liri.js 
 * Enter npm i or npm install to install the necessary node packages for the app.
 * __'inquirer'__ was used for User Input; __'mysql__' for MySQL for database transactions; 
 	console.table for printing tables.
 * Run the SQL Schema in MySQL to create the necessary databases and tables.

## Ways to run 
 
 Enter node <filename> ['bamazonCustomer.js', 'bamazonManager.js', 'bamazonSupervisor.js']

## Commands 

### node bamazonCustomer.js
1. Displays a table of products available for a customer to purchase. 
2. The customer can choose a product by their id. 
3. Then decide how many they want to buy and the price of their purchase will be displayed to them.


![bamazonCustomer gif](/README_GIFS/bamazonCustomer.gif)

The database will be updated as well. **NOTE: check Database** 

### node bamazonManager.js
1. __View Products For Sale__ Displays The Products and Inventory of Products in bamazon.
2. __View Low Inventory__ Displays The Products That have less than 5 in stock.

![bamazonCustomer gif](/README_GIFS/bamazonManager1.gif)

3. __Add to Inventory__ Adds an amount of a certain item to stock_quantity for the item.
4. __Add New Product__ Adds a new product to the product table. 


![bamazonCustomer gif](/README_GIFS/bamazonManager2.gif)

The database will be updated as well. **NOTE: check Database** 

### node bamazonSupervisor.js
1. __View Product Sales by Department__ Displays the departments sales, overhead costs, 
and Profit (difference of profit - cost)
2. __Create New Department__ Adds a New Department to bamazon.

![bamazonCustomer gif](/README_GIFS/bamazonSupervisor.gif)

The database will be updated as well. **NOTE: check Database** 
     

