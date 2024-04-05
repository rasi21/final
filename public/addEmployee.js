
export function addEmployeeButtonListener() {
    document.getElementById('add-employee-btn').addEventListener('click', function () {
       
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('employeeId').value = '';
       
        document.getElementById('editModal').style.display = 'block';
    });
}


export function submitEmployeeFormListener() {
    document.getElementById('editForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('employeeId').value;

       
        const method = id ? 'PUT' : 'POST';
        const endpoint = id ? `/employees/${id}` : '/employees';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        
        fetch(endpoint, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, address, phone, isChecked: false }) 
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
            console.error('Error submitting employee form:', error);
        });
    });
}
