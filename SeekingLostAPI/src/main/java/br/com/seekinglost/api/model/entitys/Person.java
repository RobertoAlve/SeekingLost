package br.com.seekinglost.api.model.entitys;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "Lost_Person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String lastName;

    private Date birthday;

    private String token;

    @ManyToOne
    @JoinColumn(name = "fk_user")
    private User user;

}
