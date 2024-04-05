// main.js

import { updateTotalEntries } from './updateTotalEntries.js';
import {setupDeleteButtonListeners} from './deleteEmployee.js'



document.addEventListener('DOMContentLoaded', () => {
    fetchEmployees();
   
    setupDeleteButtonListeners();
});


function fetchEmployees(page = 1) {
    const limit = 5; 

    fetch(`/employees?page=${page}&limit=${limit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            
            if (!data || !Array.isArray(data.employees)) {
                throw new Error('Invalid data structure received from server, expected an array of employees');
            }

            const { totalPages, currentPage, employees, totalCount } = data;
            updateTotalEntries(totalCount);
          
            

            const tableBody = document.getElementById('employee-table');
            let rows = "";
            employees.forEach((employee) => {
                rows += `
                    <tr>
                        <td><input type="checkbox" class="employee-checkbox" data-employee-id="${employee.id}" ${employee.isChecked ? 'checked' : ''}></td>
                        <td>${employee.name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.address}</td>
                        <td>${employee.phone}</td>
                        <td> 
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn" data-employee-id="${employee.id}">Delete</button>
                        </td>
                    </tr>`;
            });
            tableBody.innerHTML = rows;

            renderPagination(totalPages, currentPage);
            
        })
        .catch(error => {
            console.error('Error fetching employees:', error);
        });
        
}



function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('pagination-controls');
    let paginationHTML = '';

    if (currentPage > 1) {
        paginationHTML += `<button id="prev-page">Previous</button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    if (currentPage < totalPages) {
        paginationHTML += `<button id="next-page">Next</button>`;
    }

    paginationContainer.innerHTML = paginationHTML;

    document.getElementById('prev-page')?.addEventListener('click', () => {
        fetchEmployees(currentPage - 1);
    });

    document.getElementById('next-page')?.addEventListener('click', () => {
        fetchEmployees(currentPage + 1);
    });

    document.querySelectorAll('.page-btn').forEach(button => {
        button.addEventListener('click', function() {
            const page = parseInt(this.getAttribute('data-page'));
            fetchEmployees(page);
        });
    });
}


// Edit button 
document.addEventListener('click', function (event) {
    if (event.target.matches('.edit-btn')) {
      const row = event.target.closest('tr');
      const id = row.querySelector('.employee-checkbox').dataset.employeeId;
      const name = row.cells[1].textContent;
      const email = row.cells[2].textContent;
      const address = row.cells[3].textContent;
      const phone = row.cells[4].textContent;
      document.getElementById('name').value = name;
      document.getElementById('email').value = email;
      document.getElementById('address').value = address;
      document.getElementById('phone').value = phone;
      document.getElementById('employeeId').value = id;
      document.getElementById('editModal').style.display = 'block';
    }
  });
  
  //Edit form
  document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
  
    fetch(`/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, address, phone })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('editModal').style.display = 'none';
      fetchEmployees();
    })
    .catch(error => {
      console.error('Error updating employee:', error);
    });
  });

  
// Add employee
function setupAddEmployeeModal() {
    
    document.querySelector('.add-button').addEventListener('click', () => {
      document.getElementById('addEmployeeModal').style.display = 'block';
    });
  }
  
  function setupAddEmployeeForm() {
    document.getElementById('addEmployeeForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      const name = document.getElementById('addName').value;
      const email = document.getElementById('addEmail').value;
      const address = document.getElementById('addAddress').value;
      const phone = document.getElementById('addPhone').value;
  
      fetch('/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, address, phone })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('addEmployeeModal').style.display = 'none';
        document.getElementById('addEmployeeForm').reset();
        fetchEmployees();
      })
      .catch(error => {
        console.error('Error adding employee:', error);
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setupAddEmployeeModal();
    setupAddEmployeeForm();
  });
  
  
  