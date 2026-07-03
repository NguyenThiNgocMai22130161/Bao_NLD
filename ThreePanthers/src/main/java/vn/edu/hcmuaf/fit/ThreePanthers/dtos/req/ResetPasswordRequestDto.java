package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequestDto {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    @NotBlank(message = "OTP không được để trống")
    private String otp;

    @NotBlank(message = "New password không được để trống")
    @Size(min = 6, message = "New password phải có ít nhất 6 ký tự")
    private String newPassword;

    @NotBlank(message = "Confirm password không được để trống")
    @Size(min = 6, message = "Confirm password phải có ít nhất 6 ký tự")
    private String confirmPassword;
}
