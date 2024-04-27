package br.com.seekinglost.api.repository;

import br.com.seekinglost.api.model.entitys.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
