package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    @NotBlank(message = "Identifier không được để trống")
    private String identifier;

    @NotBlank(message = "Password không được để trống")
    private String password;
}
