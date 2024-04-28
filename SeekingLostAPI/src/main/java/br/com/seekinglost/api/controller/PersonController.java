package br.com.seekinglost.api.controller;

import br.com.seekinglost.api.enums.PersonResponseEnum;
import br.com.seekinglost.api.model.entitys.Person;
import br.com.seekinglost.api.model.responses.PersonApiResponse;
import br.com.seekinglost.api.model.responses.PersonResponse;
import br.com.seekinglost.api.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/register")
    public ResponseEntity<PersonApiResponse> registerPerson(@RequestBody Person person) {
        Person savedPerson = personService.createPerson(person);
        PersonApiResponse response = new PersonApiResponse();

        if (savedPerson != null && savedPerson.getId() != null)
            response.addStatus(PersonResponseEnum.CREATED, new PersonResponse(savedPerson));
        else
            response.addStatus(PersonResponseEnum.ERROR, new PersonResponse(person));

        if (response.hasError())
            return ResponseEntity.badRequest().body(response);
        else
            return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<PersonResponse>> getLostPersonsByUserId(@PathVariable String id) {
        List<Person> lostPersons = personService.getAllByUserId(id);
        List<PersonResponse> persons = new ArrayList<>();

        lostPersons.forEach(person -> {
            persons.add(new PersonResponse(person));
        });

        return ResponseEntity.ok(persons);
    }
}
