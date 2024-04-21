package br.com.seekinglost.api.controller;

import br.com.seekinglost.api.model.User;
import br.com.seekinglost.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);

        if (savedUser != null && savedUser.getId() != null)
            return ResponseEntity.ok().body("User created with success!");
        else
            return ResponseEntity.badRequest().body("Error!");
    }

}
