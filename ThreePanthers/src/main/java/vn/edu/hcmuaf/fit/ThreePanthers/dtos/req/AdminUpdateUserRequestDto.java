package vn.edu.hcmuaf.fit.ThreePanthers.dtos.req;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserRole;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserStatus;

@Getter
@Setter
public class AdminUpdateUserRequestDto {
    @NotNull(message = "Role không được để trống")
    private UserRole role;

    @NotNull(message = "Status không được để trống")
    private UserStatus status;
}
