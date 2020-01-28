DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) 
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT NOT NULL,

);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name INT NOT NULL AUTO_INCREMENT,
    last_name VARCHAR(45) NULL,
    role_id DECIMAL(10,2) NULL,
    manager_id INT NULL,
);


-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("chocolate", 3.10, 120);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("strawberry", 3.25, 75);

