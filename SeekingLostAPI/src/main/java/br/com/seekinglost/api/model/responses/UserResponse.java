package br.com.seekinglost.api.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private String username;

    private Integer statusCode;

    private boolean hasError;

    public UserResponse() { }

    public UserResponse(String username, Integer statusCode) {
        this.username = username;
        this.statusCode = statusCode;
    }

}
