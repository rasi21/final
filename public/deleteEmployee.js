export function setupDeleteButtonListeners() {
    const tableBody = document.getElementById('employee-table');
    
    tableBody.addEventListener('click', function(event) {
      
        if (event.target && event.target.classList.contains('delete-btn')) {
            const button = event.target;
            const employeeId = button.getAttribute('data-employee-id');
            
            if(confirm('Are you sure you want to delete this employee?')) {
                fetch(`/employees/${employeeId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(() => {
                    button.closest('tr').remove(); 
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                });
            }
        }
    });
}
