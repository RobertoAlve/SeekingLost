package br.com.seekinglost.api.enums;

import br.com.seekinglost.api.interfaces.IResponseEnum;
import lombok.Getter;

@Getter
public enum ImageResponseEnum implements IResponseEnum {
    ERROR("Error upload images!", 0),
    UPLOAD("Success upload images!", 1),
    ERROR_DELETE("Error in delete image!", 2);

    private final String message;

    private final Integer code;

    ImageResponseEnum(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    @Override
    public Integer getStatusCode() {
        return code;
    }
}
