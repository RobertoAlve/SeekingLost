package br.com.seekinglost.api.model.entitys;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AWSCredentialsResponse {
    private String Code;
    private String LastUpdated;
    private String Type;
    private String AccessKeyId;
    private String SecretAccessKey;
    private String Token;
    private String Expiration;
}