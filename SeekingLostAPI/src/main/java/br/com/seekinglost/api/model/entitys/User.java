package br.com.seekinglost.api.model.entitys;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "User")
public class User {

    @Id
    private String username;

    private String password;

    private Boolean isAuthenticated = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Person> people;

}
