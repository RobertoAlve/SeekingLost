package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.interfaces.Response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UriResponse implements Response {

    private String uri;

    public UriResponse(String uri) {
        this.uri = uri;
    }

}
