DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Sales");
INSERT INTO departments (name)
VALUES ("Engineering");
INSERT INTO departments (name)
VALUES ("Legal");

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
--     FORIEGN KEY (department_id)
--     REFERENCE (department(id))
    department_id INT NOT NULL,
    PRIMARY KEY (id)

);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", "100000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Person", "100000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", "100000", 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Team Lead", "100000", 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", "100000", 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", "100000", 2);

CREATE TABLE employees (
    id INT  AUTO_INCREMENT ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Red", "Joe", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Orange", "Brock", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Yellow", "Sam", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Green", "Ungle", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Blue", "Felex", 4, 1);


