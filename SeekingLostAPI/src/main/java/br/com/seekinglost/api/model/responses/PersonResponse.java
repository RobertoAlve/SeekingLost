package br.com.seekinglost.api.model.entitys;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PersonResponse {

    private String firstName;
    private String lastName;
    private Date birthDay;

    public PersonResponse(Person person) {
        this.firstName = person.getName();
        this.lastName = person.getLastName();
        this.birthDay = person.getBirthday();
    }
}
