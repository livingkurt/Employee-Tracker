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
INSERT INTO departments (name)
VALUES ("Finance");

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
VALUES ("Salesperson", "80000", 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", "150000", 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", "120000", 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", "125000", 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", "250000", 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", "190000", 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Financial Team Lead", "300000", 4);





CREATE TABLE employees (
    id INT  AUTO_INCREMENT ,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Branda", "Mathison", 7, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Allena", "Chiu", 1, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Laila", "Wagner", 6, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Alexandra", "Sheth", 4, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Elissa", "Covell", 5, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tandra", "Jarrell", 8, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jay", "Frasier", 3, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Veronica", "Lass", 5, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ashton", "Borgia", 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jayna", "Lindblad", 4, 3);

-- SELECT employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, employees.manager;
-- FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year;
-- top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position;

