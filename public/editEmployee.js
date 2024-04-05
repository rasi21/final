

 export function showEditModal(employeeId) {
    
    fetch(`/employees/${employeeId}`)
      .then(response => response.json())
      .then(employee => {
       
        document.getElementById('name').value = employee.name;
        document.getElementById('email').value = employee.email;
        document.getElementById('address').value = employee.address;
        document.getElementById('phone').value = employee.phone;
        document.getElementById('employeeId').value = employee.id;
        
     
        document.getElementById('editModal').style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  }
  
  function setupEditButtonListeners() {
    document.addEventListener('click', function (event) {
      if (event.target.matches('.edit-btn')) {
        const employeeId = event.target.getAttribute('data-employee-id');
        showEditModal(employeeId);
      }
    });
  }
  
  function updateEmployee(employeeId, updatedData) {
    fetch(`/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('editModal').style.display = 'none';
      
    })
    .catch(error => {
      console.error('Error updating employee:', error);
    });
  }
  
  function setupEditFormListener() {
    document.getElementById('editForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const employeeId = document.getElementById('employeeId').value;
      const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value
      };
  
      updateEmployee(employeeId, updatedData);
    });
  }
  
 
 
  
  export { setupEditButtonListeners, setupEditFormListener, setupCloseModalListener, };
  