package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.model.entitys.User;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class UserResponse {

    private Map<String, User> errors = new HashMap<>();
    private Map<String, User> successStatus = new HashMap<>();

}
