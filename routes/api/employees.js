const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs'); // Fixed: Added native file system module here
const employeesController = require('../../controllers/employeesController');


// Router routes mapping
router.route("/")
    .get(employeesController.getAllEmployee)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateNewEmployee)
    .delete(employeesController.deleteEmployee);

router.route("/:id")
    .get(employeesController.getEmployee);
  

module.exports = router;
