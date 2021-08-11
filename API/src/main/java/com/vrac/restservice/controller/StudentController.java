package com.vrac.restservice.controller;

import com.vrac.restservice.model.entity.Student;
import com.vrac.restservice.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    public StudentRepository studentRepository;

    @GetMapping(value = "/all")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping(value = "/create")
    public String createStudent(@RequestBody Student student) {
        Student insertedStudent = studentRepository.insert(student);
        return "Student created " + insertedStudent.getName();
    }
}
