package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.enums.PersonResponseEnum;
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
public class PersonApiResponse implements IApiResponse {

    private Map<IResponseEnum, Response> status = new HashMap<>();

    @Override
    public void addStatus(IResponseEnum personResponseEnum, Response personResponse) {
        this.status.put(personResponseEnum, personResponse);
    }

    @Override
    public void addStatus(IResponseEnum responseEnum, String target) {
        log.info("Method not implemented");
    }

    public boolean hasError() {
        AtomicBoolean hasError = new AtomicBoolean(false);
        this.status.forEach((responseEnum, personResponse) -> {
            if (Objects.equals(responseEnum.getStatusCode(), PersonResponseEnum.ERROR.getCode())) {
                hasError.set(true);
            }
        });
        return hasError.get();
    }

}
