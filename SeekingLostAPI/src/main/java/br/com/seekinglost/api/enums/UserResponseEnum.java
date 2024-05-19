package br.com.seekinglost.api.enums;

import br.com.seekinglost.api.interfaces.IResponseEnum;
import lombok.Getter;

@Getter
public enum UserResponseEnum implements IResponseEnum {

    ERROR("Error creating user!", 0),
    ERROR_AUTH("Error login user!", 0),
    CREATED("User created!", 1),
    OK("Ok", 1),
    ALREADY_EXISTS("Users already exist!", 2);

    private final String message;

    private final Integer code;

    UserResponseEnum(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    public Integer getStatusCode() {
        return code;
    }
}
