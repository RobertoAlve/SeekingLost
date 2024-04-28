package br.com.seekinglost.api.enums;

import br.com.seekinglost.api.interfaces.IResponseEnum;
import lombok.Getter;

@Getter
public enum PersonResponseEnum implements IResponseEnum {
    ERROR("Error creating person!", 0),
    CREATED("Person created!", 1),
    ALREADY_EXISTS("Persons already exist!", 2);

    private final String message;

    private final Integer code;

    PersonResponseEnum(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    @Override
    public Integer getStatusCode() {
        return code;
    }
}
