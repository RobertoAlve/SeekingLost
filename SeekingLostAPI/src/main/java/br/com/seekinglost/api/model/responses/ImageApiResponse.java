package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.enums.ImageResponseEnum;
import br.com.seekinglost.api.interfaces.IApiResponse;
import br.com.seekinglost.api.interfaces.IResponseEnum;
import br.com.seekinglost.api.interfaces.Response;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;

@Getter
@Setter
@Slf4j
public class ImageApiResponse implements IApiResponse {

    private Map<IResponseEnum, Response> status = new HashMap<>();

    @Override
    public void addStatus(IResponseEnum responseEnum, Response response) {
        this.status.put(responseEnum, response);
    }

    @Override
    public void addStatus(IResponseEnum responseEnum, String target) {
        log.info("Method not implemented");
    }

    @Override
    public boolean hasError() {
        AtomicBoolean hasError = new AtomicBoolean(false);
        this.status.forEach((responseEnum, imageResponse) -> {
            if (Objects.equals(responseEnum.getStatusCode(), ImageResponseEnum.ERROR.getCode())) {
                hasError.set(true);
            }
        });
        return hasError.get();
    }

}
