package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.interfaces.Response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse implements Response {

    private String username;

    private String id;

    private Integer statusCode;

    public UserResponse() { }

    public UserResponse(String username, Integer statusCode, String id) {
        this.username = username;
        this.statusCode = statusCode;
        this.id = id;
    }

}
