package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequestDto {
    @Size(min = 3, max = 50, message = "Username phải từ 3 đến 50 ký tự")
    private String username;

    @Email(message = "Email không hợp lệ")
    @Size(max = 255, message = "Email không vượt quá 255 ký tự")
    private String email;
}
