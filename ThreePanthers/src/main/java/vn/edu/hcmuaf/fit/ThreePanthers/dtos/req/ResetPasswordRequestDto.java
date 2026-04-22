package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequestDto {
    private String email;
    private String otp;
    private String newPassword;
    private String confirmPassword;
}