INSERT INTO department (name)
VALUES ('Marketing'),
('Finance'),
('Human Resources'),
('Production'),
('Development'),
('Quality Management'),
('Sales'),
('Research'),
('Customer Service');


INSERT INTO role (title, salary, department_id)
VALUES ('Staff',83000,9),
('Senior Engineer',120000,5),
('Engineer',100000,5),
('Senior Engineer',130000,6),
('Assistant Engineer',65000,5),
('Senior Staff',100000,3),
('Senior Engineer',130000,6),
('Staff',83000,1),
('Senior Engineer',120000,8),
('Engineer',110000,7),
('Senior Engineer',130000,6),
('Assistant Engineer',65000,5),
('Senior Staff',100000,2),
('Senior Engineer',130000,4),
('Staff',83000,3),
('Senior Staff',100000,9),
('Senior Staff',150000,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bezalel','Simmel',4,NULL),
('Parto','Bamford',13,1),
('Chirstian','Koblick',6,1),
('Kyoichi','Maliniak',1,1),
('Anneke','Preusig',2,1),
('Tzvetan','Zielinski',3,1),
('Saniya','Kalloufi',4,6),
('Sumant','Peac',5,6),
('Duangkaew','Piveteau',6,6),
('Mary','Sluis',7,6),
('Patricio','Bridgland',8,9),
('Eberhardt','Terkki',9,9),
('Berni','Genin',10,9),
('Guoxiang','Nooteboom',11,9),
('Kazuhito','Cappelletti',12,9),
('Cristinel','Bouloucos',14,3),
('Kazuhide','Peha',15,3),
('Lillian','Haddadi',16,3),
('Mayuko','Warwick',17,3),
('Ramzi','Erde',4,3),
('Shahaf','Famili',6,20),
('Bojan','Montemayor',9,20),
('Suzette','Pettey',11,20);
