const data = {};
data.employees = require ("../../model/employee.json")

const getAllEmplyoees = (req, res) => {
res.json(data.employees);
}

const createNewEmployee = (req, res) => {
      res.json({ 
     "firstname": req.body.firstname, 
     "lastname": req.body.lastname 
 });
}

const updateNewEmployee = (req, res) => {
res.json({ 
    "firstname": req.body.firstname, 
    "lastname": req.body.lastname 
})
}

const deleteEmployee = (req, res) => {
res.json({"id": req.body.id})
}

const getEmployee = (req, res)=>{
       res.json({ "id": req.params.id });
}

module.exports = {
    getAllEmployee,
    createNewEmployee,
    updateNewEmployee,
    deleteEmployee,
    getEmployee
}



