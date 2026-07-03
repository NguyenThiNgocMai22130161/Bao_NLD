package vn.edu.hcmuaf.fit.ThreePanthers.dtos.res;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserRole;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.UserStatus;

@Getter
@Setter
@Builder
public class AdminUserResponseDto {
    private String id;
    private String username;
    private String email;
    private UserRole role;
    private UserStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
