package br.com.seekinglost.api.model.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private String username;

    private Integer statusCode;

    public UserResponse() { }

    public UserResponse(String username, Integer statusCode) {
        this.username = username;
        this.statusCode = statusCode;
    }

}
