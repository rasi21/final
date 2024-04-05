const express = require('express');
const { sequelize, Employee } = require('./models');
const app = express(); 
const path = require('path');

const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.static('public')); 
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Get all employees


app.get('/employees', async (req, res) => {
  const limit = 5; 
  const page = req.query.page ? parseInt(req.query.page) : 1; 
  try {
    const { count, rows } = await Employee.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });
    res.json({
      totalCount: count, 
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      employees: rows
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Add an employee
app.post('/employees', async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update an employee
app.put('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.update(req.body);
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee

app.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.destroy();
      res.status(204).send(); 
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: error.message });
  }
});


sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen(port, () => console.log(`Server running on port ${port}`)); 
}).catch((error) => {
  console.error('Unable to synchronize the database:', error);
});
