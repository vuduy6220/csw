package com.example.demo.api;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
@Slf4j
@RequiredArgsConstructor
public class EmployeeAPI {
    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity getEmployees() {
        return ResponseEntity.ok(employeeService.getAll());
    }

    @PostMapping
    public ResponseEntity addEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.save(employee));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findById(@PathVariable Long id) {
        Optional<Employee> stock = employeeService.findById(id);
        if(!stock.isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(stock.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employee){
        if(!employeeService.findById(id).isPresent()) {
            ResponseEntity.badRequest().build();
        }
        employee.setId(id);
        return ResponseEntity.ok(employeeService.save(employee));
    }
}
