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

4. The database will be updated as well. **NOTE: check Database** 
     
## Notes About Using

If the user decides to use the inquirer to run the commands. It will ask the user if they want to enter more commands, but it might show before the results for each command are printed. Just press up or down on the arrow keys and the prompt will show below the printed results.

![keep Going Prompt](/README_images/keepGoingPrompt.png)
