package br.com.seekinglost.api.model.responses;

import br.com.seekinglost.api.enums.UserResponseEnum;
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
public class UserApiResponse implements IApiResponse {

    private Map<IResponseEnum, UserResponse> status = new HashMap<>();

    @Override
    public void addStatus(IResponseEnum responseEnum, Response response) {
        log.info("Method not implemented");
    }

    @Override
    public void addStatus(IResponseEnum userResponse, String target) {
        this.status.put(userResponse, new UserResponse(target, userResponse.getStatusCode()));
    }

    @Override
    public boolean hasError() {
        AtomicBoolean hasError = new AtomicBoolean(false);
        this.status.forEach((responseEnum, userResponse) -> {
            if (Objects.equals(userResponse.getStatusCode(), UserResponseEnum.ERROR.getCode()) ||
                Objects.equals(userResponse.getStatusCode(), UserResponseEnum.ALREADY_EXISTS.getCode())) {
                hasError.set(true);
            }
        });
        return hasError.get();
    }

}
