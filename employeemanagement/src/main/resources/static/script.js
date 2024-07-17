document.addEventListener("DOMContentLoaded", function() {
    fetchEmployees();

    document.getElementById('employeeForm').addEventListener('submit', function(event) {
        event.preventDefault();
        saveEmployee();
    });
});

function fetchEmployees() {
    fetch('http://localhost:8080/api/employees/get_all_employee')
        .then(response => response.json())
        .then(data => {
            let output = '';
            data.forEach(employee => {
                output += `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.firstName}</td>
                        <td>${employee.lastName}</td>
                        <td>${employee.designation}</td>
                        <td>${employee.salary}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editEmployee(${employee.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${employee.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById('employeeTableBody').innerHTML = output;
        })
        .catch(error => console.error('Error fetching employees:', error));
}

function showAddEmployeeModal() {
    document.getElementById('employeeModalLabel').innerText = 'Add Employee';
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = '';
    $('#employeeModal').modal('show');
}

function editEmployee(id) {
    fetch(`http://localhost:8080/api/em
