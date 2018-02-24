DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon; 

USE bamazon;  

CREATE TABLE products(
		item_id INT NOT NULL AUTO_INCREMENT,
		product_name VARCHAR(45) NULL,
		department_name VARCHAR(45) NULL,
		price DECIMAL(10,2) NULL,
		stock_quantity INT NULL,
        product_sales DECIMAL(10,2) NULL DEFAULT 0,
		PRIMARY KEY (item_id)
);

CREATE TABLE departments(
		department_id INT NOT NULL AUTO_INCREMENT,
		department_name VARCHAR(45) NULL,
		over_head_costs DECIMAL(10,2) NULL,
		PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES  ("Electronic Keyboard", "Electronics", 50.99, 2),  
	    ("Tap Shoes", "Clothing", 69.50, 4),  
        ("Heart Pendant", "Jewelry", 49.99, 5),
        ("Robot", "Toys", 100.00, 10),
		("Kangaroo Jammies", "Clothing", 24.99, 25),
        ("Mini Pool Table", "Toys", 60.00, 3),
        ("Laptop", "Electronics", 450.00, 10),
        ("Chef Hat", "Clothing", 50.00, 7), 
        ("Cricket Earrings", "Jewelry", 25.99, 8),
        ("Hulk Feet", "Toys", 21.50, 6);

INSERT INTO departments (department_name, over_head_costs) 
VALUES  ("Electronics", 200),  
	    ("Clothing", 300),  
        ("Jewelry", 400),
        ("Toys", 100);