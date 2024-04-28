package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.interfaces.Response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageResponse implements Response {

    private String message;

    public ImageResponse(String message) {
        this.message = message;
    }
}
