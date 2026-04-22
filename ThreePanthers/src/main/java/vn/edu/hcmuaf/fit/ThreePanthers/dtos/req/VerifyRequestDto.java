package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyRequestDto {
    private String email;
    private String verificationCode;
}