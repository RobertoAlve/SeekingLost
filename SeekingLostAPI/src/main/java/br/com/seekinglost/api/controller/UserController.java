package br.com.seekinglost.api.controller;

import br.com.seekinglost.api.model.User;
import br.com.seekinglost.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);

        if (savedUser != null && savedUser.getId() != null)
            return ResponseEntity.ok().body(savedUser);
        else
            return ResponseEntity.badRequest().body(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User findUser = userService.getUserById(id);

        if  (findUser != null)
            return ResponseEntity.ok(findUser);
        else
            return ResponseEntity.badRequest().build();
    }

}
