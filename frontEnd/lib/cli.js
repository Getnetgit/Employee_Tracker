
const inquirer = require('inquirer');
const cTable=require('console.table');


class CLI {
  constructor() {
    this.departmentsList=[];
    this.managersList=[];
    this.rolesList=[];
    this.employeeList=[];
  
  }
  run() {
    
    return inquirer
      .prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'task',
          choices: ['View All Employee', 'Add Employee', 'Update Employee Role', 'View All Roles','Add Role','View All Departments', 'Add Department'],
        },
      ])
      .then(({task}) => {

        console.log(task)
        switch (task) {
          case 'View All Employee':
            return this.getData("employees")
            break;
          case 'Add Employee':
            return this.addEmployee();
            break;
          case 'Update Employee Role':
            this.updateEmployeeRole();
            break;
          case 'View All Roles':
            return this.getData("roles")
            break;
          case 'Add Role':

             return this.addRole();
            break;
          case 'View All Departments':
            
            return this.getData("departments");
            break;
          case 'Add Department':
            return  this.addDepartment();
            break;
          }

        //return this.addTask();
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
  }
  
  //this function will get data given rout as an input
 getData = (rout) =>
  fetch(`http://localhost:3001/api/${rout}`)
  .then(responce=>responce.json())
  .then(data=>console.table(data)).then(()=>this.getDepartmentsList())
  .catch(error =>console.error(error));



//This function will be called to add department when user select the option
addDepartment() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
      }
    ])
    .then((answer) => {
      fetch(`http://localhost:3001/api/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: answer.name })
      })
      .then(response => response.json())
      .then(data => console.log(`Added ${data.data.name} to database`))
      .then(()=>this.getDepartmentsList())
      .catch(error => console.error(error));
    });
}

//Add role
addRole() {
 // const department=this.getDepartmentsList();
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
         type: 'list',
        name: 'name',
        message: 'Which department does the role belongs to?',
        choices:this.departmentsList.map(department => department.name),
        default: this.departmentsList[0].name
      }
        ])
      .then((answer) => {
      const SelectedDepartment = this.departmentsList.find(department => department.name === answer.name)
      fetch(`http://localhost:3001/api/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ title: answer.title, salary: answer.salary,department_id: SelectedDepartment.id })
      })
      .then(response => response.json())
      .then(data => console.log(`Added ${data.data.title} to database`))
      .then(()=>this.getDepartmentsList())
      .catch(error => console.error(error));
    });
}

//This function will add employee
addEmployee() {
  // const department=this.getDepartmentsList();
   return inquirer
     .prompt([
       {
         type: 'input',
         name: 'first_name',
         message: 'What is employee\'s first name?',
       },
       {
         type: 'input',
         name: 'last_name',
         message: 'What is employee\'s last name?',
       },
       {
         type: 'list',
         name: 'title',
         message: 'What is employee\'s role?',
         choices:this.rolesList.map(role => role.title),
         default: this.rolesList[0].title
       },
       {
        type: 'list',
        name: 'manager_name',
        message: 'Who is employee\'s manager?',
        choices:this.managersList.map(manager => manager.manager_name),
        default: this.managersList[0].manager_name
      }
        ])
       .then((answer) => {
       const SelectedManager = this.managersList.find(manager => manager.manager_name === answer.manager_name)
       const SelectedRole = this.rolesList.find(role => role.title === answer.title)
       fetch(`http://localhost:3001/api/employees`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ first_name: answer.first_name, last_name: answer.last_name,role_id:SelectedRole.id, manager_id: SelectedManager.manager_id})
       
       })
       .then(response => response.json())
      .then(data => console.log(`Added ${data.data.first_name} ${data.data.last_name} to database`))
      //.then(data => console.log(data))
       .then(()=>this.getDepartmentsList())
       .catch(error => console.error(error));
     });
 }

 //this function will update employee roe
 updateEmployeeRole() {
   return inquirer
     .prompt([
      {
        type: 'list',
       name: 'employee_name',
       message: 'Which employee\'s rore do you want to update?',
       choices:this.employeeList.map(employee => employee.employee_name),
       default: this.employeeList[0].employee_name
     },
     {
      type: 'list',
      name: 'title',
      message: 'which role do you want to assign the selected employee?',
      choices:this.rolesList.map(role => role.title),
      default: this.rolesList[0].title
    },
     ])
       .then((answer) => {
       const SelectedEmployee = this.employeeList.find(employee => employee.employee_name === answer.employee_name);
       const SelectedRole = this.rolesList.find(role => role.title === answer.title);
       fetch(`http://localhost:3001/api/employee/${SelectedEmployee.id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         
         body: JSON.stringify({ role_id:SelectedRole.id, id:SelectedEmployee.id})
       })
       .then(response => response.json())
       .then(() => console.log(`Updated employee's role`))
       .then(()=>this.getDepartmentsList())
       .catch(error => console.error(error));
     });
 }
 
 //get managers list for inquirer lockup table
getManagersList = () =>
fetch(`http://localhost:3001/api/managers`)
.then(responce=>responce.json())
.then(data=>this.managersList=data)
.catch(error =>console.error(error));

//get roles list for inquirer lockup table
getRolesList= () =>
fetch(`http://localhost:3001/api/roles`)
.then(responce=>responce.json())
.then(data=>this.rolesList=data)
.catch(error =>console.error(error));

//get employee list for inquirer lockup table
getEmployeeList= () =>
fetch(`http://localhost:3001/api/employee/list`)
.then(responce=>responce.json())
.then(data=>this.employeeList=data)
.catch(error =>console.error(error));

//the following function gets list of department to be used as a lockup table for inquirer and call other functions to get other lists
getDepartmentsList= () =>
fetch(`http://localhost:3001/api/departments`)
.then(responce=>responce.json())
.then(data => this.departmentsList=data)
.then(()=>this.getManagersList())
.then(()=>this.getRolesList())
.then(()=>this.getEmployeeList())
.then(()=>this.run())
.catch(error =>console.error(error));

}

module.exports = CLI;