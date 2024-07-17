package com.example.employeemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
               .orElseThrow(() -> new ResourceNotFoundException("com.example.employeemanagement.Employee not found for this id :: " + id));
        employee.setName(employeeDetails.getName());
        employee.setDesignation(employeeDetails.getDesignation());
        employee.setSalary(employeeDetails.getSalary());
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("com.example.employeemanagement.Employee not found for this id :: " + id));
        employeeRepository.delete(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("com.example.employeemanagement.Employee not found for this id :: " + id));
    }
}
