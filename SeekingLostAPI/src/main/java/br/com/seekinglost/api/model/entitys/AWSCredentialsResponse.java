package br.com.seekinglost.api.model.entitys;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AWSCredentialsResponse {

    @JsonProperty("Code")
    private String Code;

    @JsonProperty("LastUpdated")
    private String LastUpdated;

    @JsonProperty("Type")
    private String Type;

    @JsonProperty("AccessKeyId")
    private String AccessKeyId;

    @JsonProperty("SecretAccessKey")
    private String SecretAccessKey;

    @JsonProperty("Token")
    private String Token;

    @JsonProperty("Expiration")
    private String Expiration;
}