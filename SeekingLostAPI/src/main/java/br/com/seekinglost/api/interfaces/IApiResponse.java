package br.com.seekinglost.api.interfaces;

import java.util.HashMap;
import java.util.Map;

public interface IApiResponse {

    Map<IResponseEnum, String> status = new HashMap<>();

    void addStatus(IResponseEnum responseEnum, String target);

    boolean hasError();

}
