DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    department VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO departments (department)
VALUES ("Sales");
INSERT INTO departments (department)
VALUES ("Engineering");
INSERT INTO departments (department)
VALUES ("Legal");
INSERT INTO departments (department)
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
VALUES ("Lead Sales", "100000", 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", "150000", 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Lawyer", "250000", 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Accountant", "300000", 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Representative", "80000", 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", "120000", 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", "190000", 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", "125000", 4);


CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Branda", "Mathison", 1, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Allena", "Chiu", 2, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Laila", "Wagner", 3, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Alexandra", "Sheth", 4, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Elissa", "Covell", 5, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tandra", "Jarrell", 6, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jay", "Frasier", 7, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Veronica", "Lass", 8, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ashton", "Borgia", 5, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jayna", "Lindblad", 6, 2);


-- SELECT e.first_name, e.last_name, e.role_id, e.manager_id, CONCAT(m.first_name ," " ,m.last_name) AS Manager
-- FROM employees e
-- LEFT JOIN employees m ON (m.role_id = e.manager_id);
-- ORDER BY Manager;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department
-- FROM employees
-- JOIN roles on roles.department_id = departments.id
-- JOIN departments on employees.role_id = departments.id;


-- Finds employee id, First, Last name, title, and department

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department
-- FROM departments
-- RIGHT JOIN roles on roles.department_id = departments.id
-- RIGHT JOIN employees on employees.role_id = roles.id;


SELECT e.id, e.first_name, e.last_name, roles.title, departments.department, roles.salary, CONCAT(m.first_name ," " ,m.last_name) AS Manager
FROM departments
RIGHT JOIN roles on roles.department_id = departments.id
RIGHT JOIN employees e on e.role_id = roles.id
LEFT JOIN employees m ON (m.role_id = e.manager_id)
ORDER BY e.id;

