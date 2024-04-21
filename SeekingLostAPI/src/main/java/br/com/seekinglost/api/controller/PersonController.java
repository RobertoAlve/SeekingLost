package br.com.seekinglost.api.controller;

import br.com.seekinglost.api.model.Person;
import br.com.seekinglost.api.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/register")
    public ResponseEntity<String> registerPerson(@RequestBody Person person) {
        Person savedPerson = personService.createPerson(person);

        if (savedPerson != null && savedPerson.getId() != null)
            return ResponseEntity.ok().body("Person created with success!");
        else
            return ResponseEntity.badRequest().body("Error!");
    }

}
