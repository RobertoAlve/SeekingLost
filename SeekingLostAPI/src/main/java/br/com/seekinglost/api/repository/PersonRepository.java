package br.com.seekinglost.api.repository;

import br.com.seekinglost.api.model.entitys.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {

    List<Person> findAllByUserUsername(String username);
    
}
