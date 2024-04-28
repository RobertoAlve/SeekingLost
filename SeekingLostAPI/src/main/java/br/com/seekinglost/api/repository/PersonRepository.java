package br.com.seekinglost.api.repository;

import br.com.seekinglost.api.model.entitys.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

}
