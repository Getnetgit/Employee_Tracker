const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const cTable=require('console.table');
const { Router } = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // : Add MySQL password here/ password left empty when pushed to gitHub
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employe_db database.`)
);


//Read all depatrments
app.get('/api/departments', (req, res) => {
  
    const sql=`SELECT * FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });


    //Read all roles
  app.get('/api/roles', (req, res) => {
  
    const sql=`SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON department.id = role.department_id ORDER BY role.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows)
    });
  });


// Read list of all employees 
app.get('/api/employees', (req, res) => {
  
  const sql=`SELECT e.id AS id, e.first_name AS firs_name, e.last_name AS last_name, role.title ,department.name AS department_name, role.salary, CONCAT(m.first_name,' ',m.last_name ) AS manager_name FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id =m.id ORDER BY e.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
  
    res.json(rows)
  });
});

// Read list of all employees to be used for inquirer locaup table
app.get('/api/employee/list', (req, res) => {
  
  const sql=`SELECT employee.id AS id, CONCAT(employee.first_name,' ', employee.last_name) AS employee_name FROM employee ORDER BY employee.last_name`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
  
    res.json(rows)
  });
});

// This will capturs all employees who are mamagers along with their id. This will be used as a list to select
app.get('/api/managers', (req, res) => {
  
  const sql=`SELECT DISTINCT man.id AS manager_id, CONCAT(man.first_name,"", man.last_name) AS manager_name FROM employee emp INNER JOIN employee man ON emp.manager_id = man.id;`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
   
  res.json(rows)
    //console.log(rows)
  });
});

//Add department
app.post('/api/departments', ({ body }, res) => {
    const sql = `INSERT INTO department (name)
      VALUES (?)`;
    const params = [body.name];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });

 //Add role
app.post('/api/roles', ({ body }, res) => {
   
        const sql1 = `INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?)`;
        //user will enter name and lockup id from database
        
        const params = [body.title, body.salary, body.department_id]
        db.query(sql1, params, (err, result) => {
            if (err) {
            res.status(400).json({ error: err.message });
            return;
            }
            res.json({
            message: 'success',
            data: body
            });
        });

  });

  //Add employee
  app.post('/api/employees', ({ body }, res) => {
   
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;//user will enter name and lockup id from database
     
        const params = [body.first_name, body.last_name, body.role_id,  body.manager_id]
        db.query(sql, params, (err, result) => {
            if (err) {
            res.status(400).json({ error: err.message });
            return;
            }
            res.json({
            message: 'success',
            data: body
            });
        });

  });
//update employeee role
app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
