package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.interfaces.Response;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UriResponse implements Response {

    private List<String> uris;

    public UriResponse(List<String> uris) {
        this.uris = uris;
    }

}
