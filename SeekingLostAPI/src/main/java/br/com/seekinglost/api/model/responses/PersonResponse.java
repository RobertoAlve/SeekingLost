package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.interfaces.Response;
import br.com.seekinglost.api.model.entitys.Person;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PersonResponse implements Response {

    private String firstName;
    private String lastName;
    private Date birthDay;
    private String token;

    public PersonResponse(Person person) {
        this.firstName = person.getName();
        this.lastName = person.getLastName();
        this.birthDay = person.getBirthday();
        this.token = person.getToken();
    }
}
