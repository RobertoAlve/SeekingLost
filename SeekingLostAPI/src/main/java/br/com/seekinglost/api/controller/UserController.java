package br.com.seekinglost.api.controller;

import br.com.seekinglost.api.enums.UserResponseEnum;
import br.com.seekinglost.api.model.entitys.User;
import br.com.seekinglost.api.model.responses.UserApiResponse;
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
    public ResponseEntity<UserApiResponse> registerUser(@RequestBody User user) {
        User findUser = userService.getUserById(user.getUsername());
        UserApiResponse response = new UserApiResponse();

        if (findUser == null) {
            User savedUser = userService.createUser(user);

            if (savedUser != null && savedUser.getUsername() != null) {
                response.addStatus(UserResponseEnum.CREATED, savedUser.getUsername());
            } else
                response.addStatus(UserResponseEnum.ERROR, user.getUsername());
        } else
            response.addStatus(UserResponseEnum.ALREADY_EXISTS, user.getUsername());

        if (response.hasError())
            return ResponseEntity.badRequest().body(response);
        else
            return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        User findUser = userService.getUserById(id);

        if  (findUser != null)
            return ResponseEntity.ok(findUser);
        else
            return ResponseEntity.badRequest().build();
    }

}
