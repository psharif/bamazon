DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon; 

USE bamazon; 

CREATE TABLE products(
		item_id INT NOT NULL AUTO_INCREMENT,
		product_name VARCHAR(45) NULL,
		department_name VARCHAR(45) NULL,
		price DECIMAL(10,2) NULL,
		stock_quantity INT NULL,
		PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES  ("Electronic Keyboard", "Electronics", 50.99, 20),  
	    ("Tap Shoes", "Clothing", 69.50, 10),  
        ("Heart Pendant", "Jewelry", 49.99, 12),
        ("Robot", "Toys", 100.00, 20),
		("Kangaroo Jammies", "Clothing", 24.99, 25),
        ("Mini Pool Table", "Toys", 60.00, 10),
        ("Laptop", "Electronics", 450.00, 10),
        ("Chef Hat", "Clothing", 50.00, 14), 
        ("Cricket Earrings", "Jewelry", 25.99, 8),
        ("Hulk Feet", "Toys", 21.50, 10);